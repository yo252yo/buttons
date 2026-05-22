write me index.html, which will fetch ./assets/story.canvas a obsidian json formatted canvas (rough example below if needed) and start at the node of id "start", it will then offera game-like 2d browsing experience when i select an edge with my keyboard and press enter to go down it, revealing the graph as i browse through it, i only see around my cursor, like a fog of war, i mean i see everything past ofc but the rest of the graph is hidden one edge away from me. use W to go up and AD to navigate between children links, make sure the navigation is fluid and bouncy and keeps the node currently read at a fixed place on my screen. 

Each node content has the same format: a title, followed optionally by ---\n a complement. only the title is visible before i visit the node









{

  "nodes": [

    {

      "id": "67a1b2c3",

      "type": "text",

      "text": "## Hello World\nThis is a text node.",

      "x": 0,

      "y": 0,

      "width": 250,

      "height": 150,

      "color": "1"

    },

    {

      "id": "98d7e6f5",

      "type": "file",

      "file": "Folder/My Note.md",

      "x": 400,

      "y": 50,

      "width": 300,

      "height": 400

    }

  ],

  "edges": [

    {

      "id": "edge-777",

      "fromNode": "67a1b2c3",

      "fromSide": "right",

      "toNode": "98d7e6f5",

      "toSide": "left",

      "toEnd": "arrow"

    }

  ]

}