# HO Track Archetype Dimensions

Based on standard HO scale track specifications from Atlas and Peco.

## Unit System

All dimensions are in **inches**. In the simulator, 1 unit = 1 inch.

## Archetype Code Reference

### Quick Reference Table

| Code | Description | Default For |
|------|-------------|-------------|
| **Straights** |
| `str9` | Straight 9" | `str` |
| `str6` | Straight 6" | |
| `str3` | Straight 3" | |
| `str15` | Straight 1.5" | |
| **Curves Left** |
| `crvl18` | Curve left, 18" radius | |
| `crvl22` | Curve left, 22" radius | `crvl`, `crv` |
| `crvl24` | Curve left, 24" radius | |
| **Curves Right** |
| `crvr18` | Curve right, 18" radius | |
| `crvr22` | Curve right, 22" radius | `crvr` |
| `crvr24` | Curve right, 24" radius | |
| **Crossings** |
| `x90` | 90° crossing | |
| `x45` | 45° crossing | |
| **Bumper** |
| `bump` | Bumper / buffer stop | |
| **Flex** |
| `flex` | Flex track | |
| **Placeholder** |
| `ph` | Placeholder (zero-length junction) | `placeholder` |
| **Generator** |
| `gen` | Generator (train source) | `generator` |
| **Bin** |
| `bin` | Bin (train removal) | |

### Default Aliases

| Alias | Resolves To |
|-------|-------------|
| `str` | `str9` |
| `crv` | `crvl22` |
| `crvl` | `crvl22` |
| `crvr` | `crvr22` |
| `placeholder` | `ph` |
| `generator` | `gen` |

---

## Reference Specifications

| Property | Value | Source |
|----------|-------|--------|
| Standard Curve Radius | 22" | Common HO standard |
| Standard Arc Angle | 22.5° | 16 pieces = full circle |

Sources:
- [Atlas Model Railroad](https://shop.atlasrr.com)
- [Peco Track](https://peco-uk.com)

---

## Coordinate System

- **Origin**: Center of the piece (for symmetric pieces) or input connection point
- **X-axis**: Primary direction of travel (positive = forward)
- **Z-axis**: Lateral offset (positive = left when facing forward)
- **Y-axis**: Vertical (always 0 for 2D version)

See [Connection Points](connection-points.md) for detailed connection point naming conventions.

---

## Archetype Definitions

### Straights

#### `str9` - Straight 9" (default)

```
Code: str9
Aliases: str
Length: 9"

Section 1:
  Spline Points: [(0, 0, 0), (9, 0, 0)]

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections [1]
  out: position (9, 0, 0), direction (1, 0, 0), sections [1]
```

#### `str6` - Straight 6"

```
Code: str6
Length: 6"

Section 1:
  Spline Points: [(0, 0, 0), (6, 0, 0)]

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections [1]
  out: position (6, 0, 0), direction (1, 0, 0), sections [1]
```

#### `str3` - Straight 3"

```
Code: str3
Length: 3"

Section 1:
  Spline Points: [(0, 0, 0), (3, 0, 0)]

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections [1]
  out: position (3, 0, 0), direction (1, 0, 0), sections [1]
```

#### `str15` - Straight 1.5"

```
Code: str15
Length: 1.5"

Section 1:
  Spline Points: [(0, 0, 0), (1.5, 0, 0)]

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections [1]
  out: position (1.5, 0, 0), direction (1, 0, 0), sections [1]
```

---

### Curves Left

All curves use 22.5° arc angle (16 pieces = full circle).

#### `crvl18` - Curve Left 18" Radius

```
Code: crvl18
Radius: 18"
Arc: 22.5° (0.3927 radians)
Arc Length: 7.07"

Section 1:
  Spline Points: Arc curving left
    Start:  (0, 0, 0)
    Mid:    (6.98, 0, 0.69)
    End:    (6.93, 0, 1.40)

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections [1]
  out: position (6.93, 0, 1.40), direction (0.924, 0, 0.383), sections [1]
```

#### `crvl22` - Curve Left 22" Radius (default)

```
Code: crvl22
Aliases: crvl, crv
Radius: 22"
Arc: 22.5° (0.3927 radians)
Arc Length: 8.64"

Section 1:
  Spline Points: Arc curving left
    Start:  (0, 0, 0)
    Mid:    (8.53, 0, 0.85)
    End:    (8.47, 0, 1.71)

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections [1]
  out: position (8.47, 0, 1.71), direction (0.924, 0, 0.383), sections [1]
```

#### `crvl24` - Curve Left 24" Radius

```
Code: crvl24
Radius: 24"
Arc: 22.5° (0.3927 radians)
Arc Length: 9.42"

Section 1:
  Spline Points: Arc curving left
    Start:  (0, 0, 0)
    Mid:    (9.30, 0, 0.93)
    End:    (9.24, 0, 1.87)

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections [1]
  out: position (9.24, 0, 1.87), direction (0.924, 0, 0.383), sections [1]
```

---

### Curves Right

Mirror of left curves (negate Z coordinates).

#### `crvr18` - Curve Right 18" Radius

```
Code: crvr18
Radius: 18"
Arc: 22.5°
Arc Length: 7.07"

Section 1:
  Spline Points: Arc curving right
    Start:  (0, 0, 0)
    Mid:    (6.98, 0, -0.69)
    End:    (6.93, 0, -1.40)

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections [1]
  out: position (6.93, 0, -1.40), direction (0.924, 0, -0.383), sections [1]
```

#### `crvr22` - Curve Right 22" Radius (default)

```
Code: crvr22
Aliases: crvr
Radius: 22"
Arc: 22.5°
Arc Length: 8.64"

Section 1:
  Spline Points: Arc curving right
    Start:  (0, 0, 0)
    Mid:    (8.53, 0, -0.85)
    End:    (8.47, 0, -1.71)

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections [1]
  out: position (8.47, 0, -1.71), direction (0.924, 0, -0.383), sections [1]
```

#### `crvr24` - Curve Right 24" Radius

```
Code: crvr24
Radius: 24"
Arc: 22.5°
Arc Length: 9.42"

Section 1:
  Spline Points: Arc curving right
    Start:  (0, 0, 0)
    Mid:    (9.30, 0, -0.93)
    End:    (9.24, 0, -1.87)

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections [1]
  out: position (9.24, 0, -1.87), direction (0.924, 0, -0.383), sections [1]
```

---

### Crossings

#### `x90` - 90° Crossing

```
Code: x90
Track Length Through Crossing: 6" each direction

Section 1 (Track 1, East-West):
  Spline Points: [(-3, 0, 0), (3, 0, 0)]

Section 2 (Track 2, North-South):
  Spline Points: [(0, 0, -3), (0, 0, 3)]

Connection Points:
  in1:  position (-3, 0, 0), direction (-1, 0, 0), sections [1]
  out1: position (3, 0, 0), direction (1, 0, 0), sections [1]
  in2:  position (0, 0, -3), direction (0, 0, -1), sections [2]
  out2: position (0, 0, 3), direction (0, 0, 1), sections [2]

Collision Points:
  center: position (0, 0, 0)
    - Section 1 at distance 3" (midpoint)
    - Section 2 at distance 3" (midpoint)

Routes:
  - Track 1: in1 ↔ out1 (Section 1)
  - Track 2: in2 ↔ out2 (Section 2)
```

#### `x45` - 45° Crossing

```
Code: x45
Track Length Through Crossing: 6" each direction

Section 1 (Track 1, East-West):
  Spline Points: [(-3, 0, 0), (3, 0, 0)]

Section 2 (Track 2, 45°):
  Spline Points: [(-2.12, 0, -2.12), (2.12, 0, 2.12)]

Connection Points:
  in1:  position (-3, 0, 0), direction (-1, 0, 0), sections [1]
  out1: position (3, 0, 0), direction (1, 0, 0), sections [1]
  in2:  position (-2.12, 0, -2.12), direction (-0.707, 0, -0.707), sections [2]
  out2: position (2.12, 0, 2.12), direction (0.707, 0, 0.707), sections [2]

Collision Points:
  center: position (0, 0, 0)
    - Section 1 at distance 3"
    - Section 2 at distance 3"

Routes:
  - Track 1: in1 ↔ out1 (Section 1)
  - Track 2: in2 ↔ out2 (Section 2)
```

---

### Bumper

#### `bump` - Bumper / Buffer Stop

```
Code: bump
Length: 3"

Section 1:
  Spline Points: [(0, 0, 0), (3, 0, 0)]

Connection Points:
  in: position (0, 0, 0), direction (-1, 0, 0), sections [1]

(No connection at buffer end - track terminates at x=3)
```

---

### Flex

#### `flex` - Flex Track

```
Code: flex
Geometry: Computed at placement time

Section 1:
  Spline Points: Generated to connect two arbitrary connection points,
                 matching position and tangent direction at each end.

  Algorithm: Hermite or Cubic Bezier interpolation with control
             points placed to ensure tangent continuity.

Connection Points:
  in:  position (defined at placement), direction (defined at placement), sections [1]
  out: position (defined at placement), direction (defined at placement), sections [1]
```

---

### Placeholder

#### `ph` - Placeholder (Zero-Length Junction)

```
Code: ph
Aliases: placeholder
Length: 0"

Sections: None (no traversable track)

Connection Points:
  in:  position (0, 0, 0), direction (-1, 0, 0), sections []
  out: position (0, 0, 0), direction (1, 0, 0), sections []

(Both connection points are at the same position with opposite directions)
```

A placeholder is a zero-length piece with no physical track. It serves as a pure junction point for virtual switches, allowing multiple tracks to branch from a single conceptual point without committing to any track piece as the "base" of the junction.

---

### Generator

#### `gen` - Generator (Train Source)

```
Code: gen
Aliases: generator
Visual: Small circle (~cab/car size)

Section 1 (Invisible):
  Internal track where trains are created before entering the layout.
  Length and geometry are implementation-defined.

Connection Points:
  out: position (0, 0, 0), direction (1, 0, 0), sections [1]

(No input connection - trains originate here)
```

A generator is where trains enter the layout. Trains are created on an invisible internal track section and become visible as they move onto the connected layout track. DSL parameters for generation frequency and train composition are not yet defined.

---

### Bin

#### `bin` - Bin (Train Removal)

```
Code: bin
Visual: Small circle (~cab/car size, similar to generator)

Sections: None (zero-length)

Connection Points:
  in: position (0, 0, 0), direction (-1, 0, 0), sections []

(No output connection - trains are removed here)
```

A bin is the opposite of a generator. Trains entering the bin are removed from the simulation. Unlike a bumper which stops trains, a bin removes them entirely.

---

## Archived Content

Physical switch archetypes (turnouts, wyes, curved turnouts, slips) have been removed in favor of virtual switches. See [ARCHIVED_SWITCHES.md](../ARCHIVED_SWITCHES.md) for historical documentation including full spline point definitions for those pieces.
