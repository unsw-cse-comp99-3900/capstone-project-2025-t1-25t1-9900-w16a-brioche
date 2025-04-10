#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# Variables for retry logic
COUNTER=0
MAX_RETRIES=10
RETRY_DELAY=5

echo "Waiting for DB and applying migrations..."

# Loop until migrations succeed or max retries are reached
until dotnet ef database update --no-build --project InvoiceBackend.csproj; do
  COUNTER=$((COUNTER+1))
  if [ $COUNTER -ge $MAX_RETRIES ]; then
    echo "Migration failed after $MAX_RETRIES attempts. Exiting." >&2
    exit 1 # Exit container if migration fails repeatedly
  fi
  echo "Migration attempt $COUNTER failed, retrying in $RETRY_DELAY seconds..." >&2
  sleep $RETRY_DELAY
done

echo "Migration successful. Starting application..."

# Add a longer delay to allow DB to fully stabilize after migration
echo "Waiting longer (10s) for DB stabilization..."
sleep 10

# Execute the main process (run the application)
echo "Executing command: dotnet InvoiceBackend.dll"
# Run dotnet in the background, print the message, then wait (optional)
dotnet InvoiceBackend.dll &

# Give the app a moment to potentially bind to the port before printing
sleep 2

echo "-------------------------------------------------------------------"
echo ">>> Backend started. Access frontend at: https://localhost:5173/ <<<"
echo "-------------------------------------------------------------------"

# Wait indefinitely to keep the script running (and container alive)
wait $!