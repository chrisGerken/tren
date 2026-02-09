# Layout Definition Language

This document describes the domain-specific language (DSL) for defining track layouts in text files.

## File Format

Layout files are plain text. Blank lines are ignored. Comments begin with `#`.

**Case Insensitivity:** All DSL keywords (e.g., `new`, `title`, `cabs`, `every`, `colorful`, `black`), archetype names (e.g., `gen`, `str`, `crvl`, `x90`), connection point names (e.g., `in`, `out`), and names defined with `def`/`define` are case-insensitive. `GEN`, `Gen`, and `gen` are all equivalent. Labels (e.g., `myLabel:` and `$myLabel`) remain case-sensitive.

## Metadata Statements

### Title

The `title` statement provides a short name for the layout, used in the UI for labeling:

```
title My Railroad Layout
```

Only one title statement is allowed per layout. If no title is specified, the default is "Simulador de Tren".

### Description

The `description` statement provides additional information about the layout:

```
description A simple oval with passing siding.
description Created for testing virtual switches.
```

Multiple description statements are allowed and will be concatenated with spaces.

### Lock Ahead

The `lockahead` statement configures how far ahead trains look and lock connection points for collision prevention:

```
lockahead distance 15         # Look ahead 15 inches (default: 10)
lockahead count 3             # Lock at least 3 connection points (default: 2)
lockahead distance 20 count 4 # Set both parameters
```

**Parameters:**
- `distance N` - Minimum distance (in inches) to scan ahead for connection points to lock
- `count N` - Minimum number of connection points to acquire before proceeding

**Defaults**: distance 10 inches, count 2 connection points. Higher values provide more safety margin but may cause trains to stop earlier. Lower values allow tighter operation but increase collision risk on complex track.

### Random Switch Mode

The `random` statement enables random route selection at all switches:

```
random                        # Enable random switch mode
```

When `random` is present:
- Each train randomly selects a route when it first reaches any switch
- All cars in the same train follow the same randomly-selected route
- Different trains may take different routes at the same switch
- Switch indicators remain visible but their settings are ignored
- Creates varied and unpredictable train behavior

This mode is ideal for computer art, demonstrations, or passive observation without user interaction.

### Maximum Trains

The `max trains` statement limits the number of trains that can exist on the layout simultaneously:

```
max trains 5                  # Allow at most 5 trains
max trains 10                 # Allow at most 10 trains
```

When `max trains` is set:
- Generators will not spawn new trains when the layout already has the maximum number
- When a train is destroyed (e.g., enters a bin), generators can spawn again
- If multiple generators try to spawn simultaneously, the count may briefly exceed the limit (this is acceptable)
- Useful for preventing overcrowding on busy layouts
- Works well with `random` mode for controlled chaos

**Default**: 5 trains. Specify a higher number for busier layouts.

### Log Level

The `log` (or `logging`) statement controls the verbosity of browser console output:

```
log debug                     # Show all messages
log info                      # Show info, warn, and error
log warn                      # Show warn and error (default)
log error                     # Show only errors
```

**Levels (from most to least verbose):**
- `debug` — Detailed internal information: geometry calculations, lock acquisition/release, piece placement, spline math, connection details
- `info` — User-visible events: train spawned, train removed/binned, layout loaded, generator toggled, simulation start/stop
- `warn` — Potential issues: no intersection for cross connect, no flex solution, no track at splice
- `error` — Failures: NaN in rendering, file I/O errors

`warning` is accepted as an alias for `warn`. Multiple `log` statements are allowed. Each changes the level from that point forward during layout building; the last one sets the runtime level. If no `log` statement is present, the default level is `warn`.

### Custom Track Pieces (Define)

The `define` statement creates custom curve or straight track pieces for use throughout the layout:

```
define <name> <direction> radius <r> arc <a>    # For curves
define <name> straight length <l>                # For straights
def <name> left radius 18 arc 45                 # Short form (curve)
def <name> s length 12                           # Short form (straight)
```

**Parameters:**
- `<name>` - A unique identifier for the custom piece (cannot be an existing keyword)
- `<direction>` - One of: `left`/`l`, `right`/`r`, or `straight`/`s`
- `radius <r>` - Curve radius in inches (required for curves)
- `arc <a>` - Curve arc angle in degrees (required for curves)
- `length <l>` - Straight length in inches (required for straights)

**For curves (left/right):**
- `radius` and `arc` are required
- `length` is not allowed
- Creates a `crvl` or `crvr` archetype with the specified geometry

**For straights:**
- `length` is required
- `radius` and `arc` are not allowed
- Creates a `str` archetype with the specified length

**Examples:**
```
# Define a tight 45-degree left curve
define tight_left left radius 12 arc 45

# Define a wide 22.5-degree right curve
def wide_right r radius 30 arc 22.5

# Define a short straight piece
define short_str straight length 4.5

# Use the custom pieces
tight_left x 4        # Four tight curves (180 degrees)
wide_right x 8        # Eight wide curves (180 degrees)
short_str x 2         # Two short straights
```

Once defined, custom pieces can be used anywhere standard pieces are used, including with repetition (`x N`) and labels.

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

The `new` statement begins a new track segment. It supports flexible modifiers that can appear in any order:

```
new                              # Start at origin, 0° rotation
new degrees 45                   # Start at origin, rotated 45°
new base $label                  # Start from label's 'out' point
new base $label.in               # Start from label's 'in' point
new offset 10                    # Start 10 units forward from origin
new degrees 90 base $junction    # Start from junction, rotated 90° from its direction
new offset 5 degrees 45 base $start.out   # All modifiers combined
```

**Modifiers:**
- `degrees DEG` - Rotation in degrees (relative to base direction, or absolute if no base)
- `offset DIST` - Distance along the direction to offset the starting point
- `base REF` - Connection point reference to start from (e.g., `$label` or `$label.point`)

**Legacy syntax** (still supported for backward compatibility):
```
new 45                  # Same as: new degrees 45
new from $label         # Same as: new base $label
new from $label.in      # Same as: new base $label.in
new $label.out          # Same as: new base $label.out
```

The next track piece placed after `new` will:
- Start at the specified position and rotation
- Connect to the labeled piece if `base $label` was specified

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
| `str`, `str9`, `str6`, `str3`, `str15` | Straight sections (`str` = `str9`, 9" length) |
| `crv`, `crvl`, `crvl18`, `crvl22`, `crvl24` | Left curves (`crv`/`crvl` = `crvl22`, 22" radius, 22.5° arc) |
| `crvr`, `crvr18`, `crvr22`, `crvr24` | Right curves (`crvr` = `crvr22`, 22" radius, 22.5° arc) |
| `x90`, `x45` | Crossings |
| `bump` | Buffer stop |
| `flex` | Flex track |
| `ph`, `placeholder` | Zero-length junction point |
| `gen`, `generator` | Train source (see Generator Syntax below) |
| `bin` | Train sink (trains removed) |
| `tun`, `tunnel` | Visibility toggle (hide track/trains) |
| `sem`, `semaphore` | Manual signal (see Semaphore Syntax below) |
| `dec`, `decoupler` | Train splitter (see Decoupler Syntax below) |

### Generator Syntax

Generators spawn trains. The basic syntax is just `gen`, but you can configure the train composition, speed, spawn frequency, and car colors:

```
gen                           # One train: 1 cab, 5 cars, 12"/sec, gray (default)
gen cabs 2                    # One train: 2 cabs, 5 cars
gen cars 3                    # One train: 1 cab, 3 cars
gen speed 24                  # One train at 24 inches/second
gen cabs 2 cars 3             # One train: 2 cabs, 3 cars
gen every 10                  # New train every 10 seconds: 1 cab, 5 cars
gen colorful                  # One train with vibrant colored cars
gen gray                      # One train with grayscale cars (default)
gen black                     # One train with all-black cars (cabs remain yellow)
gen cabs 2 cars 3 speed 6 every 10 colorful    # Full specification with colors
```

**Parameters:**
- `cabs N` - Number of cab cars (engines) at front of train. Default: 1
- `cars M` - Number of regular cars (rolling stock). Default: 5
- `speed S` - Train speed in inches per second. Default: 12
- `every S` - Spawn frequency in seconds. If omitted, only one train is spawned.
- `colorful` - Use vibrant colors (red, blue, green, purple, yellow) for rolling stock
- `gray` - Use grayscale shades for rolling stock (default)
- `black` - All rolling stock is black (cabs remain yellow)

Parameters can appear in any order after `gen`.

**Color Modes:**
- `gray` (default): Rolling stock uses various shades of gray, creating a more realistic, industrial appearance
- `colorful`: Rolling stock uses vibrant colors (red, blue, green, purple, yellow) for a more playful appearance
- `black`: All rolling stock is solid black (0x000000), creating a uniform dark appearance. Cabs remain yellow.

The `gray` and `colorful` modes use weighted random selection where the previous car's color has a higher chance of being repeated, creating natural-looking car groupings. The `black` mode uses a single fixed color for all cars.

### Range Values

Any generator parameter can specify a range instead of a fixed value using the syntax `LOW-HIGH`:

```
gen cabs 1-2                  # Random: 1 or 2 cabs
gen cars 3-8                  # Random: 3 to 8 cars (integer)
gen speed 6-24                # Random: 6.0 to 24.0 inches/sec (real number)
gen every 10-30               # Random: 10 to 30 seconds between spawns
gen cabs 1-2 cars 3-6 speed 8-16 every 15-45   # All parameters randomized
```

When a range is specified:
- For `cabs`, `cars`, and `every`: a random **integer** is chosen (inclusive of both endpoints)
- For `speed`: a random **real number** is chosen (continuous between endpoints)

Each train spawned by the generator gets its own random values, so trains from the same generator may have different speeds, car counts, etc.

### Semaphore Syntax

Semaphores are manual signal points where you can control train traffic by clicking to lock/unlock the signal:

```
sem                           # Place a semaphore (signal point)
semaphore                     # Same as sem (alias)
signal: sem                   # Labeled semaphore
```

**Behavior:**
- **Green dot** (unlocked): Trains can pass through
- **Red dot** (locked): Trains stop and wait

**Interaction:**
- Click the green dot to lock the semaphore (turns red, trains stop)
- Click the red dot to unlock the semaphore (turns green, trains can pass)

**Visual appearance:**
- A colored status dot (green or red) inside a circle outline
- The circle is the same size as generator/bin circles
- Starts in the unlocked (green) state

**Use cases:**
- Manual traffic control at junctions
- Creating "holding points" where you can accumulate trains
- Simulating station stops or signal blocks

### Decoupler Syntax

Decouplers split a stopped train into two separate trains at the decoupler's position:

```
dec                           # Place a decoupler
decoupler                     # Same as dec (alias)
split: dec                    # Labeled decoupler
```

**Behavior:**
- **Orange triangles** (inactive): Decoupler is ready, no action
- **Red triangles** (activated): Decoupler has been triggered (flashes for 1 second)

**Interaction:**
- Click either triangle to activate the decoupler
- If a stopped train straddles the decoupler, the train is split into two stopped trains
- The coupler between consecutive cars nearest to the decoupler (within ~2 inches) is where the split occurs
- If no stopped train is found, the status bar shows "no train to split"

**Visual appearance:**
- Two small triangles, one on each side of the track, pointing toward the decoupler position
- Orange when inactive, briefly red when activated

**Use cases:**
- Splitting trains for shunting/switching operations
- Dropping off cars at sidings
- Creating separate train consists from a single train

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
> $label.point          # Same effect, alternative syntax
```

Both syntaxes are equivalent and connect the current piece's default output to the specified connection point on a labeled piece. This completes a circuit without placing a new piece.

```
start: str
crvl x 16               # Full circle of curves
> in.$start             # Close the loop: connect back to start's input

# Or equivalently:
> $start.in             # Same result using alternative syntax
```

## Splice

The `splice` statement solves a common problem when creating passing tracks or sidings: when a diverging track curves back to rejoin the main line, the merge point often falls between connection points on the main line track pieces.

### Syntax

```
splice                        # Split track at current connection point
splice $label.point           # Split track at the labeled point's position
splice using $label.point     # Same as above ('using' is optional)
```

### How It Works

1. The splice statement specifies a connection point (e.g., `$merge.out`) that should connect to an existing track
2. The system finds the track piece that the connection point falls on (even if there's no connection point there)
3. That track piece is split into two pieces at the splice location
4. A new connection point is created at the split, enabling auto-connect to create a virtual switch

### Example: Passing Siding

```
# Main line
str x 2
main: str x 8            # This will be spliced
str x 2
bump

# Passing track diverges from main
$main.in
crvl                     # Diverge left
str x 4                  # Parallel section
crvr                     # Curve back toward main
crvl                     # Rejoin angle
splice                   # Splice at current position into main line
```

Or with an explicit label:

```
$main.in
crvl ; str x 4 ; crvr
merge: crvl
splice $merge.out        # Same effect, using labeled piece
```

Without splice, you would need to calculate exact piece lengths to ensure the merge point lands precisely on a connection point. With splice, the straight piece is automatically split at the correct location.

### Tolerances and Error Handling

**Position tolerance**: 2.0 inches. The splice point must be within 2 inches of a track spline to be considered "on" that track.

**Angle tolerance**: None. Splice does not check direction—it simply finds where the point falls on a track. The subsequent auto-connect phase handles direction matching.

**Failure behavior**: If no track is found within tolerance:
- A warning is logged to the console with the splice point coordinates
- The piece is labeled "can't splice" for visual debugging
- The layout continues to render (non-fatal error)

### Limitations

- Splice should only be used on track pieces within the same layout section
- The splice point must fall on a track piece's spline (within tolerance)
- Works best with straight pieces; curved pieces may have less precise results
- The target track must have 'in' and 'out' connection points (crossings not supported)

## Flex Connect

The `flex connect` statement automatically creates custom track pieces to bridge gaps that cannot be closed with standard track pieces. This is useful when a layout forms an almost-complete loop but the endpoints don't align perfectly with any standard piece combinations.

### Syntax

```
flex connect $label1.point1 $label2.point2
```

Where:
- `$label1.point1` - The first connection point (typically the "out" of the last piece before the gap)
- `$label2.point2` - The second connection point (typically the "in" of the first piece after the gap)

### Auto-Generated Labels

The flex connect statement automatically creates labeled pieces that can be referenced in subsequent statements:

- `{label1}_{label2}_str` - The straight piece (if created)
- `{label1}_{label2}_crv` - The curve piece (if created)

For example, `flex connect $f1.out $f2.in` creates pieces labeled `f1_f2_str` and `f1_f2_crv` that you can reference as `$f1_f2_str` or `$f1_f2_crv`.

**Note:** In edge cases where only one piece is needed:
- **Straight-only**: When endpoints are collinear (same direction, aligned path), only the `_str` label is created
- **Curve-only**: When endpoints are very close and require only a curve, only the `_crv` label is created

### How It Works

The flex connect solver:
1. Calculates the world positions and directions of both connection points
2. Checks for edge cases:
   - **Straight-only**: If endpoints are collinear (same direction, aligned path), creates a single straight piece
   - **Curve-only**: If the calculated straight length is very small (<0.5"), creates just a curve
3. Otherwise, finds a valid combination of one curve and one straight piece
4. Tries four configurations: [straight, left curve], [straight, right curve], [left curve, straight], [right curve, straight]
5. Selects the solution with the smoothest curve (largest radius)
6. Creates custom runtime track pieces with the calculated geometry
7. Labels the pieces for later reference

### Example

```
# Layout that forms an almost-complete loop
after: str
str
crvl * 4        # 90° turn

str * 2
crvl * 4        # 90° turn

str * 2
crvl * 5        # 112.5° turn

str * 2
before: str

# Bridge the gap with custom pieces
flex connect $before.out $after.in

# The flex pieces can now be referenced:
# $before_after_str - the straight piece
# $before_after_crv - the curve piece
```

### Chaining Flex Connects

You can use the auto-generated labels to connect additional tracks to flex pieces:

```
# First flex connect
flex connect $f1.out $f2.in

# Connect another track to the flex straight piece
$f1_f2_str.out       # or .in depending on which end you need
str x 3
bump
```

### Limitations

- The gap must be bridgeable with at most one curve and one straight piece
- Minimum curve radius is 5 inches (to ensure reasonable track geometry)
- Minimum straight length is 0.5 inches (shorter straights are omitted, creating curve-only solutions)
- Maximum arc angle is 270 degrees (prevents near-full-circle curves)
- If no valid solution exists, a warning is logged and the connection is not made

### Edge Case: Already-Connected Points

If you use `flex connect` on two points that are already at the same position (e.g., consecutive pieces like `s2: str` followed by `f2: str`), the solver will:
1. Detect distance ≈ 0 between the points
2. Log "Could not find flex connect solution" (no bridge needed)
3. Continue building the layout normally
4. Auto-connect will handle the connection between the adjacent pieces

This is harmless—the statement simply does nothing when no bridge is needed.

### Processing Order

Flex connect statements are processed in a specific order relative to other layout operations:

1. **Parse**: All statements are parsed into an AST
2. **Build pieces**: Regular track pieces are placed
3. **Process splices**: Track pieces are split where needed
4. **Process cross connects**: Intersection locks are added
5. **Process flex connects**: Custom bridge pieces are created and connected
6. **Auto-connect**: Adjacent pieces with opposite directions are connected

This order ensures that flex connect pieces are properly integrated with the rest of the layout before auto-connect runs.

## Cross Connect

The `cross connect` statement creates a shared lockable point where two track pieces physically cross each other. This ensures only one train can occupy the intersection at a time.

### Syntax

```
cross connect $label1 $label2
```

Where:
- `$label1` - Label of the first track piece
- `$label2` - Label of the second track piece

Both pieces must be labeled track pieces that physically intersect in world space.

### How It Works

1. The system finds where the two track pieces' splines intersect geometrically
2. A shared "intersection lock" is added to both pieces at the intersection point
3. When a train approaches the intersection, it must acquire the lock
4. If another train holds the lock, the approaching train stops and waits
5. When all cars of a train pass through the intersection, the lock is released

### Example

```
# Circular track
gen cabs 1 cars 3 speed 8 every 15
str x 3
one: str x 10
str x 3
crvl x 4
str x 3
two: str x 10
str x 3
crvl x 4

# Mark the intersection
cross connect $one $two
```

If `$one` and `$two` physically cross in world space, trains will stop to wait for each other at the intersection.

### Key Points

- **Original pieces unchanged**: Unlike splice, cross connect does not split or modify the track pieces
- **Shared lock**: Both pieces share the same lock ID at the intersection point
- **Automatic detection**: The intersection point is calculated geometrically from the track splines
- **Collision prevention**: Only one train can occupy the intersection at a time

### Difference from Crossings (x90, x45)

Built-in crossing pieces (`x90`, `x45`) are single track pieces with two independent paths. Trains on different paths can pass through simultaneously.

Cross connect works on any two existing pieces and uses locking to prevent simultaneous passage. Use cross connect when:
- You have existing track pieces that happen to cross
- You want mutual exclusion at the intersection
- The crossing angle isn't 90° or 45°

### Error Handling

If the two labeled pieces don't actually intersect geometrically:
- A warning is logged to the console
- The layout continues to work normally (no lock is created)
- Trains will pass through without stopping

## Auto-Connect

After a layout is fully specified, **auto-connect** scans all connection points on all track pieces and automatically joins any two that are close enough with opposite directions.

### How It Works

1. Examine all connection points on all track pieces (not just open endpoints)
2. For any two connection points:
   - If they are within the **position tolerance** of each other, AND
   - If their directions are approximately **opposite** (within the angle tolerance)
   - Then connect them

This automatically creates virtual switches wherever tracks meet. A single connection point can end up with multiple connections.

### Interaction with Flex Connect

Auto-connect runs AFTER flex connect processing. This means:

1. Flex connect creates explicit connections between its bridge pieces and the endpoints
2. Auto-connect then adds connections between adjacent pieces, even if one endpoint is also a flex endpoint
3. This creates proper virtual switches where trains can arrive from multiple paths

For example, if `f2.in` receives a flex connect from `f1.out`, and `s2.out` is adjacent to `f2.in`, auto-connect will still create the `s2.out → f2.in` connection. The result is a virtual switch at `f2.in` where trains can arrive from either the flex path or the direct path from `s2`.

### Tolerance

Auto-connect uses the following tolerances for matching:
- **Position tolerance**: 0.5 inches. Connection points within 0.5" are considered "at the same position"
- **Direction tolerance**: 0.1 dot product (~174°). Directions with dot product < -0.9 are considered "opposite"

This allows connections even when accumulated errors from curves and straights cause slight misalignment.

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

**Interaction:** Clicking any indicator (green or red) selects that route—the clicked indicator turns green, all other indicators turn red. The status bar shows which switch was toggled. When train simulation is implemented, trains will follow the selected route.

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
| `gen` | `in`, `out` | `in` | `out` |
| `bin` | `in`, `out` | `in` | `out` |
| `sem` | `in`, `out` | `in` | `out` |
| `dec` | `in`, `out` | `in` | `out` |
