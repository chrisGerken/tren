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
- Current state (for switches: which route is selected)
- Connections to other track pieces

### Track Section

A single traversable path within a track piece. This is the atomic unit for train movement.

**Properties**:
- Spline defining the path (in local coordinates)
- Endpoints that can connect to other sections
- Parent track piece reference

**Notes**:
- Simple pieces (straight, curve) have one section
- Complex pieces (switches) have multiple sections sharing endpoints

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
- **State**: Switch positions, signals, occupancy
- **Purpose**: Layout editing, route planning, user commands, serialization

This is the abstraction users interact with.

### Track Section Graph (Movement Level)

- **Nodes**: Track sections (a switch contributes multiple sections)
- **Edges**: Which section endpoints connect to which other section endpoints
- **Traversal**: Bidirectional—a train tracks its current section, position, and direction
- **Purpose**: Continuous train positioning, collision detection

When a train reaches the end of a section, it queries this graph to find the connected section. For switches, the active connection depends on switch state from the piece graph.

### Cross-References

- Each track piece owns its track section(s)
- Each track section knows its parent track piece
- Switch state in the piece graph determines which section edge is active in the section graph
