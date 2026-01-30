# Layout Definition Language

This document describes the domain-specific language (DSL) for defining track layouts in text files.

## File Format

Layout files are plain text. Blank lines are ignored. Comments begin with `#`.

### Statement Separators

Multiple statements can be placed on one line, separated by semicolons. Semicolons are not required after the last or only statement on a line.

```
# One statement per line
str
crvl
str

# Multiple statements on one line
str ; crvl ; str

# Mixed styles
str ; crvl
str ; bump

# Semicolon optional at end of line
str ; crvl ;
str
```

### Comments

```
# This is a comment
str          # Inline comments are also supported
str ; crvl   # Comment after multiple statements
```

## Basic Syntax

### Starting a New Track Segment

The `new` statement begins a new track segment:

```
new                     # Start new segment at origin, 0° rotation
new 45                  # Start new segment at origin, rotated 45°
new from $label         # Start new segment from label's 'out' point
new from $label.in      # Start new segment from label's 'in' point
new $label.out          # Same as above ('from' is optional)
new from out.$label     # Alternative ordering (point.$label)
```

The next track piece placed after `new` will:
- Start at the specified position and rotation
- Connect to the labeled piece if `from $label` was specified

An implicit `new 0` is assumed at the beginning of every layout specification, so it's only required when:
- Starting additional unconnected segments
- Starting the first piece at a non-zero angle
- Starting a new segment from a labeled piece's connection point

```
# These are equivalent
str ; crvl x 8

new 0
str ; crvl x 8

# Start a second unconnected segment
str x 4 ; bump
new 90              # New segment at 90°
str x 4 ; bump      # Parallel track, unconnected

# Start a new segment from a labeled piece
circle: ph
crvl x 16           # Circle from placeholder

new from $circle.out
gen                 # Generator connects to circle
str
```

### Connecting Independent Segments

When a segment started with `new` is later explicitly connected to another segment, the entire new segment is repositioned and rotated so that:
- The connected connection points have the same position
- The connected connection points have opposite angles (facing each other)

```
crvl x 4              # 90° of curves (to 3 o'clock position)
junction: ph          # Placeholder at 3 o'clock
crvl x 12             # Complete the circle (auto-connects)

new                   # Start independent segment
gen                   # Generator
str                   # Straight
$junction.in          # Connect to junction's input
```

This creates:
1. A circular main line with a placeholder at 3 o'clock
2. A generator sidetrack that connects to the placeholder

When `$junction.in` is reached, the entire second segment (gen, str) is repositioned and rotated so that the straight's output aligns with the placeholder's input, creating a virtual switch at 3 o'clock.

### Placing Track Pieces

The simplest statement places a single track piece:

```
str          # Place a straight (9" default)
crvl         # Place a left curve (22" radius default)
```

Each piece connects to the previous piece using default connection points:
- Previous piece's `out` → Current piece's `in`

### Piece Codes

Use archetype codes to specify track pieces. See [Track Dimensions](track-dimensions.md) for the complete list.

| Code | Description |
|------|-------------|
| `str`, `str9`, `str6`, `str3`, `str15` | Straight sections |
| `crv`, `crvl`, `crvl18`, `crvl22`, `crvl24` | Left curves |
| `crvr`, `crvr18`, `crvr22`, `crvr24` | Right curves |
| `x90`, `x45` | Crossings |
| `bump` | Buffer stop |
| `flex` | Flex track |
| `ph`, `placeholder` | Zero-length junction point |
| `gen`, `generator` | Train source (trains appear) |
| `bin` | Train sink (trains removed) |
| `tun`, `tunnel` | Visibility toggle (hide track/trains) |

### Repetition

Place multiple consecutive pieces of the same type:

```
str x 5      # Five straight pieces
crvl x 4     # Four left curves (90° total)
crvr * 8     # Eight right curves (180°) — * is an alias for x
```

Both `x` and `*` can be used as the repetition operator.

## Labels and References

### Defining Labels

Assign a label to a piece for later reference:

```
start: str              # Label this straight as "start"
junction: str           # Label this straight as "junction"
```

### Referencing Labels

Use `$label` to reference a labeled piece:

```
$start                  # Reference the piece labeled "start"
$junction.out           # Reference the "out" connection point of "junction"
```

### Connection Point References

When referencing a label, you can specify which connection point to use:

```
$junction.out           # The output connection point
$crossing.in2           # Track 2 input on a crossing
```

If no connection point is specified, the default `out` is used (or `out1` for crossings).

## Branching (Virtual Switches)

To create branches, connect multiple pieces to the same connection point by referencing a labeled piece:

```
junction: ph            # Placeholder as pure junction point
str x 3
bump

$junction.out           # Return to junction's output
crvl x 3                # Branch curves left from the same point
bump
```

This creates a **virtual switch** where both the straight and curved branches connect to `junction.out`.

### Placeholder as Junction

A placeholder (`ph`) is a zero-length piece ideal for junction points. It provides `in` and `out` connection points without any physical track:

```
junction: ph
str x 3       # Main route
bump

$junction.out
crvl x 3      # Diverging route
bump
```

### Virtual Wye

```
base: ph
crvl x 3
bump

$base.out
crvr x 3
bump
```

### Virtual Three-Way

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

## Explicit Connection Syntax

When placing a piece, you can specify which end to attach using the `point.piece` syntax:

```
out.str       # Place a straight, attaching its OUT to the current point
in.crvl       # Place a curve, attaching its IN to the current point
```

This is useful for building track "backwards" from a junction, or for attaching via non-default connection points.

### Building Backwards

Normally, pieces attach via their `in` and continue from their `out`. With explicit syntax, you can reverse this:

```
junction: ph
crvl x 16             # Circle from junction.out (normal direction)

$junction.in          # Switch to junction's input side
out.str x 3           # Build backwards: attach str.out, continue from str.in
bump
```

Here the straights are built "backwards"—their `out` connects to the junction, and the layout continues from their `in`.

### Connection Syntax Summary

| Syntax | Meaning |
|--------|---------|
| `str` | Attach `str.in` to previous, continue from `str.out` (default) |
| `out.str` | Attach `str.out` to previous, continue from `str.in` |
| `in.str` | Same as `str` (explicit default) |

For crossings, use numbered points: `in2.x90`, `out1.x90`, etc.

## Closing Loops

Use the `>` operator to connect the current piece back to a labeled piece, closing a loop:

```
> point.$label          # Connect current out to $label.point
```

The `>` operator connects the current piece's default output to the specified connection point on a labeled piece. This completes a circuit without placing a new piece.

```
start: str
crvl x 16               # Full circle of curves
> in.$start             # Close the loop: connect back to start's input
```

## Auto-Connect

After a layout is fully specified, **auto-connect** scans all connection points on all track pieces and automatically joins any two that are close enough with opposite directions.

### How It Works

1. Examine all connection points on all track pieces (not just open endpoints)
2. For any two connection points:
   - If they are within the **position tolerance** of each other, AND
   - If their directions are approximately **opposite** (within the angle tolerance)
   - Then connect them

This automatically creates virtual switches wherever tracks meet. A single connection point can end up with multiple connections.

### Tolerance

Auto-connect uses configurable tolerances for matching:
- **Position tolerance**: Connection points within a small distance are considered "at the same position"
- **Direction tolerance**: Directions within a small angle of 180° are considered "opposite"

This allows connections even when accumulated errors from curves and straights cause slight misalignment. The specific tolerance values are configurable and not yet determined.

### Visual Indicators

When a layout is displayed, various visual indicators help identify track elements:

- **Blue dot**: Centered on explicitly defined or unconnected connection points.
- **Yellow dot**: Centered on auto-connected connection points.
- **Green circle**: Generator (train source).
- **Red circle**: Bin (train sink).
- **Text label**: Displayed near the center of labeled pieces (from `label: piece` syntax).
- **Green dot**: On the currently selected outbound track at a virtual switch. Positioned where the track has visually separated from other routes, as close as possible to the connection point.
- **Red dot**: On non-selected outbound tracks at a virtual switch. Positioned similarly to the green dot.

A simulation-wide toggle switches between showing blue/yellow distinction or all connection circles as blue.

These indicators apply to all virtual switches, whether created explicitly or via auto-connect.

**Interaction:** Clicking a red dot selects that route—the red dot turns green, the previous green dot turns red, and subsequent trains follow the new route.

### Example: Simple Circle

```
crvl x 16               # Full circle of curves
```

The `out` of the last curve and the `in` of the first curve are at the same position with opposite directions. Auto-connect joins them automatically.

### Example: Circle with Generator and Bin Sidetracks

```
gen
str
crvl x 16
str
bin
```

This creates:
1. A generator feeding into a straight
2. A full circle of curves
3. A straight leading to a bin

Auto-connect finds where the straights pass through the circle:
- The first `str` (after gen) has connection points that meet the circle with opposite directions
- The last `str` (before bin) also meets the circle with opposite directions

This automatically creates two virtual switches (equivalent to a `tor` and a `tol`), resulting in:
- A continuous circular main line
- A spur from the circle to the generator
- A spur from the circle to the bin

Trains emerge from the generator, can run continuously around the circle, and eventually exit to the bin.

### When Auto-Connect Does NOT Apply

Auto-connect only joins endpoints with **opposite directions**. Endpoints at the same position but with the same direction remain unconnected.

```
base: str
one: str                # one.out is at position P, direction D
bump

$base.out
two: str                # two.out is also at position P, direction D
bump
```

Here, `one.out` and `two.out` are at the same position but point in the **same direction** (both are outputs from `base.out`). They do not auto-connect because trains couldn't transition between them—they're parallel, not head-to-head.

### Auto-Connect vs Explicit Loops

Both approaches work for closing loops:

**With explicit `>` operator:**
```
start: str
crvl x 16
> in.$start             # Explicitly close the loop
```

**With auto-connect:**
```
crvl x 16               # Auto-connect closes it
```

Use explicit connections when:
- You want to be clear about intent
- You're connecting to a specific labeled piece
- The misalignment exceeds the auto-connect tolerance

Use auto-connect when:
- The geometry naturally closes (like a circle of curves)
- You want concise layout definitions
- Small accumulated errors are within tolerance

## Building Patterns

### Simple Loop

```
start: str x 4
crvl x 8                # 180° turn
str x 4
crvl x 8                # 180° turn
> in.$start             # Close the loop
```

### Oval with Passing Siding

```
# Main oval
start: str x 4
crvl x 8                # 180° turn
str x 4
crvl x 8                # 180° turn
> in.$start             # Close main loop

# Passing siding branches from main line
$start.out              # Branch from first straight
str x 4
> in.$start             # Rejoin before the curve
```

### Figure-8 with Virtual Switches

```
# Start with straights
start: str x 4

# First curve section
junction1: str
crvl x 4

# Center crossing
cross: x90

# Continue first loop
crvl x 4
junction2: str
str x 3
> in.$start             # Close first loop

# Second loop branches from first junction
$junction1.out
crvr x 4

# Connect through crossing's second track
$cross.in2
crvr x 4
> in.$junction2         # Rejoin at second junction
```

### Yard with Multiple Sidings

```
# Main line
main: str x 2
str x 4
bump

# First siding
$main.out
crvl
str x 3
bump

# Second siding (branches from same point)
$main.out
crvl
crvl                    # Tighter curve
str x 2
bump
```

## Complete Example

```
# Simple layout with passing siding using virtual switch

start: str x 3
junction: str           # This piece will have two connections
str x 3
bump

# Siding branches from junction
$junction.out
crvl
str x 3
crvl
> in.$start             # Rejoin forming a loop
```

This creates:
1. Three straight pieces leading to a junction
2. Main line continues straight to a buffer
3. Siding branches left from the junction, curves back to form a loop

## Connection Point Reference

See [Connection Points](connection-points.md) for complete connection point definitions.

| Archetype | Connection Points | Default In | Default Out |
|-----------|-------------------|------------|-------------|
| `str*`, `crv*`, `flex` | `in`, `out` | `in` | `out` |
| `x90`, `x45` | `in1`, `out1`, `in2`, `out2` | `in1` | `out1` |
| `bump` | `in` | `in` | (none) |
| `ph`, `tun` | `in`, `out` | `in` | `out` |
| `gen` | `out` | (none) | `out` |
| `bin` | `in` | `in` | (none) |
