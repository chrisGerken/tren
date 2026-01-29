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
| **Turnouts** |
| `tol` | Turnout left (#6) | `to` |
| `tor` | Turnout right (#6) | |
| **Wye** |
| `wye` | Wye turnout | |
| **Three-Way** |
| `t3w` | Three-way turnout | |
| **Curved Turnouts** |
| `ctol` | Curved turnout left | `cto` |
| `ctor` | Curved turnout right | |
| **Crossings** |
| `x90` | 90° crossing | |
| `x45` | 45° crossing | |
| **Slips** |
| `dslip` | Double slip | |
| `sslip` | Single slip | |
| **Bumper** |
| `bump` | Bumper / buffer stop | |
| **Flex** |
| `flex` | Flex track | |

### Default Aliases

| Alias | Resolves To |
|-------|-------------|
| `str` | `str9` |
| `crv` | `crvl22` |
| `crvl` | `crvl22` |
| `crvr` | `crvr22` |
| `to` | `tol` |
| `cto` | `ctol` |

---

## Reference Specifications

| Property | Value | Source |
|----------|-------|--------|
| #6 Frog Angle | 9.5° | Standard |
| Standard Turnout Length | 12" | Atlas Customline |
| Standard Curve Radius | 22" | Common HO standard |
| Standard Arc Angle | 22.5° | 16 pieces = full circle |
| Wye Diverging Angle | 9.5° each side | ~19° total |
| Three-Way Angles | 12° left/right | Peco SL-99 |
| Slip Crossing Angle | 12° | Peco SL-80/90 |
| Slip Length | 9.8" | Peco |
| Curved Turnout Inner Radius | 22" | Atlas Customline |
| Curved Turnout Outer Radius | 30" | Atlas Customline |

Sources:
- [Atlas Model Railroad](https://shop.atlasrr.com)
- [Peco Track](https://peco-uk.com)
- [Trains.com HO Turnout Guide](https://www.trains.com/mrr/beginners/ho-scale-no-6-turnouts/)

---

## Coordinate System

- **Origin**: Center of the piece (for symmetric pieces) or common connection point (for turnouts)
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

### Turnouts

#### `tol` - Turnout Left (#6) (default)

```
Code: tol
Aliases: to
Length: 12"
Diverging Angle: 9.5°

Section 1 (Straight):
  Spline Points: [(0, 0, 0), (12, 0, 0)]

Section 2 (Diverging Left):
  Spline Points: [(0, 0, 0), (6, 0, 0.5), (12, 0, 2.0)]
  Exit offset: 12 * tan(9.5°) = 2.0"

Connection Points:
  in:   position (0, 0, 0), direction (-1, 0, 0), sections [1, 2]
  out:  position (12, 0, 0), direction (1, 0, 0), sections [1]
  left: position (12, 0, 2.0), direction (0.986, 0, 0.165), sections [2]

States:
  - normal: in ↔ out (Section 1)
  - diverging: in ↔ left (Section 2)
```

#### `tor` - Turnout Right (#6)

```
Code: tor
Length: 12"
Diverging Angle: 9.5°

Section 1 (Straight):
  Spline Points: [(0, 0, 0), (12, 0, 0)]

Section 2 (Diverging Right):
  Spline Points: [(0, 0, 0), (6, 0, -0.5), (12, 0, -2.0)]

Connection Points:
  in:    position (0, 0, 0), direction (-1, 0, 0), sections [1, 2]
  out:   position (12, 0, 0), direction (1, 0, 0), sections [1]
  right: position (12, 0, -2.0), direction (0.986, 0, -0.165), sections [2]

States:
  - normal: in ↔ out (Section 1)
  - diverging: in ↔ right (Section 2)
```

---

### Wye

#### `wye` - Wye Turnout

```
Code: wye
Length: 12"
Diverging Angle: 9.5° each side (19° total spread)

Section 1 (Left):
  Spline Points: [(0, 0, 0), (6, 0, 0.5), (12, 0, 2.0)]

Section 2 (Right):
  Spline Points: [(0, 0, 0), (6, 0, -0.5), (12, 0, -2.0)]

Connection Points:
  in:    position (0, 0, 0), direction (-1, 0, 0), sections [1, 2]
  left:  position (12, 0, 2.0), direction (0.986, 0, 0.165), sections [1]
  right: position (12, 0, -2.0), direction (0.986, 0, -0.165), sections [2]

States:
  - left: in ↔ left (Section 1)
  - right: in ↔ right (Section 2)
```

---

### Three-Way

#### `t3w` - Three-Way Turnout

```
Code: t3w
Length: 8.66" (220mm)
Side Angles: 12° left and right

Section 1 (Left):
  Spline Points: [(0, 0, 0), (4.33, 0, 0.45), (8.66, 0, 1.84)]

Section 2 (Straight):
  Spline Points: [(0, 0, 0), (8.66, 0, 0)]

Section 3 (Right):
  Spline Points: [(0, 0, 0), (4.33, 0, -0.45), (8.66, 0, -1.84)]

Connection Points:
  in:    position (0, 0, 0), direction (-1, 0, 0), sections [1, 2, 3]
  left:  position (8.66, 0, 1.84), direction (0.978, 0, 0.208), sections [1]
  out:   position (8.66, 0, 0), direction (1, 0, 0), sections [2]
  right: position (8.66, 0, -1.84), direction (0.978, 0, -0.208), sections [3]

States:
  - left: in ↔ left (Section 1)
  - main: in ↔ out (Section 2)
  - right: in ↔ right (Section 3)
```

---

### Curved Turnouts

#### `ctol` - Curved Turnout Left (default)

```
Code: ctol
Aliases: cto
Inner Radius: 22"
Outer Radius: 30"
Arc: 22.5°

Section 1 (Inner):
  Spline Points: Arc at 22" radius curving left
    Start:  (0, 0, 0)
    Mid:    (8.53, 0, 0.85)
    End:    (8.47, 0, 1.71)

Section 2 (Outer):
  Spline Points: Arc at 30" radius curving left
    Start:  (0, 0, 0)
    Mid:    (11.63, 0, 1.16)
    End:    (11.55, 0, 2.34)

Connection Points:
  in:    position (0, 0, 0), direction (-1, 0, 0), sections [1, 2]
  inner: position (8.47, 0, 1.71), direction (0.924, 0, 0.383), sections [1]
  outer: position (11.55, 0, 2.34), direction (0.924, 0, 0.383), sections [2]

States:
  - inner: in ↔ inner (Section 1)
  - outer: in ↔ outer (Section 2)
```

#### `ctor` - Curved Turnout Right

```
Code: ctor
Inner Radius: 22"
Outer Radius: 30"
Arc: 22.5°

Section 1 (Inner):
  Spline Points: Arc at 22" radius curving right
    Start:  (0, 0, 0)
    Mid:    (8.53, 0, -0.85)
    End:    (8.47, 0, -1.71)

Section 2 (Outer):
  Spline Points: Arc at 30" radius curving right
    Start:  (0, 0, 0)
    Mid:    (11.63, 0, -1.16)
    End:    (11.55, 0, -2.34)

Connection Points:
  in:    position (0, 0, 0), direction (-1, 0, 0), sections [1, 2]
  inner: position (8.47, 0, -1.71), direction (0.924, 0, -0.383), sections [1]
  outer: position (11.55, 0, -2.34), direction (0.924, 0, -0.383), sections [2]

States:
  - inner: in ↔ inner (Section 1)
  - outer: in ↔ outer (Section 2)
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

States: None (no switching)
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

States: None (no switching)
Routes:
  - Track 1: in1 ↔ out1 (Section 1)
  - Track 2: in2 ↔ out2 (Section 2)
```

---

### Slips

#### `dslip` - Double Slip

```
Code: dslip
Length: 9.8"
Crossing Angle: 12°

Section 1 (Straight in1→out1):
  Spline Points: [(-4.9, 0, 0), (4.9, 0, 0)]

Section 2 (Straight in2→out2):
  Spline Points: [(-4.8, 0, -1.02), (4.8, 0, 1.02)]

Section 3 (Cross in1→out2):
  Spline Points: [(-4.9, 0, 0), (0, 0, 0.51), (4.8, 0, 1.02)]

Section 4 (Cross in2→out1):
  Spline Points: [(-4.8, 0, -1.02), (0, 0, -0.51), (4.9, 0, 0)]

Connection Points:
  in1:  position (-4.9, 0, 0), direction (-1, 0, 0), sections [1, 3]
  out1: position (4.9, 0, 0), direction (1, 0, 0), sections [1, 4]
  in2:  position (-4.8, 0, -1.02), direction (-0.978, 0, -0.208), sections [2, 4]
  out2: position (4.8, 0, 1.02), direction (0.978, 0, 0.208), sections [2, 3]

Collision Points:
  center: position (0, 0, 0)
    - All four sections intersect here

States (two independent switches):
  - switch_a: straight (in1↔out1 via Section 1) or cross (in1↔out2 via Section 3)
  - switch_b: straight (in2↔out2 via Section 2) or cross (in2↔out1 via Section 4)
```

#### `sslip` - Single Slip

```
Code: sslip
Length: 9.8"
Crossing Angle: 12°

Section 1 (Straight in1→out1):
  Spline Points: [(-4.9, 0, 0), (4.9, 0, 0)]

Section 2 (Straight in2→out2):
  Spline Points: [(-4.8, 0, -1.02), (4.8, 0, 1.02)]

Section 3 (Cross in1→out2):
  Spline Points: [(-4.9, 0, 0), (0, 0, 0.51), (4.8, 0, 1.02)]

Connection Points:
  in1:  position (-4.9, 0, 0), direction (-1, 0, 0), sections [1, 3]
  out1: position (4.9, 0, 0), direction (1, 0, 0), sections [1]
  in2:  position (-4.8, 0, -1.02), direction (-0.978, 0, -0.208), sections [2]
  out2: position (4.8, 0, 1.02), direction (0.978, 0, 0.208), sections [2, 3]

Collision Points:
  center: position (0, 0, 0)

States (one switch):
  - switch_a: straight (in1↔out1 via Section 1) or cross (in1↔out2 via Section 3)
  - Track 2 is fixed: in2↔out2 via Section 2 only
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

States: None
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

States: None
```
