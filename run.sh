#!/bin/bash
echo "Convert between story.js and story.canvas"
echo "Direction: (1) js to canvas, (2) canvas to js"
read -p "Enter 1 or 2: " choice

if [ "$choice" = "1" ]; then
    python convert.py js_to_canvas -i js/story.js -o js/story.canvas
elif [ "$choice" = "2" ]; then
    python convert.py canvas_to_js -i js/story.canvas -o js/story.js
else
    echo "Invalid choice"
    exit 1
fi