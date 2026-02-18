# Layout DSL Cheatsheet

Quick reference for all DSL statements, alphabetized. For full documentation see [layout-dsl.md](layout-dsl.md).

All keywords, archetype names, and connection point names are **case-insensitive**. Labels are case-sensitive.

## Table of Contents

- [Symbols](#symbols)
  - [# — Comment](#---comment)
  - [$ — Label Reference](#---label-reference)
  - [> — Loop Close](#---loop-close)
  - [@ — Current Piece Reference](#---current-piece-reference)
- [A–Z](#az)
  - [array](#array)
  - [assign](#assign)
  - [bin](#bin)
  - [bump](#bump)
  - [cross connect](#cross-connect)
  - [crv / crvl / crvr](#crv--crvl--crvr)
  - [dec / decoupler](#dec--decoupler)
  - [define / def](#define--def)
  - [description](#description)
  - [flex connect](#flex-connect)
  - [gen / generator](#gen--generator)
  - [grid size](#grid-size)
  - [label:](#label)
  - [lockahead](#lockahead)
  - [log / logging](#log--logging)
  - [max trains](#max-trains)
  - [new](#new)
  - [ph / placeholder](#ph--placeholder)
  - [pond](#pond)
  - [prefab / use](#prefab--use)
  - [random](#random)
  - [sem / semaphore](#sem--semaphore)
  - [spd / speedlimit](#spd--speedlimit)
  - [splice](#splice)
  - [str / str3 / str6 / str9 / str15](#str--str3--str6--str9--str15)
  - [title](#title)
  - [trees](#trees)
  - [tun / tunnel](#tun--tunnel)
  - [x90 / x45](#x90--x45)

---

## Symbols

### # — Comment

```
# Full line comment
str   # Inline comment
```

---

### $ — Label Reference

Reference a previously labeled piece's connection point.

```
$label              # Reference 'out' of labeled piece
$label.out          # Explicit connection point
$label.in
$label+N.out        # Traverse N pieces forward from label (no new label created)
$label-N.in         # Traverse N pieces backward from label
```

Use in: `new base`, loop close (`>`), branching, `flex connect`, `cross connect`, `splice`, `assign`.

---

### > — Loop Close

Connect the current piece's output to a labeled piece's connection point, closing a loop.

```
> $label.in         # Connect current out to label's 'in'
> in.$label         # Same, alternative syntax
```

Can also close with same-polarity connections (out↔out or in↔in); trains automatically reverse spline direction at those junctions.

---

### @ — Current Piece Reference

Refers to the most recently placed or referenced piece. Supports negative offsets only.

```
@                   # Current piece (default 'out')
@.in                # Current piece's 'in'
@-N                 # N pieces backward from current
@-N.point           # N pieces backward, specific point
```

Works in: `new base`, loop close, `assign`, `flex connect`, `cross connect`. In deferred statements (`flex connect`, `cross connect`, `splice`), `@` captures the piece at statement encounter time.

---

## A–Z

### array

Creates N evenly-spaced labeled placeholders along a line from the current position. Useful for parallel tracks and yards.

```
array count N angle A distance D prefix P
```

- `count N` — number of placeholders (N ≥ 1)
- `angle A` — degrees relative to current direction for the array line
- `distance D` — spacing in inches between placeholders
- `prefix P` — label prefix; pieces become P1, P2, …, PN

Builder continues from first placeholder. Access others via `$P2.out`, `$P3.out`, etc.

```
gen ; str x 3
array count 3 angle 90 distance 12 prefix siding_
str x 8 ; bump            # Main line from siding_1

$siding_2.out ; str x 5 ; bump
$siding_3.out ; str x 5 ; bump
```

---

### assign

Labels an existing piece by counting forward (+) or backward (-) from an already-labeled piece.

```
assign <label> to <target> + N    # N steps forward from target
assign <label> to <target> - N    # N steps backward from target
assign <label> to $target + N     # $-prefix accepted
assign <label> to @               # Current piece
assign <label> to @ - N           # N steps backward from current
```

The assigned label is immediately available for subsequent references. Useful for labeling pieces inside repetitions like `str * 8` without breaking them up.

```
start: ph ; str * 8
assign mid to start + 4    # Labels the 4th str
```

---

### bin

Train sink. Trains that enter a bin are removed from the layout.

```
bin
staging: bin        # Labeled bin
```

Connection points: `in`, `out` (out is a dead end — exempt from unconnected-endpoint warnings).

---

### bump

Buffer stop / dead end.

```
bump
end: bump           # Labeled bump
```

Connection point: `in` only (`out` exempt from unconnected-endpoint warnings).

---

### cross connect

Marks two physically-crossing track pieces so only one train can occupy the intersection at a time (shared lock).

```
cross connect $label1 $label2
cross connect @ $label2
cross connect @-N $label2
```

Unlike `splice`, the original pieces are unchanged — only an intersection lock is added. If the pieces don't geometrically intersect, a warning is logged and no lock is created.

```
one: str x 10
...
two: str x 10
cross connect $one $two
```

---

### crv / crvl / crvr

Curve pieces.

| Code | Description |
|------|-------------|
| `crv`, `crvl`, `crvl22` | Left curve, 22" radius, 22.5° arc (default) |
| `crvl18` | Left curve, 18" radius, 22.5° arc |
| `crvl24` | Left curve, 24" radius, 22.5° arc |
| `crvr`, `crvr22` | Right curve, 22" radius, 22.5° arc (default) |
| `crvr18`, `crvr24` | Right curves, 18" / 24" radius |

Use `define` to create custom curve radii or arc angles.

---

### dec / decoupler

Splits a stopped train at the decoupler's position. Click to activate.

```
dec
split: decoupler    # Labeled decoupler
```

- Orange triangles = inactive (ready)
- Red triangles = activated (flashes 1 second)
- Splits the train at the coupling nearest to the decoupler (within ~2")
- If no stopped train is found, status bar shows "no train to split"

---

### define / def

Creates a custom curve or straight piece for use like a built-in archetype.

```
define <name> left   radius <r> arc <a>     # Left curve
define <name> right  radius <r> arc <a>     # Right curve
define <name> straight length <l>           # Straight
def <name> l radius 18 arc 45              # Short form
```

After definition, use exactly like built-in pieces including repetition:

```
define tight left radius 12 arc 45
tight x 4               # Four 45° tight left curves (= 180°)
```

---

### description

Layout description shown in the UI. Multiple statements concatenate with spaces.

```
description A simple oval with a passing siding.
description Built for testing purposes.
```

---

### flex connect

Automatically creates custom track pieces (curve + straight, or S-curve) to bridge a gap between two connection points.

```
flex connect $label1.point $label2.point
flex connect @ $label2.point
```

Creates labeled bridge pieces:
- `{l1}_{l2}_str` — straight piece (if created)
- `{l1}_{l2}_crv` — curve piece (if created)
- `{l1}_{l2}_crv1`, `{l1}_{l2}_crv2` — S-curve pieces

Processed after regular pieces and splices, before auto-connect. `@` captures current piece at statement encounter time; subsequent pieces do not advance `@` for this statement.

**Important:** Place any pieces you want on the approach *before* `flex connect`, not after it:
```
str x 8
speedlimit 20           # ← correct: placed before flex
flex connect @ $target.in
```

Limitations: max one curve + one straight; min radius 5"; min straight 0.5"; max arc 270°.

---

### gen / generator

Train source. Spawns trains when enabled. Click to toggle on/off.

```
gen                                     # Default: 1 cab, 5 cars, 12"/s, gray, one-shot
gen cabs 2 cars 8 speed 16 every 30    # Full specification
gen cabs 1-3 cars 4-12 speed 8-20      # Range values (randomized per spawn)
gen colorful                            # Vibrant car colors
gen gray                                # Grayscale cars (default)
gen black                               # All-black cars (cabs stay dark orange)
```

Parameters (any order):
| Parameter | Default | Notes |
|-----------|---------|-------|
| `cabs N` | 1 | Integer or range `1-3` |
| `cars N` | 5 | Integer or range `3-8` |
| `speed N` | 12 "/s | Real or range `6-24` |
| `every N` | (one-shot) | Seconds; integer or range |
| `colorful`/`gray`/`black` | gray | Color mode |

Double-click generator to open inspector (sliders + toggles, takes effect on next spawn).

---

### grid size

Sets the cell size (in inches) for the scenery scoring grid used by `trees` and `pond`.

```
grid size N         # Default: 8 inches
```

Larger cells → coarser, sparser scenery. Smaller cells → finer, denser scenery. Should appear before `trees` or `pond` statements.

---

### label:

Assign a label to the next piece placed. Labels are case-sensitive.

```
junction: ph        # Label the placeholder "junction"
start: str x 3      # Labels only the FIRST str
```

Reference with `$label` or `$label.point`. Use [`assign`](#assign) to label a piece inside a repetition.

---

### lockahead

Configures collision-prevention lock scanning distance and count.

```
lockahead distance 15             # Inches to scan ahead (default: 10)
lockahead count 3                 # Min connection points to lock (default: 2)
lockahead distance 20 count 4    # Both parameters
```

Higher values = more safety margin but earlier stops. Lower values = tighter operation, higher collision risk.

---

### log / logging

Controls browser console verbosity. `logging` is an alias.

```
log debug                   # All debug messages
log debug speed lock        # Only SPEED and LOCK debug categories
log info                    # Info, warn, error
log warn                    # Warn and error (default)
log error                   # Errors only
```

Debug categories: `layout`, `flex`, `cross`, `switch`, `lock`, `train`, `speed`, `graph`, `render`.

`warning` is an alias for `warn`. Multiple `log` statements allowed; last one sets runtime level.

---

### max trains

Limits simultaneous trains on the layout.

```
max trains 5        # Default: 5
max trains 10
```

Generators will not spawn new trains when the limit is reached. When a train enters a bin, the count decreases and generators can spawn again.

---

### new

Starts a new track segment. An implicit `new 0` is assumed at the start of every layout.

```
new                              # Origin, 0° rotation
new degrees 45                   # Origin, rotated 45°
new base $label                  # From label's 'out' point
new base $label.in               # From label's 'in' point
new offset 10                    # 10 units forward from origin
new degrees 90 base $junction    # From junction, +90° rotation
new offset 5 degrees 45 base $start.out
```

Modifiers (`degrees`, `base`, `offset`) can appear in any order.

**Legacy syntax** (still supported):
```
new 45              # = new degrees 45
new from $label     # = new base $label
new $label.out      # = new base $label.out
```

When a `new`-started segment is later explicitly connected to another segment (via `$label.point`), the entire new segment repositions so the connection points align.

---

### ph / placeholder

Zero-length junction point. Provides `in` and `out` connection points with no physical track. Ideal as a pure junction point for virtual switches.

```
ph
junction: ph        # Labeled placeholder
```

Both `in` and `out` are at the same world position. Use to create virtual switches:

```
junction: ph
str x 3 ; bump          # Main route from junction.out
$junction.out
crvl x 3 ; bump         # Diverging route from junction.out
```

---

### pond

Places a body of water in an open area. Uses the same grid-based distance scoring as `trees`. Placed before trees (modifies the grid so trees avoid pond edges).

```
pond                            # Enable with defaults
pond size N                     # Grid cells to fill (default: 20)
pond clearance N                # Min score for placement (default: 3)
pond score S                    # Score assigned to pond cells (default: min - 1)
pond size 25 clearance 4 score 0
```

Pond shape is organic (randomized BFS growth), varies each reload. `score` controls tree buffer around the pond: lower score = wider buffer.

---

### prefab / use

Define and expand reusable DSL templates. `prefabrication` is an alias for `prefab`.

**Define:**
```
prefab <name> {
  <DSL statements using [key] placeholders>
}
```

**Expand:**
```
use <name> key1 value1 key2 value2 ...
```

Values with spaces must be quoted. Placeholders (`[key]`) can appear anywhere in the body, including in label names and piece codes.

```
prefab siding {
  $[junc]: ph
  str x [len] ; bump
}

use siding junc yard1 len 5
use siding junc yard2 len 3
```

---

### random

Enables random route selection at all switches for the entire layout.

```
random
```

Each train picks a random route at each switch. Creates varied, computer-operated behavior. Ideal for displays or passive observation.

---

### sem / semaphore

Manual signal point. Click the dot to lock/unlock.

```
sem
signal: semaphore   # Labeled semaphore
```

- **Green dot** — unlocked, trains pass through
- **Red dot** — locked, trains stop and wait

Click to toggle. Starts unlocked. Use for manual traffic control, holding points, or simulated station stops.

---

### spd / speedlimit

Sets a speed cap for trains passing the sign. `speedlimit` is an alias.

```
spd 6               # 6 inches/second limit
spd 24              # 24 inches/second limit
speedlimit 12       # Same as spd 12
slow: spd 6         # Labeled speed limit
```

Effect: `effectiveSpeed = min(desiredSpeed, speedLimit)`. Place a higher `spd` value later to let trains speed back up. Default limit if N omitted: 12 "/s.

Rendered as a white circle with bold speed number.

**Must be placed before `flex connect` on the same chain:**
```
speedlimit 20
flex connect @ $target.in   # ← correct order
```

---

### splice

Splits an existing track piece at a point, creating a connection for a diverging track to rejoin the main line. Useful for passing sidings where the merge point falls between existing connection points.

```
splice                        # Splice at current connection point
splice $label.point           # Splice at labeled point's position
splice using $label.point     # 'using' is optional
```

Finds which existing piece the splice point falls on, splits it at that location, and creates a new connection point there. Position tolerance: 2 inches. Works best on straight pieces.

```
main: str x 8
str x 2 ; bump

$main.in
crvl ; str x 4 ; crvr
splice               # Rejoin main line wherever current position falls on it
```

---

### str / str3 / str6 / str9 / str15

Straight track pieces.

| Code | Length |
|------|--------|
| `str`, `str9` | 9 inches (default) |
| `str3` | 3 inches |
| `str6` | 6 inches |
| `str15` | 15 inches |

Use `define` to create custom lengths.

---

### title

Short layout name shown in the UI. One per layout.

```
title My Railroad Layout
```

Default: "No Title".

---

### trees

Places tree scenery in open areas using grid-based distance scoring.

```
trees                           # Enable with defaults
trees none                      # Explicitly disable
trees clearance N               # Min score for placement (default: 2)
trees density N                 # Max trees per cell (default: 3)
trees factor F                  # floor(F × score) trees per cell
trees clearance 4 density 2     # Parameters in any order
```

**Density mode** (default): tree count ramps from 1 to `density` as score increases beyond `clearance`.

**Factor mode**: tree count = `floor(factor × score)`, scales linearly with distance from track.

Each tree renders as 3–5 overlapping dark green circles (top-down view). Trees do not affect camera framing.

---

### tun / tunnel

Visibility toggle. Track and trains between two `tun` pieces are hidden. `tunnel` is an alias.

```
tun
str x 5         # Hidden section
tun             # End tunnel
```

Hidden pieces are excluded from scenery scoring (trees won't appear inside tunnels).

---

### x90 / x45

Built-in crossing pieces with two independent paths.

| Code | Description |
|------|-------------|
| `x90` | 90° crossing |
| `x45` | 45° crossing |

Connection points: `in1`, `out1` (path 1), `in2`, `out2` (path 2). Trains on different paths pass through simultaneously (no locking). Use `cross connect` for mutual exclusion.

```
cross: x90
$cross.in2         # Connect second path
```

---

## Repetition

Both `x` and `*` work as repetition operators.

```
str x 5             # Five straights
crvl * 4            # Four left curves (= 90°)
crvl x 16           # Full circle
```

---

## Explicit Connection Syntax

Specify which end of a piece attaches to the current position:

```
str                 # Attach str.in to previous, continue from str.out (default)
out.str             # Attach str.out to previous, continue from str.in (build backwards)
in2.x90             # Attach x90.in2 to previous (crossings)
```

---

## Connection Points Quick Reference

| Piece | Points | Default In | Default Out |
|-------|--------|-----------|------------|
| `str*`, `crv*`, `flex` | `in`, `out` | `in` | `out` |
| `x90`, `x45` | `in1`, `out1`, `in2`, `out2` | `in1` | `out1` |
| `bump` | `in` | `in` | — |
| `ph`, `tun`, `gen`, `bin`, `sem`, `dec`, `spd` | `in`, `out` | `in` | `out` |
