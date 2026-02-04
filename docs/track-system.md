# Track System

## Track Archetypes

Track archetypes are templates (analogous to classes in Java) that define track piece types. They are instantiated into specific track pieces placed in the layout.

### Archetype Definition

An archetype specifies:

- **Track Sections**: The spline paths through the piece, defined in local coordinates
- **Connection Points**: Named endpoints where instances can attach to other pieces
- **Collision Points**: Locations where different track sections share physical space
- **Visual Geometry**: The 3D model or procedural generation rules
- **Parameters**: Optional configurability (curve radius, length)

### Connection Points

Each connection point has:
- **Name**: Unique identifier within the archetype (e.g., `in`, `out`)
- **Position**: Coordinates relative to piece origin
- **Direction**: Unit vector pointing outward (the direction a departing train would face)
- **Sections**: Which track section(s) this point belongs to

When placing track, endpoints snap together—the exit of one piece aligns with the entry of the next. Default connection points (`in` and `out`) can be omitted in shorthand notation: `str9 -> str9` expands to `str9.out -> str9.in`.

See [Connection Points](connection-points.md) for detailed naming conventions and definitions.

### Collision Points

Collision points are locations where multiple track sections occupy the same physical space (such as at a diamond crossing). Each collision point references:
- Which sections share it
- The distance along each section where the intersection occurs

This allows collision detection without runtime mesh intersection calculations.

## Multi-Connection Branching (Virtual Switches)

Instead of using physical switch track pieces, the system allows **multiple track pieces to connect to a single connection point**. This creates branching without dedicated switch archetypes.

### How It Works

When multiple pieces connect to the same connection point, each branch becomes an independent route. The system tracks all connections and allows trains to traverse any branch.

### Visual Indicators

Virtual switches have visual indicators to show their state:

- **Blue circle**: Marks explicitly defined connection points
- **Yellow circle**: Marks auto-connected connection points (distinguishes them from explicit connections)
- **Green dot**: Marks the currently selected outbound track. Positioned where the track has visually separated from other possible routes, as close as possible to the connection point.
- **Red dot**: Marks non-selected outbound tracks. Positioned similarly to the green dot on each unselected route.

A simulation-wide toggle switch alternates between:
- **Distinguish mode**: Blue circles for explicit connections, yellow circles for auto-connections
- **Uniform mode**: All connection circles shown as blue

These indicators make it easy to see at a glance which route is active at each virtual switch.

### Switching Routes

Clicking on a red dot selects that track as the new outbound route:
- The clicked red dot turns green
- The previously green dot turns red
- Subsequent trains passing through the connection point will follow the newly selected route

Trains already past the connection point continue on their current route; only new trains entering the switch are affected.

### Example: Virtual Left Turnout

```
base: ph
str x 3       # Main route continues straight
bump

$base.out
crvl x 3      # Diverging route curves left
bump
```

This creates a branching point at `base.out` where:
- One route continues straight (str x 3)
- One route diverges left (crvl x 3)

Using a placeholder makes the junction point explicit and separate from any track piece.

### Example: Virtual Wye

```
base: ph
crvl x 3
bump

$base.out
crvr x 3
bump
```

Both left and right curves connect to `base.out`, creating a Y-junction.

### Example: Virtual Three-Way

```
base: ph
str x 3       # Straight route
bump

$base.out
crvl x 3      # Left route
bump

$base.out
crvr x 3      # Right route
bump
```

Three routes all branch from `base.out`.

## HO Track Archetype Collection

The starter collection is based on standard HO model railroad track pieces, excluding physical switches.

### Summary Table

| Code(s) | Archetype | Sections | Connection Points | Collision Points |
|---------|-----------|----------|-------------------|------------------|
| `str9`, `str6`, `str3`, `str15` | Straight | 1 | `in`, `out` | 0 |
| `crvl18`, `crvl22`, `crvl24` | Curve Left | 1 | `in`, `out` | 0 |
| `crvr18`, `crvr22`, `crvr24` | Curve Right | 1 | `in`, `out` | 0 |
| `x90` | 90° Crossing | 2 | `in1`, `out1`, `in2`, `out2` | 1 |
| `x45` | 45° Crossing | 2 | `in1`, `out1`, `in2`, `out2` | 1 |
| `bump` | Bumper/Buffer | 1 | `in` | 0 |
| `flex` | Flex Track | 1 | `in`, `out` | 0 |
| `ph` | Placeholder | 0 | `in`, `out` | 0 |
| `gen` | Generator | 1 (invisible) | `out` | 0 |
| `bin` | Bin | 0 | `in` | 0 |
| `tun` | Tunnel | 0 | `in`, `out` | 0 |

**Default aliases**: `str`→`str9`, `crv`→`crvl22`, `crvl`→`crvl22`, `crvr`→`crvr22`, `placeholder`→`ph`, `tunnel`→`tun`

See [Track Dimensions](track-dimensions.md) for complete spline point data.

### Detailed Descriptions

#### Straights (`str9`, `str6`, `str3`, `str15`)

- **Codes**: `str9` (9"), `str6` (6"), `str3` (3"), `str15` (1.5") — default: `str`→`str9`
- **Sections**: 1
- **Connection Points**: `in`, `out` (opposite ends)
- **Collision Points**: None

#### Curves Left (`crvl18`, `crvl22`, `crvl24`)

- **Codes**: `crvl18` (18"R), `crvl22` (22"R), `crvl24` (24"R) — default: `crv`→`crvl22`
- **Sections**: 1
- **Connection Points**: `in`, `out`
- **Collision Points**: None
- **Arc**: 22.5° (16 pieces = full circle)

#### Curves Right (`crvr18`, `crvr22`, `crvr24`)

- **Codes**: `crvr18` (18"R), `crvr22` (22"R), `crvr24` (24"R) — default: `crvr`→`crvr22`
- **Sections**: 1
- **Connection Points**: `in`, `out`
- **Collision Points**: None
- **Arc**: 22.5°

Mirror of curves left.

#### 90° Crossing (`x90`)

- **Code**: `x90`
- **Sections**: 2 (independent, no connectivity between them)
- **Connection Points**: `in1`, `out1` (Track 1), `in2`, `out2` (Track 2)
- **Collision Points**: 1 (`center`)
- **Routes**: in1↔out1 (Section 1), in2↔out2 (Section 2)

Two tracks cross at right angles. Trains on one track pass over the other. Collision possible if both tracks occupied at intersection.

#### 45° Crossing (`x45`)

- **Code**: `x45`
- **Sections**: 2 (independent, no connectivity between them)
- **Connection Points**: `in1`, `out1` (Track 1), `in2`, `out2` (Track 2 at 45°)
- **Collision Points**: 1 (`center`)
- **Routes**: in1↔out1 (Section 1), in2↔out2 (Section 2)

Two tracks cross at 45°. Same behavior as 90° crossing.

#### Bumper / Buffer Stop (`bump`)

- **Code**: `bump`
- **Sections**: 1
- **Connection Points**: `in` (open end only)
- **Collision Points**: None

Defines where track ends. Trains cannot proceed past the buffer.

#### Flex Track (`flex`)

- **Code**: `flex`
- **Sections**: 1
- **Connection Points**: `in`, `out` (defined at placement)
- **Collision Points**: None
- **Geometry**: Computed at placement time

Unlike fixed-geometry pieces, flex track adapts its shape to connect two points that aren't aligned for standard pieces. The spline is computed to smoothly bridge between the two connection points, matching their positions and tangent directions.

Use cases:
- Filling gaps where standard pieces don't fit exactly
- Connecting tracks at non-standard angles
- Creating custom curves or S-bends

#### Placeholder (`ph`)

- **Code**: `ph` (alias: `placeholder`)
- **Sections**: 0 (zero-length, no traversable track)
- **Connection Points**: `in`, `out` (same position, opposite directions)
- **Collision Points**: None

A zero-length piece that serves as a pure junction point for virtual switches. Unlike other pieces, placeholder has no physical track—it exists only to provide a connection point from which multiple tracks can branch.

Use cases:
- Starting a layout at a junction without committing to any track piece
- Creating a conceptual branch point distinct from any physical track
- Building track backwards from the start of a layout

Example:
```
junction: ph
crvl x 16             # Circle branches from junction.out
                      # (auto-connects back to junction.in)

$junction.out
out.str x 3           # Another branch, built backwards from junction
bump
```

#### Generator (`gen`)

- **Code**: `gen` (alias: `generator`)
- **Sections**: 1 (invisible internal track where trains are created)
- **Connection Points**: `out` (where trains exit into the layout)
- **Collision Points**: None
- **Visual**: Small circle approximately the size of a cab or car

A generator is the source of trains in a layout. It functions as a reverse bumper—trains emerge from it rather than stopping at it.

**Behavior:**
- Trains are created on an invisible internal track section
- As a train's cabs and cars move onto visible layout track, they become visible
- DSL parameters (not yet defined) will specify:
  - Frequency of train generation
  - Train composition (number of cabs and cars)

**Interaction:** Clicking on a generator toggles train creation on/off. When disabled, no new trains are created, but existing trains continue unaffected.

Example:
```
source: gen
str x 10
bump
```

Trains appear from `source` and travel along the straights to the buffer.

#### Bin (`bin`)

- **Code**: `bin`
- **Sections**: 0 (zero-length)
- **Connection Points**: `in` (where trains enter to be removed)
- **Collision Points**: None
- **Visual**: Small circle approximately the size of a cab or car (similar to generator)

A bin is where trains are removed from the layout. It functions as the opposite of a generator—trains enter and disappear. Unlike a bumper which stops trains, a bin removes them entirely.

**Behavior:**
- As a train's cabs and cars enter the bin, they are removed from the simulation
- The train is fully removed once all cars have entered

Example:
```
source: gen
str x 10
bin
```

Trains appear from `source`, travel along the straights, and are removed at the bin.

#### Tunnel (`tun`)

- **Code**: `tun` (alias: `tunnel`)
- **Sections**: 0 (zero-length)
- **Connection Points**: `in`, `out` (same position, opposite directions)
- **Collision Points**: None
- **Visual**: Two square bracket shapes ([ ]) facing opposite directions, slightly wider than the track (3" wide), forming a tunnel portal. Each bracket is open toward the visible track outside the tunnel.

A tunnel is a zero-length piece that toggles visibility of track and trains. It provides a display simplification that allows tracks to appear to go "underground" without simulating actual elevation changes.

**Track Visibility Behavior:**
- Track pieces connected to the tunnel's `in` connection point are hidden
- Hidden track continues until another tunnel piece is encountered
- This affects the entire chain of indirectly connected pieces between tunnels

**Train Visibility Behavior:**
- Each car and cab transitions visibility individually as it crosses the tunnel piece
- A car crossing from `out` to `in` becomes invisible at the moment it passes the tunnel
- A car crossing from `in` to `out` becomes visible at the moment it passes the tunnel
- A train partially inside a tunnel will have some cars visible and others invisible

**Use Cases:**
- Simulating underground passages or tunnels through scenery
- Hiding staging tracks or fiddle yards
- Creating visual interest with trains appearing/disappearing at tunnel portals

Example (tunnel loop):
```
str x 5
enter: tun
str x 10        # This section is hidden
exit: tun
str x 5
```

Trains travel on visible track, disappear at `enter`, travel on hidden track, then reappear at `exit`.

Example (passing siding with hidden track):
```
junction: ph
str x 3
bump

$junction.out
tun               # Enter hidden section
crvl x 8
tun               # Exit hidden section
> in.$junction    # Connect back (auto-connect)
```

The curved passing track is hidden while the main straight track remains visible.

## Spline Implementation

Track sections use Three.js `CatmullRomCurve3` for smooth curve interpolation.

### Key Methods

- `getPointAt(t)`: Get world position at normalized distance t (0 to 1)
- `getTangentAt(t)`: Get forward direction at normalized distance t
- `getLength()`: Total arc length of the curve

### 2D Simplification

For the initial 2D top-down version:
- All spline control points have Y = 0
- Only X and Z coordinates vary
- Tangent vectors only affect rotation around the Y axis (heading)
- No banking or elevation calculations

## Track Section Connectivity

When a train reaches the end of a track section:

1. Query the section graph for connected section(s)
2. If multiple connections exist (virtual switch), determine which branch is active
3. Transfer train position to the new section (distance resets, direction may flip)
4. Continue movement on the new section

Direction of travel is represented as +1 or -1 multiplied by velocity. A train can traverse any section in either direction; endpoint connections work bidirectionally.

## Archived Content

Physical switch archetypes (turnouts, wyes, slips) have been removed in favor of virtual switches. See [ARCHIVED_SWITCHES.md](../ARCHIVED_SWITCHES.md) for historical documentation.
