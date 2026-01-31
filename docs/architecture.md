# System Architecture

## Data Model Hierarchy

The system is organized in a five-level hierarchy:

```
Layout
  └── Layout Section(s)
        └── Track Piece(s)
              └── Track Section(s)
                    └── Spline Points
```

### Layout

The root container for the entire simulation.

**Properties**:
- `title`: Display name for the layout (default: "Simulador de Tren")
- `description`: Optional longer description of the layout
- `pieces`: Array of all track pieces in the layout

**Responsibilities**:
- Owns all layout sections
- Global coordinate system
- Serialization/save/load of the entire world
- Top-level queries ("find all trains," "find track at position")

Layouts can be defined using the [Layout DSL](layout-dsl.md), a text-based language for specifying track configurations.

### Layout Section

A logical grouping of track pieces representing a functional area.

**Examples**:
- A classification yard
- A station complex
- A junction area
- A mainline segment between locations

**Benefits**:
- **Organization**: Users can name, show/hide, lock sections
- **Reusability**: Save a section design as a template, reuse elsewhere
- **Editing scope**: Select an entire section as a unit to move or rotate
- **Operational grouping**: Assign control panels or dispatchers to sections

### Track Piece

An instantiated piece of track placed in the layout.

**Properties**:
- Reference to its archetype (template)
- World position and rotation
- Connections to other track pieces

### Track Section

A single traversable path within a track piece. This is the atomic unit for train movement.

**Properties**:
- Spline defining the path (in local coordinates)
- Endpoints that can connect to other sections
- Parent track piece reference

**Notes**:
- Most pieces (straight, curve, bumper) have one section
- Crossings have two independent sections (one per track)

### Spline Points

Control points defining a smooth curve through 3D space (using only X/Z for the 2D version).

Three.js `CatmullRomCurve3` interpolates smoothly between these points, providing:
- Position at any point along the curve
- Tangent (direction) at any point
- Arc-length parameterization for consistent speed

## Dual Graph Structure

Two interrelated graphs serve different purposes:

### Track Piece Graph (Layout Level)

- **Nodes**: Track pieces
- **Edges**: Connections between pieces (which exit connects to which entry)
- **Multi-connections**: A single connection point can have multiple pieces connected to it (virtual switches)
- **Purpose**: Layout editing, route planning, user commands, serialization

This is the abstraction users interact with.

### Track Section Graph (Movement Level)

- **Nodes**: Track sections
- **Edges**: Which section endpoints connect to which other section endpoints
- **Multi-edges**: When multiple pieces connect to one point, multiple edges exist from that point
- **Traversal**: Bidirectional—a train tracks its current section, position, and direction
- **Purpose**: Continuous train positioning, collision detection

When a train reaches the end of a section, it queries this graph to find connected section(s). If multiple connections exist (a virtual switch), the system determines which branch is active.

### Cross-References

- Each track piece owns its track section(s)
- Each track section knows its parent track piece
- Connection points track all pieces connected to them

## Virtual Switches

Instead of dedicated switch archetypes, branching is achieved by connecting multiple track pieces to a single connection point.

### Example

```
base: str
str x 3       # Main route
bump

$base.out     # Return to base's output
crvl x 3      # Diverging route
bump
```

This creates a virtual left turnout at `base.out` where two routes diverge.

### Benefits

- Simpler archetype set (no switch pieces to manage)
- Flexible branching (any number of routes from any point)
- No switch state to track (route selection is separate from track topology)

### Route Selection

When a train approaches a branch point, the system must determine which route to take. This is handled separately from the track topology, allowing for:
- Manual route selection by the user
- Automatic routing based on destination
- Signal-based routing

## Auto-Connect

After a layout is fully specified, auto-connect scans all connection points on all track pieces and automatically joins any two that meet the connection criteria.

### Connection Criteria

For any two connection points to auto-connect:
1. **Approximately same position**: Within a configurable distance tolerance
2. **Approximately opposite directions**: Direction vectors point toward each other (within ~180° ± angle tolerance)

This applies to all connection points, not just open endpoints. When connection points from different pieces meet the criteria, they are joined—automatically creating virtual switches where multiple tracks converge.

### Graph Updates

When auto-connect joins connection points:
- The Track Piece Graph gains edges between the pieces
- The Track Section Graph gains corresponding section-level edges
- A single connection point may end up with multiple connections (virtual switch)

The tolerances accommodate accumulated geometric errors from sequences of curves and straights. Specific tolerance values are configurable and not yet determined.

Connection points at approximately the same position but with parallel directions (not facing each other) remain unconnected.

See [Layout DSL](layout-dsl.md) for examples and usage details.
