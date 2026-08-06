#!/bin/sh
set -e

echo "Waiting for MongoDB to be ready..."
while ! nc -z mongodb 27017; do
  sleep 1
done
echo "MongoDB is ready!"

echo "Installing dependencies..."
rm -f package-lock.json
npm install --include=dev --omit=optional
npm install @rollup/rollup-linux-x64-musl --no-save

if [ ! -d "/app/Shared.API/dist" ]; then
  echo "Building shared-api workspace package..."
  npm run build -w shared-api
fi

echo "Starting E.API backend..."
npm run dev:api &
API_PID=$!

echo "Starting E.UI frontend..."
npm run dev &
UI_PID=$!

trap "kill $API_PID $UI_PID" SIGINT SIGTERM EXIT
wait $API_PID $UI_PID
