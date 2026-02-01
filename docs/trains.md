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

**Safe following distance**: Calculated based on current speed and the speed of the train ahead. At minimum, trains maintain a gap specified by the layout's `mingap` setting (default 2 inches, configurable via DSL). The following distance increases with speed to allow for braking.

**Look-ahead distance**: Trains scan up to 48 inches ahead (adjustable). This distance follows the track path, including through curves and switch selections.

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

The simulation uses automatic speed regulation to prevent collisions rather than detecting and responding to them after the fact. See [Speed Regulation](#speed-regulation-collision-prevention) above.

### Same-Track Following

When a faster train approaches a slower train ahead:
1. The following train detects the train ahead via look-ahead
2. It gradually slows down to match the leading train's speed
3. It maintains a safe following distance based on both trains' speeds
4. If the leading train speeds up or clears the path, the following train accelerates

### Stopped Trains

When approaching a stopped train:
1. The following train begins braking when within look-ahead distance
2. Braking rate increases as distance decreases
3. The train stops with a minimum gap (2 inches) from the train ahead
4. When the train ahead moves, the following train resumes

### Collision Types (Future)

These collision scenarios are not yet implemented but may be added:

**Head-on collision**:
- Trains traveling opposite directions on same section
- Would require bidirectional look-ahead

**Intersection collisions** (at diamond crossings):
- Two independent track sections share physical space
- Would require collision point detection in archetypes

## Route Memory at Switches

When a train crosses a virtual switch (a connection point with multiple routes):
- The first car to cross records which route was taken in the train's `routesTaken` map
- All subsequent cars in the same train use the recorded route
- This ensures the entire train follows the same path, even if the switch is changed while the train is crossing
- Without this, changing a switch mid-crossing would cause cars to split onto different tracks (derailment)

## Visual Representation (2D)

For the initial 2D top-down version:
- Each car is rendered as a rectangle
- Cabs (engines) are yellow, 4" long × 2" wide
- Cars (rolling stock) are maroon, 3" long × 2" wide
- Gap between cars: 0.5"
- Rectangle is positioned at the car's spline position (X, Z)
- Rectangle is rotated to align with the spline tangent (heading)
- No elevation or banking—all cars at Y = 0

### Tunnel Visibility

Cars transition visibility individually when crossing tunnel pieces:
- A car crossing from `out` to `in` becomes invisible as it passes the tunnel
- A car crossing from `in` to `out` becomes visible as it passes the tunnel
- A train partially inside a tunnel will have some cars visible and others invisible

See [Track System](track-system.md#tunnel-tun) for tunnel archetype details.
