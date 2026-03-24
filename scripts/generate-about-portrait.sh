#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <input-image> [output-image]" >&2
  exit 1
fi

input_path=$1
output_path=${2:-public/media/about/magnus-profile.webp}

mkdir -p "$(dirname "$output_path")"

magick "$input_path" \
  -gravity north \
  -crop 561x760+0+140 +repage \
  -colorspace Gray \
  -contrast-stretch 2%x1% \
  -sigmoidal-contrast 8,45% \
  -resize 48x64! \
  -background '#080a09' \
  -gravity center \
  -extent 48x64 \
  -ordered-dither o8x8,3 \
  +dither \
  -colors 12 \
  -fill '#93aca3' \
  -colorize 6 \
  -modulate 100,88,100 \
  -resize 340x454! \
  -filter point \
  -resize 680x908! \
  -quality 78 \
  "$output_path"
