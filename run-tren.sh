#!/usr/bin/env bash
set -e

# Start the dev server in the background (watches for file changes)
echo "Starting dev server..."
npm run dev &
SERVER_PID=$!

# Wait for the server to be ready
echo "Waiting for server to start..."
for i in $(seq 1 20); do
  if curl -s http://localhost:5173 > /dev/null 2>&1; then
    break
  fi
  sleep 0.5
done

# Open the browser
echo "Opening browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  open http://localhost:5173
else
  xdg-open http://localhost:5173
fi

echo "Tren is running at http://localhost:5173 (PID: $SERVER_PID)"
echo "Press Ctrl+C to stop the server."

# Wait for the server process
wait $SERVER_PID
