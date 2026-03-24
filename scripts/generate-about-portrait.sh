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
  -contrast-stretch 4%x2% \
  -sigmoidal-contrast 6,52% \
  -resize 170x230! \
  -background '#050806' \
  -gravity center \
  -extent 170x230 \
  -fill '#88a39a' \
  -colorize 14 \
  -attenuate 0.08 +noise Multiplicative \
  -resize 340x460! \
  -filter point \
  -resize 680x920! \
  -vignette 0x18+0+0 \
  -quality 82 \
  "$output_path"
