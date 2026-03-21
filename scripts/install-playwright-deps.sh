#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  if command -v sudo >/dev/null 2>&1; then
    exec sudo bash "$0" "$@"
  else
    echo "Please run as root or install sudo." >&2
    exit 1
  fi
fi

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y \
  libglib2.0-0 \
  libnspr4 \
  libnss3 \
  libgio-2.0-0 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libatspi2.0-0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libxkbcommon0 \
  libasound2

echo
echo "Playwright/Chromium runtime dependencies installed."
echo "Next step: tell Atlas to retry the screenshot render."
