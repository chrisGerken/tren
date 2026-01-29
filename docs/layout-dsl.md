# Layout Definition Language

This document describes the domain-specific language (DSL) for defining track layouts in text files.

## File Format

Layout files are plain text with one statement per line. Blank lines are ignored. Comments begin with `#`.

```
# This is a comment
str          # Inline comments are also supported
```

## Basic Syntax

### Placing Track Pieces

The simplest statement places a single track piece:

```
str          # Place a straight (9" default)
crvl         # Place a left curve (22" radius default)
tol          # Place a left turnout
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
| `tol`, `tor` | Left/right turnouts |
| `wye` | Wye turnout |
| `t3w` | Three-way turnout |
| `ctol`, `ctor` | Curved turnouts |
| `x90`, `x45` | Crossings |
| `dslip`, `sslip` | Slip switches |
| `bump` | Buffer stop |
| `flex` | Flex track |

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
junction: tol           # Label this turnout as "junction"
```

### Referencing Labels

Use `$label` to reference a labeled piece:

```
$start                  # Reference the piece labeled "start"
$junction.left          # Reference the "left" connection point of "junction"
```

### Connection Point References

When referencing a label, you can specify which connection point to use:

```
$junction.out           # The straight-through exit
$junction.left          # The diverging exit (for tol)
$crossing.in2           # Track 2 input on a crossing
```

If no connection point is specified, the default `out` is used (or `out1` for crossings/slips).

## Specifying Connections

### Default Connections

By default, each piece connects its `in` to the previous piece's `out`:

```
str                     # First piece (no previous connection)
str                     # Connects: previous.out → this.in
crvl                    # Connects: previous.out → this.in
```

### Explicit Connection Points

Specify which connection points to use when placing a piece:

```
point.piece.point       # Connect to previous via specified points
```

The format is: `previous_point.archetype.this_point`

```
left.tol.in             # Connect previous.out to tol.left, then continue from tol.in
```

This is useful when:
- Connecting to a non-default output (like a turnout's diverging route)
- The current piece should connect via a non-default input

### Branching

To create branches, reference a labeled piece and continue from there:

```
start: str
tol
str
bump

$start                  # Return to "start" piece
tor                     # Branch off in a different direction
str
bump
```

### Closing Loops

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

For more complex loops with multiple connection points:

```
start: str
switch: tol
str x 4
> in.$start             # Close outer loop

$switch.left
crvl x 8
> in.$switch            # Connect inner path back to switch
```

## Building Patterns

### Simple Loop

```
start: str x 4
crvl x 8                # 180° turn
str x 4
crvl x 8                # 180° turn
> in.$start             # Close the loop
```

### Double Loop (Figure-8 with Switches)

```
start: str
str x 3
crvl x 4
insw:  out.tor.in       # Right turnout, enter via out, continue from in
outsw: tol

crvl x 4
str6 x 4
crvl x 4

> in.$start             # Close outer loop

$outsw.left             # Branch to inner circle
crvl x 6

> right.$insw           # Connect inner circle to right turnout
```

This creates an outer loop connected to an inner circle at two switches. Trains can stay on either loop or switch between them.

### Passing Siding

```
mainline: str x 2
junction1: tol
str x 4
junction2: left.tor.in  # Connect to diverging, continue from main

$junction1.left
str x 4
$junction2.left         # Close the siding
```

### Wye Junction

```
approach: str x 3
wye
left_branch: str x 2
bump

$approach
wye.right               # Continue from wye's right exit
str x 2
bump
```

## Complete Example

```
# Simple layout with passing siding
# Main line with a turnout leading to a siding

start: str
str x 2
switch: tol
str x 3
bump

$switch.left
siding: str x 3
bump
```

This creates:
1. Three straight pieces (one labeled "start")
2. A left turnout (labeled "switch")
3. Main line continues straight with three more straights to a buffer
4. Siding branches left from the switch with three straights to a buffer

## Connection Point Reference

See [Connection Points](connection-points.md) for complete connection point definitions.

| Archetype | Connection Points | Default In | Default Out |
|-----------|-------------------|------------|-------------|
| `str*`, `crv*`, `flex` | `in`, `out` | `in` | `out` |
| `tol` | `in`, `out`, `left` | `in` | `out` |
| `tor` | `in`, `out`, `right` | `in` | `out` |
| `wye` | `in`, `left`, `right` | `in` | (must specify) |
| `t3w` | `in`, `out`, `left`, `right` | `in` | `out` |
| `ctol`, `ctor` | `in`, `inner`, `outer` | `in` | (must specify) |
| `x90`, `x45`, `dslip`, `sslip` | `in1`, `out1`, `in2`, `out2` | `in1` | `out1` |
| `bump` | `in` | `in` | (none) |
