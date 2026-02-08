# Tren REST API Contract (Draft)

All endpoints return JSON. Numeric IDs are DWORD (32-bit unsigned integer), auto-assigned incrementally per domain. Base URL: `http://localhost:3001/api/v1`

## Resource: Layout

| Method | Path | Description |
|--------|------|-------------|
| GET | `/layout` | Get layout metadata |

**GET /layout** response:
```json
{
  "title": "My Railroad",
  "description": "A test layout",
  "trainCount": 3,
  "trackCount": 42,
  "switchCount": 4,
  "semaphoreCount": 2,
  "generatorCount": 1,
  "maxTrains": 5,
  "randomSwitches": false
}
```

---

## Resource: Trains

| Method | Path | Description |
|--------|------|-------------|
| GET | `/trains` | List all trains |
| GET | `/trains/:id` | Get a specific train |
| PUT | `/trains/:id` | Update train properties (speed) |
| POST | `/trains/:id/stop` | Stop a train (set speed to 0) |
| POST | `/trains/:id/start` | Resume a train (restore desired speed) |

**GET /trains** response:
```json
{
  "trains": [
    {
      "id": 1,
      "carCount": 6,
      "cabCount": 1,
      "currentSpeed": 12.0,
      "desiredSpeed": 12.0,
      "generatorId": "piece_1",
      "headPosition": { "x": 45.2, "z": 12.8 },
      "headPieceId": "piece_15",
      "visible": true
    }
  ]
}
```

**GET /trains/:id** response:
```json
{
  "id": 1,
  "carCount": 6,
  "cabCount": 1,
  "currentSpeed": 12.0,
  "desiredSpeed": 12.0,
  "generatorId": "piece_1",
  "cars": [
    {
      "carId": "car_1",
      "type": "cab",
      "position": { "x": 45.2, "z": 12.8 },
      "rotation": 1.57,
      "pieceId": "piece_15",
      "visible": true
    },
    {
      "carId": "car_2",
      "type": "car",
      "position": { "x": 42.1, "z": 12.8 },
      "rotation": 1.57,
      "pieceId": "piece_14",
      "visible": true
    }
  ]
}
```

**PUT /trains/:id** request:
```json
{
  "desiredSpeed": 8.0
}
```

**POST /trains/:id/stop** — no request body, sets currentSpeed and desiredSpeed to 0.

**POST /trains/:id/start** request (optional body):
```json
{
  "speed": 12.0
}
```
If no body/speed provided, restores the original desired speed from when the train was spawned.

---

## Resource: Tracks

| Method | Path | Description |
|--------|------|-------------|
| GET | `/tracks` | List all track pieces |
| GET | `/tracks/:id` | Get a specific track piece |

**GET /tracks** response:
```json
{
  "tracks": [
    {
      "id": 1,
      "pieceId": "piece_1",
      "type": "gen",
      "label": "start",
      "position": { "x": 0.0, "z": 0.0 },
      "rotation": 0.0,
      "inTunnel": false
    }
  ]
}
```

**GET /tracks/:id** response — same as list item, plus connections:
```json
{
  "id": 1,
  "pieceId": "piece_1",
  "type": "gen",
  "label": "start",
  "position": { "x": 0.0, "z": 0.0 },
  "rotation": 0.0,
  "inTunnel": false,
  "connections": {
    "in": [{ "pieceId": "piece_3", "pointName": "out" }],
    "out": [{ "pieceId": "piece_2", "pointName": "in" }]
  }
}
```

---

## Resource: Switches

| Method | Path | Description |
|--------|------|-------------|
| GET | `/switches` | List all virtual switches |
| GET | `/switches/:id` | Get a specific switch |
| PUT | `/switches/:id` | Set the active route |

**GET /switches** response:
```json
{
  "switches": [
    {
      "id": 1,
      "routeKey": "junction.piece_5.out.fwd",
      "direction": "fwd",
      "routeCount": 2,
      "selectedRoute": 0,
      "locked": false,
      "routes": [
        { "index": 0, "pieceId": "piece_6", "pointName": "in" },
        { "index": 1, "pieceId": "piece_10", "pointName": "in" }
      ]
    }
  ]
}
```

**PUT /switches/:id** request:
```json
{
  "selectedRoute": 1
}
```

Response returns the updated switch object. Returns 409 Conflict if the switch is locked by a train in the junction.

---

## Resource: Semaphores

| Method | Path | Description |
|--------|------|-------------|
| GET | `/semaphores` | List all semaphores |
| GET | `/semaphores/:id` | Get a specific semaphore |
| PUT | `/semaphores/:id` | Set lock state |

**GET /semaphores** response:
```json
{
  "semaphores": [
    {
      "id": 1,
      "pieceId": "piece_8",
      "locked": false,
      "position": { "x": 22.5, "z": -4.0 }
    }
  ]
}
```

**PUT /semaphores/:id** request:
```json
{
  "locked": true
}
```

---

## Resource: Generators

| Method | Path | Description |
|--------|------|-------------|
| GET | `/generators` | List all generators |
| GET | `/generators/:id` | Get a specific generator |
| PUT | `/generators/:id` | Enable/disable generator |

**GET /generators** response:
```json
{
  "generators": [
    {
      "id": 1,
      "pieceId": "piece_1",
      "enabled": true,
      "cabCount": "1-2",
      "carCount": "3-8",
      "speed": "6-24",
      "frequency": 10,
      "colorMode": "gray"
    }
  ]
}
```

**PUT /generators/:id** request:
```json
{
  "enabled": false
}
```

---

## Error Responses

All errors return:
```json
{
  "error": "Not Found",
  "message": "Train with id 99 not found",
  "status": 404
}
```

| Status | Meaning |
|--------|---------|
| 200 | Success |
| 400 | Bad request (invalid input) |
| 404 | Resource not found |
| 409 | Conflict (e.g., switch locked by train) |
| 503 | No layout loaded |
