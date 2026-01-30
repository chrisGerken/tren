# Archived Switch Track Archetypes

This file contains archived documentation for physical switch track pieces that were removed from the active archetype set. The project now uses a **virtual switch** approach where branching is achieved by connecting multiple track pieces to a single connection point.

For the current track system, see [Track System](docs/track-system.md).

---

## Why Switches Were Removed

The original design modeled physical HO track switches (turnouts, wyes, slips, etc.) as discrete archetypes. This approach was replaced with a simpler model:

**Old approach**: Place a switch piece (e.g., `tol`) that has multiple outputs with switch state determining the active route.

**New approach**: Connect multiple track pieces to the same connection point to create a virtual switch. For example:
```
base: str
str x 3
bump

$base.out
crvl x 3
bump
```

This connects both a straight continuation and a curved branch to `base.out`, creating a virtual left turnout.

---

## Archived Archetypes

The following archetypes are no longer part of the active set:

| Code | Name | Sections | Connection Points |
|------|------|----------|-------------------|
| `tol` | Left Turnout | 2 | `in`, `out`, `left` |
| `tor` | Right Turnout | 2 | `in`, `out`, `right` |
| `wye` | Wye Turnout | 2 | `in`, `left`, `right` |
| `t3w` | Three-Way Turnout | 3 | `in`, `out`, `left`, `right` |
| `ctol` | Curved Turnout Left | 2 | `in`, `inner`, `outer` |
| `ctor` | Curved Turnout Right | 2 | `in`, `inner`, `outer` |
| `dslip` | Double Slip | 4 | `in1`, `out1`, `in2`, `out2` |
| `sslip` | Single Slip | 3 | `in1`, `out1`, `in2`, `out2` |

---

## Detailed Archetype Definitions

### Left Turnout (`tol`)

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

**Connection Point Diagram:**
```
                        [left]
                      ╱
    [in]━━━━━━━━━━━━━━━━━━[out]
```

---

### Right Turnout (`tor`)

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

**Connection Point Diagram:**
```
    [in]━━━━━━━━━━━━━━━━━━[out]
                      ╲
                        [right]
```

---

### Wye Turnout (`wye`)

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

**Connection Point Diagram:**
```
                        [left]
                      ╱
    [in]━━━━━━━━━━━<
                      ╲
                        [right]
```

---

### Three-Way Turnout (`t3w`)

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

**Connection Point Diagram:**
```
                        [left]
                      ╱
    [in]━━━━━━━━━━━━━━━━━[out]
                      ╲
                        [right]
```

---

### Curved Turnout Left (`ctol`)

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
  - inner: in ↔ inner (Section 1, 22" radius)
  - outer: in ↔ outer (Section 2, 30" radius)
```

**Connection Point Diagram:**
```
                [outer]
              ╱
            ╱   [inner]
          ╱   ╱
        ╱   ╱
    [in]
```

---

### Curved Turnout Right (`ctor`)

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
  - inner: in ↔ inner (Section 1, 22" radius)
  - outer: in ↔ outer (Section 2, 30" radius)
```

**Connection Point Diagram:**
```
    [in]
        ╲   ╲
          ╲   ╲
            ╲   [inner]
              ╲
                [outer]
```

---

### Double Slip (`dslip`)

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

**Connection Point Diagram:**
```
                        [out2]
                      ╱
    [in1]━━━━━━━━━━━╳━━━━━━━━━━━[out1]
                  ╱
                ╱
            [in2]
```

---

### Single Slip (`sslip`)

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

**Connection Point Diagram:**
```
                        [out2]
                      ╱
    [in1]━━━━━━━━━━━╳━━━━━━━━━━━[out1]
                  ╱
                ╱
            [in2]
```

---

## Reference Specifications (Historical)

| Property | Value | Source |
|----------|-------|--------|
| #6 Frog Angle | 9.5° | Standard |
| Standard Turnout Length | 12" | Atlas Customline |
| Wye Diverging Angle | 9.5° each side | ~19° total |
| Three-Way Angles | 12° left/right | Peco SL-99 |
| Slip Crossing Angle | 12° | Peco SL-80/90 |
| Slip Length | 9.8" | Peco |
| Curved Turnout Inner Radius | 22" | Atlas Customline |
| Curved Turnout Outer Radius | 30" | Atlas Customline |

---

## Emulating Switches with Virtual Branches

The new approach creates branching by connecting multiple pieces to one connection point:

### Virtual Left Turnout
```
base: str
str x 3       # Main route continues straight
bump

$base.out     # Return to base's output
crvl x 3      # Diverging route curves left
bump
```

The pieces `base`, the first `str`, and `crvl` together form a virtual left turnout.

### Virtual Wye
```
base: str
crvl x 3
bump

$base.out
crvr x 3
bump
```

### Virtual Three-Way
```
base: str
str x 3       # Straight route
bump

$base.out
crvl x 3      # Left route
bump

$base.out
crvr x 3      # Right route
bump
```

This approach simplifies the track system while providing equivalent or greater flexibility in layout design.
