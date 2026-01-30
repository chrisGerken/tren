# Connection Point Definitions

This document defines the standard connection point names used across all track archetypes.

## Naming Conventions

Connection points follow a consistent naming pattern based on their role:

| Name | Description |
|------|-------------|
| `in` | Default input / origin end |
| `out` | Default output / straight-through exit |
| `in1`, `out1` | Track 1 endpoints on crossings |
| `in2`, `out2` | Track 2 endpoints on crossings |

## Connection Shorthand

When connecting track pieces, `in` and `out` are the default connection points:

| Written | Expands to |
|---------|------------|
| `str9 -> str6` | `str9.out -> str6.in` |
| `crvl -> str9` | `crvl.out -> str9.in` |

**Archetypes without `out` use their natural default:**

| Archetype | Default output |
|-----------|----------------|
| `bump` | (no output — terminus) |
| `x90`, `x45` | `out1` (track 1 is primary) |

## Multi-Connection Branching

A single connection point can have **multiple pieces connected to it**. This creates branching without dedicated switch archetypes.

```
base: str
str x 3       # First branch: connects to base.out
bump

$base.out     # Return to base.out
crvl x 3      # Second branch: also connects to base.out
bump
```

Both the first `str` and `crvl` connect to `base.out`, creating a virtual turnout.

## Connection Point Properties

Each connection point has:
- **Name**: Unique identifier within the archetype
- **Position**: (x, y, z) coordinates in local space
- **Direction**: Unit vector pointing outward from the piece (the direction a departing train would face)
- **Sections**: Which track section(s) this point belongs to

---

## Connection Points by Archetype

### Straights (`str9`, `str6`, `str3`, `str15`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | 1 | Origin end |
| `out` | (L, 0, 0) | (1, 0, 0) | 1 | Far end |

*L = length (9, 6, 3, or 1.5 inches)*

```
    [in]━━━━━━━━━━━━━━━[out]
```

---

### Curves Left (`crvl18`, `crvl22`, `crvl24`)

| Point | Position (22" example) | Direction | Section | Description |
|-------|------------------------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | 1 | Origin end |
| `out` | (8.47, 0, 1.71) | (0.924, 0, 0.383) | 1 | Curved exit |

```
              [out]
            ╱
          ╱
        ╱
    [in]
```

---

### Curves Right (`crvr18`, `crvr22`, `crvr24`)

| Point | Position (22" example) | Direction | Section | Description |
|-------|------------------------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | 1 | Origin end |
| `out` | (8.47, 0, -1.71) | (0.924, 0, -0.383) | 1 | Curved exit |

```
    [in]
        ╲
          ╲
            ╲
              [out]
```

---

### 90° Crossing (`x90`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in1` | (-3, 0, 0) | (-1, 0, 0) | 1 | Track 1 west |
| `out1` | (3, 0, 0) | (1, 0, 0) | 1 | Track 1 east |
| `in2` | (0, 0, -3) | (0, 0, -1) | 2 | Track 2 south |
| `out2` | (0, 0, 3) | (0, 0, 1) | 2 | Track 2 north |

```
              [out2]
                │
                │
    [in1]━━━━━━━╋━━━━━━━[out1]
                │
                │
              [in2]
```

**Routes (no switching):**
- Track 1: in1 ↔ out1 (Section 1)
- Track 2: in2 ↔ out2 (Section 2)

**Collision Point:** Center (0, 0, 0)

---

### 45° Crossing (`x45`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in1` | (-3, 0, 0) | (-1, 0, 0) | 1 | Track 1 west |
| `out1` | (3, 0, 0) | (1, 0, 0) | 1 | Track 1 east |
| `in2` | (-2.12, 0, -2.12) | (-0.707, 0, -0.707) | 2 | Track 2 SW |
| `out2` | (2.12, 0, 2.12) | (0.707, 0, 0.707) | 2 | Track 2 NE |

```
                    [out2]
                  ╱
                ╱
    [in1]━━━━━╳━━━━━[out1]
            ╱
          ╱
        [in2]
```

**Routes (no switching):**
- Track 1: in1 ↔ out1 (Section 1)
- Track 2: in2 ↔ out2 (Section 2)

**Collision Point:** Center (0, 0, 0)

---

### Bumper (`bump`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | 1 | Open end |

```
    [in]━━━━━▌
```

Track terminates at x=3 (buffer end). No output connection point.

---

### Flex Track (`flex`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (defined at placement) | (defined at placement) | 1 | First connection |
| `out` | (defined at placement) | (defined at placement) | 1 | Second connection |

Connection points are determined when the flex track is placed to connect two existing connection points.

---

### Placeholder (`ph`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | (none) | Junction point |
| `out` | (0, 0, 0) | (1, 0, 0) | (none) | Junction point |

```
    [in]•[out]
```

Both connection points occupy the same position with opposite directions. The placeholder has no traversable track section—it exists purely as a junction point for connecting multiple track pieces.

---

### Generator (`gen`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `out` | (0, 0, 0) | (1, 0, 0) | 1 | Train exit point |

```
    ○━━━[out]
```

The generator has only an output—trains emerge from it. The circle represents the visual appearance (approximately cab/car sized). An invisible internal track section holds trains before they enter the layout.

---

### Bin (`bin`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | (none) | Train entry/removal point |

```
    [in]━━━○
```

The bin has only an input—trains enter and are removed. The circle represents the visual appearance (similar to generator). Zero-length with no traversable track section.

---

### Tunnel (`tun`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | (none) | Hidden side |
| `out` | (0, 0, 0) | (1, 0, 0) | (none) | Visible side |

```
    [in]▓[out]
```

Both connection points occupy the same position with opposite directions (like placeholder). The tunnel toggles visibility:
- Track connected to `in` is hidden
- Each car/cab crossing `out`→`in` becomes invisible as it passes
- Each car/cab crossing `in`→`out` becomes visible as it passes

---

## Connection Point Summary Table

| Archetype | Connection Points |
|-----------|-------------------|
| `str*` | `in`, `out` |
| `crvl*` | `in`, `out` |
| `crvr*` | `in`, `out` |
| `x90` | `in1`, `out1`, `in2`, `out2` |
| `x45` | `in1`, `out1`, `in2`, `out2` |
| `bump` | `in` |
| `flex` | `in`, `out` |
| `ph` | `in`, `out` |
| `gen` | `out` |
| `bin` | `in` |
| `tun` | `in`, `out` |

---

## Archived Content

Physical switch archetypes had additional connection points (`left`, `right`, `inner`, `outer`). These have been removed in favor of virtual switches. See [ARCHIVED_SWITCHES.md](../ARCHIVED_SWITCHES.md) for historical documentation.
