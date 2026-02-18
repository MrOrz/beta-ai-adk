#!/bin/bash

# Navigate to the agent directory
cd "$(dirname "$0")/../agent" || exit 1

# Run ADK web from the parent so it discovers the "agent" folder
uv run adk web --port 8000 ..
