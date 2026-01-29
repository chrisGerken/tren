# Connection Point Definitions

This document defines the standard connection point names used across all track archetypes.

## Naming Conventions

Connection points follow a consistent naming pattern based on their role:

| Name | Description |
|------|-------------|
| `in` | Default input / origin end |
| `out` | Default output / straight-through exit |
| `left`, `right` | Diverging exits on turnouts |
| `inner`, `outer` | Curved turnout exits (different radii, same curve direction) |
| `in1`, `out1` | Track 1 endpoints on crossings/slips |
| `in2`, `out2` | Track 2 endpoints on crossings/slips |

## Connection Shorthand

When connecting track pieces, `in` and `out` are the default connection points:

| Written | Expands to |
|---------|------------|
| `str9 -> tol` | `str9.out -> tol.in` |
| `tol -> str9` | `tol.out -> str9.in` |
| `tol.left -> crvr22` | `tol.left -> crvr22.in` |
| `str9 -> tol.left` | `str9.out -> tol.left` |

**Archetypes without `out` use their natural default:**

| Archetype | Default output |
|-----------|----------------|
| `wye` | (must specify `left` or `right`) |
| `ctol`, `ctor` | (must specify `inner` or `outer`) |
| `bump` | (no output — terminus) |
| `x90`, `x45`, `dslip`, `sslip` | `out1` (track 1 is primary) |

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

### Turnout Left (`tol`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | 1, 2 | Common entry |
| `out` | (12, 0, 0) | (1, 0, 0) | 1 | Straight-through exit |
| `left` | (12, 0, 2.0) | (0.986, 0, 0.165) | 2 | Diverging exit |

```
                        [left]
                      ╱
    [in]━━━━━━━━━━━━━━━━━━[out]
```

**States:**
- `normal`: in ↔ out (Section 1)
- `diverging`: in ↔ left (Section 2)

---

### Turnout Right (`tor`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | 1, 2 | Common entry |
| `out` | (12, 0, 0) | (1, 0, 0) | 1 | Straight-through exit |
| `right` | (12, 0, -2.0) | (0.986, 0, -0.165) | 2 | Diverging exit |

```
    [in]━━━━━━━━━━━━━━━━━━[out]
                      ╲
                        [right]
```

**States:**
- `normal`: in ↔ out (Section 1)
- `diverging`: in ↔ right (Section 2)

---

### Wye (`wye`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | 1, 2 | Common entry |
| `left` | (12, 0, 2.0) | (0.986, 0, 0.165) | 1 | Left exit |
| `right` | (12, 0, -2.0) | (0.986, 0, -0.165) | 2 | Right exit |

```
                        [left]
                      ╱
    [in]━━━━━━━━━━━<
                      ╲
                        [right]
```

**States:**
- `left`: in ↔ left (Section 1)
- `right`: in ↔ right (Section 2)

---

### Three-Way (`t3w`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | 1, 2, 3 | Common entry |
| `left` | (8.66, 0, 1.84) | (0.978, 0, 0.208) | 1 | Left exit |
| `out` | (8.66, 0, 0) | (1, 0, 0) | 2 | Straight-through exit |
| `right` | (8.66, 0, -1.84) | (0.978, 0, -0.208) | 3 | Right exit |

```
                        [left]
                      ╱
    [in]━━━━━━━━━━━━━━━━━[out]
                      ╲
                        [right]
```

**States:**
- `left`: in ↔ left (Section 1)
- `main`: in ↔ out (Section 2)
- `right`: in ↔ right (Section 3)

---

### Curved Turnout Left (`ctol`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | 1, 2 | Common entry |
| `inner` | (8.47, 0, 1.71) | (0.924, 0, 0.383) | 1 | Tighter curve (22"R) |
| `outer` | (11.55, 0, 2.34) | (0.924, 0, 0.383) | 2 | Wider curve (30"R) |

```
                [outer]
              ╱
            ╱   [inner]
          ╱   ╱
        ╱   ╱
    [in]
```

**States:**
- `inner`: in ↔ inner (Section 1, 22" radius)
- `outer`: in ↔ outer (Section 2, 30" radius)

---

### Curved Turnout Right (`ctor`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in` | (0, 0, 0) | (-1, 0, 0) | 1, 2 | Common entry |
| `inner` | (8.47, 0, -1.71) | (0.924, 0, -0.383) | 1 | Tighter curve (22"R) |
| `outer` | (11.55, 0, -2.34) | (0.924, 0, -0.383) | 2 | Wider curve (30"R) |

```
    [in]
        ╲   ╲
          ╲   ╲
            ╲   [inner]
              ╲
                [outer]
```

**States:**
- `inner`: in ↔ inner (Section 1, 22" radius)
- `outer`: in ↔ outer (Section 2, 30" radius)

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

### Double Slip (`dslip`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in1` | (-4.9, 0, 0) | (-1, 0, 0) | 1, 3 | Track 1 west (→ out1 or out2) |
| `out1` | (4.9, 0, 0) | (1, 0, 0) | 1, 4 | Track 1 east (← in1 or in2) |
| `in2` | (-4.8, 0, -1.02) | (-0.978, 0, -0.208) | 2, 4 | Track 2 SW (→ out2 or out1) |
| `out2` | (4.8, 0, 1.02) | (0.978, 0, 0.208) | 2, 3 | Track 2 NE (← in2 or in1) |

```
                        [out2]
                      ╱
    [in1]━━━━━━━━━━━╳━━━━━━━━━━━[out1]
                  ╱
                ╱
            [in2]
```

**Sections:**
- Section 1: in1 → out1 (straight)
- Section 2: in2 → out2 (straight)
- Section 3: in1 → out2 (cross)
- Section 4: in2 → out1 (cross)

**States (two independent switches):**
- Switch A (at in1): `straight` (in1↔out1) or `cross` (in1↔out2)
- Switch B (at in2): `straight` (in2↔out2) or `cross` (in2↔out1)

**Collision Point:** Center (0, 0, 0)

---

### Single Slip (`sslip`)

| Point | Position | Direction | Section | Description |
|-------|----------|-----------|---------|-------------|
| `in1` | (-4.9, 0, 0) | (-1, 0, 0) | 1, 3 | Track 1 west (→ out1 or out2) |
| `out1` | (4.9, 0, 0) | (1, 0, 0) | 1 | Track 1 east (← in1 only) |
| `in2` | (-4.8, 0, -1.02) | (-0.978, 0, -0.208) | 2 | Track 2 SW (→ out2 only) |
| `out2` | (4.8, 0, 1.02) | (0.978, 0, 0.208) | 2, 3 | Track 2 NE (← in2 or in1) |

```
                        [out2]
                      ╱
    [in1]━━━━━━━━━━━╳━━━━━━━━━━━[out1]
                  ╱
                ╱
            [in2]
```

**Sections:**
- Section 1: in1 → out1 (straight)
- Section 2: in2 → out2 (straight)
- Section 3: in1 → out2 (cross)

**States (one switch):**
- Switch A (at in1): `straight` (in1↔out1) or `cross` (in1↔out2)
- Track 2 is fixed: in2↔out2 only

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

## Connection Point Summary Table

| Archetype | Connection Points |
|-----------|-------------------|
| `str*` | `in`, `out` |
| `crvl*` | `in`, `out` |
| `crvr*` | `in`, `out` |
| `tol` | `in`, `out`, `left` |
| `tor` | `in`, `out`, `right` |
| `wye` | `in`, `left`, `right` |
| `t3w` | `in`, `out`, `left`, `right` |
| `ctol` | `in`, `inner`, `outer` |
| `ctor` | `in`, `inner`, `outer` |
| `x90` | `in1`, `out1`, `in2`, `out2` |
| `x45` | `in1`, `out1`, `in2`, `out2` |
| `dslip` | `in1`, `out1`, `in2`, `out2` |
| `sslip` | `in1`, `out1`, `in2`, `out2` |
| `bump` | `in` |
| `flex` | `in`, `out` |
