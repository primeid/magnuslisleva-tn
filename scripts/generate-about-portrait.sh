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
  -contrast-stretch 3%x2% \
  -sigmoidal-contrast 7,48% \
  -resize 68x92! \
  -background '#050806' \
  -gravity center \
  -extent 68x92 \
  -ordered-dither o8x8,4 \
  +dither \
  -colors 18 \
  -fill '#7f9a90' \
  -colorize 10 \
  -modulate 98,90,100 \
  -resize 340x460! \
  -filter point \
  -resize 680x920! \
  -vignette 0x12+0+0 \
  -quality 80 \
  "$output_path"
