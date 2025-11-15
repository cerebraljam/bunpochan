#!/bin/bash

# Bunpochan Test Runner Script
# This script starts a local web server and opens the test runner

echo "🧪 Starting Bunpochan Test Server..."
echo ""
echo "This will:"
echo "  1. Start a web server on port 8000"
echo "  2. Open the test runner in your browser"
echo ""
echo "Press Ctrl+C to stop the server when done."
echo ""

# Navigate to project root
cd "$(dirname "$0")/.."

# Check if port 8000 is already in use
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 8000 is already in use."
    echo "Either:"
    echo "  1. Stop the other server"
    echo "  2. Open http://localhost:8000/tests/test-runner.html in your browser"
    exit 1
fi

# Start Python web server
echo "Starting server at http://localhost:8000"
echo "Opening test runner at http://localhost:8000/tests/test-runner.html"
echo ""

# Try to open browser (works on macOS and Linux)
if command -v open &> /dev/null; then
    # macOS
    sleep 1 && open "http://localhost:8000/tests/test-runner.html" &
elif command -v xdg-open &> /dev/null; then
    # Linux
    sleep 1 && xdg-open "http://localhost:8000/tests/test-runner.html" &
fi

# Start the server
python3 -m http.server 8000
