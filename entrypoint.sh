#!/bin/sh
set -e
node dist/server/entry.mjs &
NODE_PID=$!
trap 'kill $NODE_PID 2>/dev/null' EXIT
caddy run --config /etc/caddy/Caddyfile
