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
- Normal braking: 12 inches/second² (comfortable slow-down when reducing desired speed)
- Emergency braking: 24 inches/second² (hard stop when locks fail)

**Speed regulation priority:**
1. **Lock failure** → emergency braking (24 in/s²) — hard stop to avoid collision
2. **currentSpeed > desiredSpeed** → normal braking (12 in/s²) — smooth deceleration
3. **currentSpeed < desiredSpeed** → acceleration (6 in/s²) — gradual speed-up

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
1. If the max trains limit has been reached, spawning is deferred until a train is destroyed
2. If any car from any train is still on the generator's track section (generator occupied), spawning is deferred
3. Otherwise the train is spawned inside the generator section. If leading locks cannot be acquired (exit track blocked), the train waits at speed 0 until the exit clears
4. The generator retries on the next simulation tick when deferred

**Generator Inspector:** All generator parameters (cabs, cars, speed, frequency, color mode, enabled) can be adjusted at runtime by double-clicking a generator piece to open its inspector widget. Changes take effect on the next spawned train.

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

## Next Switch Override (Inspector)

The train inspector widget includes a "Next Switch" selector that allows users to pre-select the route at the upcoming switch without finding and clicking switch indicators on the track.

### How It Works

1. The simulation walks ahead from the train's lead car along the track graph
2. When it finds a connection point with multiple route options (a virtual switch), it returns the switch info
3. The inspector displays buttons for each route, labeled spatially (Left/Right/Center)
4. Clicking a button sets the route in `train.routesTaken` — the same map that `getNextSection()` checks first
5. When the lead car reaches the switch, it finds the pre-set route and follows it
6. All subsequent cars follow the same route (standard route memory behavior)
7. The tail car clears the entry after passing (standard route memory cleanup)

### Spatial Labels

Route options are labeled based on their spatial position relative to the forward direction at the switch:
- **2 options**: "Left", "Right"
- **3 options**: "Left", "Center", "Right"
- **4+ options**: "Left", numbered middle options, "Right"

The spatial ordering uses the 2D cross product of the exit direction at the switch point versus the entry direction of each connected track.

### Deselecting

Clicking the currently-selected button deselects it, removing the override from `routesTaken`. This restores normal switch logic (random mode or `selectedRoutes` map).

### No Override Set

When no button is selected, the train uses the standard route selection logic when it reaches the switch.

## Visual Representation (2D)

For the initial 2D top-down version:

### Cab Shape
- Cabs (engines) have a distinctive shape: rounded rear, tapered front with truncated triangle tip
- Color: dark orange (0xFF8C00)
- Dimensions: 4" long × 2" wide × 1.5" height
- The front tapers to about 35% of the body width, creating a locomotive-like silhouette

### Car Shape
- Cars (rolling stock) are rounded rectangles with smooth corners
- Color depends on generator color mode:
  - `gray` (default): randomly selected from shades of gray
  - `colorful`: randomly selected from red, blue, green, purple, yellow
  - `black`: all cars are solid black (0x000000)
- Dimensions: 3" long × 2" wide × 1.5" height
- In `gray` and `colorful` modes, the previous car's color has 2× probability of being selected for the next car, creating subtle color groupings

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

## Flexible Train Composition

Trains can be composed of any combination of cabs and cars in any order. Each car has a `facingForward` boolean indicating its orientation relative to the original train direction.

### Travel Direction

Each train has a `travelDirection` property: `'forward'` or `'backward'`. This determines:
- Which end of the train is the "lead" (front in current direction)
- Which end is the "tail" (rear in current direction)

**Helper functions** (`src/core/train-helpers.ts`):
- `getLeadCar(train)` — returns the car at the front in the current travel direction
- `getTailCar(train)` — returns the car at the rear in the current travel direction
- `getLeadCarIndex(train)` / `getTailCarIndex(train)` — index variants

When `travelDirection` is `'forward'`, lead = `cars[0]`, tail = `cars[last]`.
When `travelDirection` is `'backward'`, lead = `cars[last]`, tail = `cars[0]`.

### Lead Car Responsibilities

The lead car (determined by travel direction) handles:
- Lock acquisition ahead of the train
- Route selection at switches

The tail car handles:
- Route memory clearing (forgets route after last car passes a switch)

## Reverse Movement

Trains can reverse direction, but only when completely stopped.

### Reversal Process

1. Train must be at `currentSpeed === 0`
2. Call `reverseTrain(trainId)` to flip `travelDirection`
3. All existing locks are released and re-acquired for the new direction
4. Set `desiredSpeed` to resume movement in the new direction

### Movement Direction

Movement distance is signed based on travel direction:
- Forward: `distance = currentSpeed * deltaTime` (positive)
- Backward: `distance = -(currentSpeed * deltaTime)` (negative)

Negative distance causes cars to traverse splines in reverse, naturally handling backward movement through the existing section transition system (underflow handling).

### Same-Polarity Junctions (sectionDirection)

When a train crosses a same-polarity connection (out↔out or in↔in, typically created by loop close `>` syntax), each car's `sectionDirection` field is toggled from `1` to `-1` (or vice versa).

- **`sectionDirection = 1`**: Normal traversal. Distance increases from 'in' toward 'out'.
- **`sectionDirection = -1`**: Reversed traversal. Positive velocity causes distance to decrease from 'out' toward 'in'. The car's visual rotation is flipped by π to face the actual travel direction.

This allows trains to seamlessly cross same-polarity junctions — the train continues in the same physical direction while the spline traversal direction reverses. Two consecutive same-polarity junctions cancel out, restoring normal direction.

**Switch route keys** are always determined by the exit point type ('out' → 'fwd', 'in' → 'bwd'), independent of `sectionDirection`. This ensures trains respect UI switch settings regardless of their spline traversal direction.

## Coupling

Trains can couple (merge) with other stopped trains to form longer consists.

### Coupling Mode

When a train enters coupling mode (`coupling: true`):
- It moves at the configurable `couplingSpeed` (default: 3 inches/sec)
- It ignores lock failures (continues moving even when blocked)
- It still acquires and releases locks for connection points it crosses

### Coupling Process

1. Stop the train (`currentSpeed === 0`)
2. Enter coupling mode via `startCoupling(trainId)`
3. Train moves at coupling speed in its current direction
4. When the lead car contacts a stopped train's car (within `CAR_GAP` tolerance on the same piece), coupling occurs

### Contact Detection

Contact is detected when:
- The coupling train's lead car is on the same track piece as a car from another stopped train
- The distance between car centers ≤ `(leadCar.length + otherCar.length) / 2 + CAR_GAP`

### Train Merging

When contact occurs:
- The stopped train's cars are added to the coupling train
- Car order depends on which end of each train made contact
- The combined train stops and exits coupling mode
- Locks are redistributed for the combined train
- All cars have `previousPieceId` cleared (prevents stale backward-routing filters from blocking section transitions)
- The train's `routesTaken` map is cleared (absorbed train's route memory is irrelevant)

### Stopping During Coupling

Pressing Stop in the inspector while a train is coupling:
- Sets `coupling` to `false` and `currentSpeed` to `0`
- This fully cancels coupling mode — simply setting `desiredSpeed = 0` is insufficient because coupling mode bypasses `desiredSpeed` and uses `couplingSpeed` directly

## Decoupling

Trains can be split into two separate trains at a decoupler track piece.

### Decoupler Archetype

The decoupler (`dec` or `decoupler`) is a zero-length track piece similar to semaphores and placeholders. It is placed inline in the track and activated by clicking.

**Visual appearance:** Two small triangles, one on each side of the track, pointing toward the decoupler position. Orange when inactive, red when activated.

### Decoupling Process

1. A stopped train must straddle the decoupler (a coupler between consecutive cars within ~2 inches of the decoupler position)
2. Click one of the triangles to activate
3. The train is split at the coupler closest to the decoupler
4. Both resulting trains are stopped
5. The decoupler flashes red for 1 second, then returns to orange
6. When the front portion is set in motion, it pulls away; the rear portion stays stopped

### Split Details

- Cars `[0..splitIndex-1]` stay in the original train
- Cars `[splitIndex..end]` become a new stopped train
- Both trains inherit the original travel direction
- Locks are released and re-acquired for both trains

See [Track System](track-system.md#decoupler-dec) for archetype details.
