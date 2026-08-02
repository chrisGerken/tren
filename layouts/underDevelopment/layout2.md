# Freight Basin Layout (fb_layout.txt)

## Overview

A double-oval mainline layout with a freight yard complex, engine facility, bottom staging tracks, and automated train generation. Based on visual reference `layout02.jpg`.

The layout is designed for continuous operation: trains spawn from two generators, circulate the outer and inner ovals, and are removed by a bin on the inner loop to keep population controlled.

---

## Track Structure

### Outer Main Loop

Large oval running clockwise. Four labeled junction points (`ph` placeholders) mark where the yard, crossovers, and generators connect.

| Segment | DSL | Notes |
|---|---|---|
| Top straight | `str x 14` | Longest run, runs west→east |
| Right-end semicircle | `crvr x 8` | 8 × 22.5° = 180° turn |
| Bottom straight | `str x 12` | Runs east→west |
| Left-end semicircle | `crvr x 8` | Closes back to NW junction |

Junction labels: `outer_nw`, `outer_ne`, `outer_se`, `outer_sw`

### Inner Main Loop

Parallel oval running clockwise, slightly smaller than outer. Uses tighter-radius curves (`crvr18`) so both ovals can coexist at the right end without overlapping.

| Segment | DSL | Notes |
|---|---|---|
| Top straight | `str x 12` | Two pieces shorter than outer |
| Right-end semicircle | `crvr18 x 8` | Tighter radius than outer loop |
| Bottom straight | `str x 10` | Two pieces shorter than outer |
| Left-end semicircle | `crvr18 x 8` | Closes back to NW junction |

Junction labels: `inner_nw`, `inner_ne`, `inner_se`, `inner_sw`

### Crossovers

Two crossover tracks bridge the outer and inner loops, allowing trains to switch between them. Each crossover uses `crvl x 1 ; str x 2` to span the gap, relying on auto-connect to close the endpoint to the inner loop junction.

- **Top crossover**: `outer_nw.out → inner_nw.in`
- **Bottom crossover**: `outer_sw.out → inner_sw.in`

> **Tuning note:** The exact geometry of the crossovers (curve count and straight length) depends on the rendered spacing between the two ovals. Adjust `crvl` count and `str` count after loading if the endpoints don't auto-connect.

---

## Yard Complex (Left Side)

Branches from `outer_nw` via `crvl x 2` to the yard throat junction (`yard_lead: ph`). Four sidings diverge from the throat with increasing lateral offsets.

| Siding | Entry | Length | Terminus |
|---|---|---|---|
| Siding 1 (main storage) | straight from throat | `str x 10` | `bump` |
| Siding 2 | `crvl x 2` | `str x 8` | `bump` |
| Siding 3 | `crvl x 4` | `str x 8` | `bump` |
| Siding 4 (engine storage) | `crvl x 2` | `str x 4` | `bump` |

The yard uses a virtual switch arrangement: multiple tracks connect to `yard_lead.out`, creating auto-switching branch points with no dedicated switch pieces.

---

## Engine Facility (Top-Left Building)

A generator spur branches from `yard_lead.out` via `crvl x 3 ; str x 3` and terminates at a `gen` piece. This represents the engine facility visible at the top-left of the reference image.

**Generator settings:** `cabs 1 cars 5 speed 10 every 40`
- Spawns one train every 40 seconds
- 5 freight cars, moderate speed

---

## Station-Side Generator (Right Side)

A second generator branches from `outer_ne` with `str x 2` approach. This represents the station area on the right side of the reference image.

**Generator settings:** `cabs 1 cars 4 speed 12 every 60`
- Spawns one train every 60 seconds
- 4 cars, slightly faster speed

---

## Bottom Staging Tracks

Three parallel staging tracks branch from `outer_sw` via `crvl x 2` to a staging throat (`stg_throat: ph`). These represent the 2–3 parallel straight tracks visible along the bottom of the reference image.

| Track | Entry | Length | Terminus |
|---|---|---|---|
| Staging 1 | straight from throat | `str x 12` | `bump` |
| Staging 2 | straight from throat | `str x 12` | `bump` |
| Staging 3 | `crvl x 2` | `str x 10` | `bump` |

---

## Train Sink (Bin)

A `bin` is placed on the inner loop's NE side (`inner_ne.out ; str x 3 ; bin`) to remove trains and prevent overcrowding. Combined with `max trains 10`, this keeps the simulation stable.

---

## Scenery

- `trees` — fills open interior areas (the large open center of the ovals)
- `pond` — placed in open space before trees, trees automatically avoid it

The center of the double oval and the yard area provide large open zones ideal for these scenery elements.

---

## Design Decisions

### Why two separate ovals instead of one oval with a passing siding?

The reference image clearly shows two independent concentric loops with different radii. Two separate oval definitions with crossover connections is more faithful to the image and gives more routing flexibility than a simple passing siding.

### Why `crvr18` on the inner loop?

Both loops curve around the same right-end area. Using a tighter radius (`crvr18`) for the inner loop keeps it inset from the outer loop without the tracks overlapping. Standard `crvr` on both would produce the same radius and potentially cause the tracks to coincide.

### Why virtual switches for the yard instead of a physical switch piece?

Tren uses the virtual switch approach throughout: multiple track pieces connect to the same `ph` junction point, and clicking the red dot selects the active route. This matches the Tren architecture (no dedicated switch archetypes) and is how all yard-style branching is modeled.

### Crossover geometry

The crossover tracks use `crvl x 1 ; str x 2` as an initial estimate. The actual required geometry depends on how far apart the two ovals render. Auto-connect will close the crossover endpoints to the inner loop junctions if they land within the 0.5-inch tolerance — otherwise the `str` count needs adjustment.

### Max trains = 10

With two generators and a bin, the population is self-regulating. `max trains 10` acts as a hard ceiling to prevent runaway spawning if the bin is blocked.

---

## File Location

```
layouts/underDevelopment/fb_layout.txt
```

## Reference Image

```
layouts/underDevelopment/layout02.jpg
```
