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

if [ ! -d "/app/shared/dist" ]; then
  echo "Building shared workspace packages..."
  npm run build -w shared
  npm run build -w shared.client
fi

echo "Starting ecommerce-server backend..."
npm run dev:api &
API_PID=$!

echo "Starting ecommerce-client frontend..."
npm run dev &
UI_PID=$!

trap "kill $API_PID $UI_PID" SIGINT SIGTERM EXIT
wait $API_PID $UI_PID
