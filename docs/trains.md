# Train System

## Train Cars

### Car Types

**Cab / Engine**
- Can serve as the primary cab (controls train speed and direction)
- When not the primary cab, treated as a regular car

**Car**
- Passive rolling stock
- Follows the cars ahead of it

### Car Attributes

- **Length**: Used for spacing calculations and collision bounds
- **Appearance**: Visual representation (future: different looks; currently: rectangle)

### Primary Cab Rule

The **primary cab** is the first cab in the train (typically at the front). It owns:
- Speed (how fast the train is moving)
- Direction (which way along the track)

Other cabs in the consist have no special behavior—they're just rolling stock following along.

### Train Speed

Each train has two speed values:

- **Desired Speed**: The target speed from the generator config. This is the speed the train wants to travel at when unobstructed.
- **Current Speed**: The actual speed the train is moving at, which may be lower than desired due to collision prevention.

Speed is measured in inches per second.

**Default desired speed**: 12 inches per second (approximately 1 foot per second)

Speed can be configured per generator using the `speed` parameter in the DSL:
```
gen speed 24              # Train moves at 24 inches/second
gen cabs 2 cars 3 speed 6 # Slower train at 6 inches/second
gen speed 6-24            # Random speed between 6 and 24 inches/second
```

When a range is specified (e.g., `speed 6-24`), each train spawned gets a random desired speed (real number) within that range. This creates variety among trains from the same generator.

See [Layout DSL - Generator Syntax](layout-dsl.md#generator-syntax) for full details.

### Speed Regulation (Collision Prevention)

Trains automatically regulate their speed to prevent collisions:

1. **Look-ahead**: The lead car scans ahead along the track to detect other trains
2. **Distance calculation**: The system calculates the distance to the rear of the nearest train ahead
3. **Speed adjustment**:
   - If clear ahead: accelerate toward desired speed
   - If train ahead is close: decelerate to maintain safe following distance
   - If train ahead is very close: brake hard, potentially to a stop

**Acceleration/Deceleration rates**:
- Acceleration: 6 inches/second² (gradual speed-up)
- Normal braking: 12 inches/second² (comfortable slow-down)
- Emergency braking: 24 inches/second² (hard stop)

**Lock ahead configuration**: Trains use connection point locking for collision prevention. The `lockahead` DSL statement configures how far ahead trains scan and how many connection points they must lock:
- `distance N` - Minimum distance (in inches) to scan ahead (default: 10)
- `count N` - Minimum connection points to lock before proceeding (default: 2)

Example: `lockahead distance 15 count 3`

## Train as a Consist

A train is an ordered list of cars forming a consist.

### Positioning

Each car maintains its own position along the track:
- Primary cab position = distance `d` along current track section
- First car behind = `d - (cab_length/2 + gap + car_length/2)`
- Each subsequent car = previous car position - (previous_length/2 + gap + current_length/2)

### Movement

Each frame:
1. Update primary cab's distance based on speed and direction
2. Each car queries its position from the spline at its calculated distance
3. Each car orients itself along the tangent at its position

This naturally handles curves—each car follows the same path but at a spatial offset, creating realistic articulation through bends.

### Track Section Transitions

When the primary cab crosses from one track section to another:
- All cars continue to reference their positions independently
- A car transitions to a new section only when its own position crosses the boundary
- This means cars may briefly span multiple sections during a transition

## Collision Prevention

The simulation uses **connection point locking** to prevent collisions. Trains lock connection points ahead of the leading car and release them as the trailing car clears.

### Connection Point Locking

Each connection point (where track pieces join) can be locked by at most one train at a time. The locking mechanism provides:

1. **Mutual exclusion**: Only one train can hold a lock on a connection point
2. **Ordered acquisition**: Locks are acquired in track order (nearest to farthest), preventing deadlocks
3. **Automatic release**: Locks are released when the trailing car clears the point

### Lock Acquisition

The leading car continuously scans ahead to acquire locks:

1. Start from the leading car's current piece
2. Add the exit point of the current piece
3. Get the next piece via the selected route
4. Add the entry point of the next piece
5. Continue until BOTH conditions are met:
   - Distance covered ≥ 10 inches
   - At least 2 connection points locked
6. If any point is already locked by another train, stop and wait

**Configuration:**
- `minLockDistance`: 10 inches (minimum look-ahead distance)
- `minLockCount`: 2 connection points (minimum locks required)

### Lock Release

Locks are released only when the LAST car of the train clears a piece:

1. Build set of piece IDs that have ANY car on them (occupied pieces)
2. Keep locks on ALL connection points of occupied pieces
3. Keep locks on all points in the look-ahead set
4. Release locks only for pieces where no car is present AND not in look-ahead

**Key design decision:** The system keeps locks on entire pieces (all their connection points), not just specific straddled points. This ensures the cab passing a connection point doesn't release it prematurely while trailing cars are still on that piece.

### Speed Regulation

When a train cannot acquire the locks it needs:
- It decelerates using emergency braking (24 inches/sec²)
- It may come to a complete stop if blocked

When a train has sufficient locks:
- It accelerates toward its desired speed (6 inches/sec² acceleration)

### Switch (Junction) Locking

Switches cannot be changed while a train's connection point is locked at that junction. This prevents derailments from switching while a train is crossing.

### Semaphore Blocking

Semaphores provide manual lock control over track sections. When a semaphore is locked (red):
- Its connection points are treated as blocked
- Trains cannot acquire locks on a blocked semaphore
- Approaching trains decelerate and stop before the semaphore
- The train waits until the user clicks to unlock (turn green)

When a semaphore is unlocked (green):
- Trains can acquire locks normally and pass through
- The semaphore behaves like any other zero-length piece (tunnel, placeholder)

See [Layout DSL - Semaphore Syntax](layout-dsl.md#semaphore-syntax) for DSL details.

### Same-Track Following

When a faster train approaches a slower train ahead:
1. The following train's lock acquisition fails (points locked by lead train)
2. It decelerates to a stop behind the lead train
3. When the lead train releases locks (moves forward), the following train acquires them
4. The following train accelerates and resumes

### Spawn Blocking

When a generator attempts to spawn a new train:
1. The simulation tries to acquire initial locks for the train
2. If the exit track is blocked (locks held by another train), spawning is deferred
3. The generator will try again on the next spawn interval

### Train Removal

When a train is removed (all cars in bin):
1. All locks held by the train are released
2. This allows waiting trains to acquire those locks and proceed

### Collision Types Handled

**Rear-end collisions**: Prevented by lock acquisition - following train cannot acquire locks held by lead train

**Merge collisions**: Prevented at junctions - only one train can hold locks on the junction point

**Switch derailments**: Prevented by junction locking - switch cannot change while locked

### Future Collision Types

**Head-on collision** (not yet implemented):
- Trains traveling opposite directions on same section
- Current lock system would need bidirectional awareness

**Intersection collisions at crossings** (not yet implemented):
- Two independent track sections share physical space at diamond crossings
- Would require collision point detection in archetypes

## Route Memory at Switches

When a train crosses a virtual switch (a connection point with multiple routes):
- The first car to cross records which route was taken in the train's `routesTaken` map
- All subsequent cars in the same train use the recorded route
- This ensures the entire train follows the same path, even if the switch is changed while the train is crossing
- Without this, changing a switch mid-crossing would cause cars to split onto different tracks (derailment)

## Visual Representation (2D)

For the initial 2D top-down version:

### Cab Shape
- Cabs (engines) have a distinctive shape: rounded rear, tapered front with truncated triangle tip
- Color: yellow
- Dimensions: 4" long × 2" wide × 1.5" height
- The front tapers to about 35% of the body width, creating a locomotive-like silhouette

### Car Shape
- Cars (rolling stock) are rounded rectangles with smooth corners
- Color: randomly selected from dark red, dark blue, dark green, dark purple, or dark orange
- Dimensions: 3" long × 2" wide × 1.5" height
- The previous car's color has 2× probability of being selected for the next car, creating subtle color groupings

### Common Properties
- Gap between cars: 0.5"
- Cars are positioned at spline positions (X, Z)
- Cars are rotated to align with spline tangent (heading)
- No elevation or banking—all cars at Y = 0

### Tunnel Visibility

Cars transition visibility individually when crossing tunnel pieces:
- A car crossing from `out` to `in` becomes invisible as it passes the tunnel
- A car crossing from `in` to `out` becomes visible as it passes the tunnel
- A train partially inside a tunnel will have some cars visible and others invisible

See [Track System](track-system.md#tunnel-tun) for tunnel archetype details.
