# Track System

## Track Archetypes

Track archetypes are templates (analogous to classes in Java) that define track piece types. They are instantiated into specific track pieces placed in the layout.

### Archetype Definition

An archetype specifies:

- **Track Sections**: The spline paths through the piece, defined in local coordinates
- **Connection Points**: Named endpoints where instances can attach to other pieces
- **Collision Points**: Locations where different track sections share physical space
- **Visual Geometry**: The 3D model or procedural generation rules
- **Behavior**: For switches, the possible states and which sections are active in each state
- **Parameters**: Optional configurability (curve radius, length, switch angle)

### Connection Points

Each connection point has:
- **Name**: Unique identifier within the archetype (e.g., `in`, `out`, `left`, `right`)
- **Position**: Coordinates relative to piece origin
- **Direction**: Unit vector pointing outward (the direction a departing train would face)
- **Sections**: Which track section(s) this point belongs to

When placing track, endpoints snap together—the exit of one piece aligns with the entry of the next. Default connection points (`in` and `out`) can be omitted in shorthand notation: `str9 -> tol` expands to `str9.out -> tol.in`.

See [Connection Points](connection-points.md) for detailed naming conventions and definitions.

### Collision Points

Collision points are locations where multiple track sections occupy the same physical space (such as at a diamond crossing). Each collision point references:
- Which sections share it
- The distance along each section where the intersection occurs

This allows collision detection without runtime mesh intersection calculations.

## HO Track Archetype Collection

The starter collection is based on standard HO model railroad track pieces.

**Standard frog**: All turnouts use #6 frog (9.5° diverging angle). This is a common general-purpose size suitable for both mainline and yard work.

### Summary Table

| Code(s) | Archetype | Sections | Connection Points | Collision Points |
|---------|-----------|----------|-------------------|------------------|
| `str9`, `str6`, `str3`, `str15` | Straight | 1 | `in`, `out` | 0 |
| `crvl18`, `crvl22`, `crvl24` | Curve Left | 1 | `in`, `out` | 0 |
| `crvr18`, `crvr22`, `crvr24` | Curve Right | 1 | `in`, `out` | 0 |
| `tol` | Left Turnout | 2 | `in`, `out`, `left` | 0 |
| `tor` | Right Turnout | 2 | `in`, `out`, `right` | 0 |
| `wye` | Wye Turnout | 2 | `in`, `left`, `right` | 0 |
| `t3w` | Three-Way Turnout | 3 | `in`, `out`, `left`, `right` | 0 |
| `ctol` | Curved Turnout Left | 2 | `in`, `inner`, `outer` | 0 |
| `ctor` | Curved Turnout Right | 2 | `in`, `inner`, `outer` | 0 |
| `x90` | 90° Crossing | 2 | `in1`, `out1`, `in2`, `out2` | 1 |
| `x45` | 45° Crossing | 2 | `in1`, `out1`, `in2`, `out2` | 1 |
| `dslip` | Double Slip | 4 | `in1`, `out1`, `in2`, `out2` | 1 |
| `sslip` | Single Slip | 3 | `in1`, `out1`, `in2`, `out2` | 1 |
| `bump` | Bumper/Buffer | 1 | `in` | 0 |
| `flex` | Flex Track | 1 | `in`, `out` | 0 |

**Default aliases**: `str`→`str9`, `crv`→`crvl22`, `crvl`→`crvl22`, `crvr`→`crvr22`, `to`→`tol`, `cto`→`ctol`

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

#### Left Turnout (`tol`)

- **Code**: `tol` — default: `to`→`tol`
- **Sections**: 2 (straight route, diverging route sharing `in`)
- **Connection Points**: `in` (common), `out` (straight exit), `left` (diverging exit)
- **Collision Points**: None
- **States**: `normal` (in↔out), `diverging` (in↔left)
- **Frog**: #6 (9.5° diverging angle)

When entering from `in`, switch state determines path. When entering from `out` or `left`, only one route available.

#### Right Turnout (`tor`)

- **Code**: `tor`
- **Sections**: 2 (straight route, diverging route sharing `in`)
- **Connection Points**: `in` (common), `out` (straight exit), `right` (diverging exit)
- **Collision Points**: None
- **States**: `normal` (in↔out), `diverging` (in↔right)
- **Frog**: #6 (9.5° diverging angle)

Mirror of left turnout.

#### Wye Turnout (`wye`)

- **Code**: `wye`
- **Sections**: 2 (left diverging, right diverging) sharing `in`
- **Connection Points**: `in` (common), `left`, `right`
- **Collision Points**: None
- **States**: `left` (in↔left), `right` (in↔right)

Y-shaped junction where both routes diverge from `in`. No straight-through route.

#### Three-Way Turnout (`t3w`)

- **Code**: `t3w`
- **Sections**: 3 (left, straight, right) sharing `in`
- **Connection Points**: `in` (common), `left`, `out` (straight), `right`
- **Collision Points**: None
- **States**: `left`, `main`, `right`

One entry point with three possible exits. Only one route active at a time.

#### Curved Turnout Left (`ctol`)

- **Code**: `ctol` — default: `cto`→`ctol`
- **Sections**: 2 (inner curved route, outer curved route)
- **Connection Points**: `in` (common), `inner` (22"R exit), `outer` (30"R exit)
- **Collision Points**: None
- **States**: `inner` (in↔inner), `outer` (in↔outer)

Turnout where both routes are curved at different radii.

#### Curved Turnout Right (`ctor`)

- **Code**: `ctor`
- **Sections**: 2 (inner curved route, outer curved route)
- **Connection Points**: `in` (common), `inner`, `outer`
- **Collision Points**: None
- **States**: `inner`, `outer`

Mirror of curved turnout left.

#### 90° Crossing (`x90`)

- **Code**: `x90`
- **Sections**: 2 (independent, no connectivity between them)
- **Connection Points**: `in1`, `out1` (Track 1), `in2`, `out2` (Track 2)
- **Collision Points**: 1 (`center`)
- **Routes**: in1↔out1 (Section 1), in2↔out2 (Section 2)

Two tracks cross at right angles. No switching—trains on one track pass over the other. Collision possible if both tracks occupied at intersection.

#### 45° Crossing (`x45`)

- **Code**: `x45`
- **Sections**: 2 (independent, no connectivity between them)
- **Connection Points**: `in1`, `out1` (Track 1), `in2`, `out2` (Track 2 at 45°)
- **Collision Points**: 1 (`center`)
- **Routes**: in1↔out1 (Section 1), in2↔out2 (Section 2)

Two tracks cross at 45°. Same behavior as 90° crossing.

#### Double Slip (`dslip`)

- **Code**: `dslip`
- **Sections**: 4 (two straight-through, two crossing)
- **Connection Points**: `in1`, `out1`, `in2`, `out2`
- **Collision Points**: 1 (`center`)
- **States**: Two independent switches
  - `switch_a`: `straight` (in1↔out1) or `cross` (in1↔out2)
  - `switch_b`: `straight` (in2↔out2) or `cross` (in2↔out1)

A crossing combined with switches in both directions. From any entry, train can go straight through or cross to the other track.

#### Single Slip (`sslip`)

- **Code**: `sslip`
- **Sections**: 3 (two straight-through, one crossing)
- **Connection Points**: `in1`, `out1`, `in2`, `out2`
- **Collision Points**: 1 (`center`)
- **States**: One switch
  - `switch_a`: `straight` (in1↔out1) or `cross` (in1↔out2)
  - Track 2 fixed: in2↔out2 only

A crossing with switching in one direction only.

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
2. For switches, check switch state to determine which connection is active
3. Transfer train position to the new section (distance resets, direction may flip)
4. Continue movement on the new section

Direction of travel is represented as +1 or -1 multiplied by velocity. A train can traverse any section in either direction; endpoint connections work bidirectionally.
