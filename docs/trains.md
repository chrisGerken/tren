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

## Collision Detection

### Same-Track Collisions

When trains share the same track path:

**Rear-end collision**:
- Faster train catches slower train ahead
- Collision between lead car of following train and last car of leading train
- Detection: compare positions along the same spline

**Head-on collision**:
- Trains traveling opposite directions on same section
- Collision between both lead cars
- Detection: positions converging, distance goes to zero

### Intersection Collisions (Cross-Track)

At collision points defined in track archetypes (e.g., diamond crossings):
- Two independent track sections share physical space at a specific point
- A car on section A and a car on section B can collide if both occupy that point simultaneously

Detection:
1. For each collision point, track which cars are within collision range
2. If cars from different sections are both in range, collision occurs

### Collision Response

(To be defined in user scenarios)

Options may include:
- Simulation stops with error indication
- Trains halt before collision (automatic braking)
- Damage/derailment modeling

## Visual Representation (2D)

For the initial 2D top-down version:
- Each car is rendered as a rectangle
- Rectangle is positioned at the car's spline position (X, Z)
- Rectangle is rotated to align with the spline tangent (heading)
- No elevation or banking—all cars at Y = 0
