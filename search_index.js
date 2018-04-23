var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#PiCraft-1",
    "page": "Home",
    "title": "PiCraft",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#Overview-1",
    "page": "Home",
    "title": "Overview",
    "category": "section",
    "text": "Control a Minecraft world from JuliaMinecraft is one of the most popular video games in existence, with a player base of over 75 million users. While normally a game that is played with regular user controls, the Pi edition introduced a programatic API, that allows external programs to to control the Minecraft world. This api has been ported to the existing Java version of the game as well, using server plugins. Being able to control a physical 3D world from code creates many amazing opportunities for fun and education.This project provides a library that allows Julia programs to control a Minecraft world."
},

{
    "location": "index.html#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "This library requires a working installation of Minecraft on your machine. On the Raspberry Pi, this is the only required dependency. On a PC or Mac, the basic Minecraft install needs to be paired with an unofficial plugin that provides the programmatic API access. "
},

{
    "location": "index.html#Get-Minecraft-1",
    "page": "Home",
    "title": "Get Minecraft",
    "category": "section",
    "text": "The Minecraft: Pi edition is pre-installed on all Rasbian since September 2014. Launch it by navigating to Menu > Games or typing minecraft-pi in the terminal. However, if you are running an older version of Raspbian get it here.\nGet the Minecraft: Java edition(MacOS, Linux and Windows) here."
},

{
    "location": "index.html#Get-RaspberryJuice-or-RaspberryJamMod-(for-Minecraft:-Java-edition)-1",
    "page": "Home",
    "title": "Get RaspberryJuice or RaspberryJamMod (for Minecraft: Java edition)",
    "category": "section",
    "text": "Officially the ability to communicate with the Minecraft world is only available for the Minecraft: Pi edition. To get this to work on the Java edition we need to install a Mod.\"RaspberryJamMod\" is a Forge Mod, if you wish to use this along with other Forge mods then this is recommended. Installation instructions are available here.\n\"RaspberryJuice\" is a Bukkit server plugin, recommended if you wish to work on a Bukkit Minecraft server. Get it here.There is a disagreement in the coordinates reported by Minecraft\'s debug mode and the player.getPos() command. Enter /setworldspawn 0 0 0 in the Minecraft console to remove this discrepancy."
},

{
    "location": "index.html#Get-Julia-1",
    "page": "Home",
    "title": "Get Julia",
    "category": "section",
    "text": "Download the appropriate Julia version for your system from here."
},

{
    "location": "index.html#Install-the-PiCraft-packge-1",
    "page": "Home",
    "title": "Install the PiCraft packge",
    "category": "section",
    "text": "Pkg.clone(\"https://github.com/JuliaBerry/PiCraft.jl\")"
},

{
    "location": "quick.html#",
    "page": "Quick Start",
    "title": "Quick Start",
    "category": "page",
    "text": ""
},

{
    "location": "quick.html#Quick-Start-Guide-1",
    "page": "Quick Start",
    "title": "Quick Start Guide",
    "category": "section",
    "text": "Load the PiCraft package on the Julia console:using PiCraftOn load, the library will attempt to connect to a running Minecraft world on localhost. If Minecraft is not running, an error message will be printed. Subsequently, once Minecraft has been started,  a connection can be forced by calling PiCraft.connectToWorld()You can save and restore your progress using the commands:Save: world.checkpoint.save()\nLoad last savepoint: world.checkpoint.restore()"
},

{
    "location": "quick.html#Player-1",
    "page": "Quick Start",
    "title": "Player",
    "category": "section",
    "text": "You can find and set your player\'s location:Find Player position: playet.getPos()\nReturns a Tuple{Float64, Float64, Float64} which contains the player\'s current coordinates. Note that the 2<sup>nd</sup> index or y-axis refers to the height axis.\nSet Player position: player.setPos(x, y, z)\nTeleports the player to the specified coordinates."
},

{
    "location": "quick.html#Blocks-1",
    "page": "Quick Start",
    "title": "Blocks",
    "category": "section",
    "text": "Blocks are the heart of Minecraft. The package provides the ability to modify blocks at specified coordinates. Block is an immutable datatype defined in src/blocks.jl.immutable Block\n    id::Int\n    data::Int\nendThe id defines the type of block (like cobblestone, wool, wood,.etc) and the data attribute defines additional characteristics of the block, on default every block has it data set to 0. For example, Wool\'s block id is 35, the Block(35,0) refers to a block of white wool. Different wool colors can be accessed by changing the data attribute. Red Wool is Block(35, 14) and Pink Wool is Block(35,6).Place Block: world.setBlock(x, y, z, block::Picraft.Block)\nPlace the specified Block at the specified coordinates.\nPlace Blocks: world.setBlocks(x1, y1, z1, x2, y2, z2, block::PiCraft.Block)\nPlace the specified block in the entire region specified by the two sets of coordinates.\nGet Block information: world.getBlock(x, y, z)\nReturns the block present at the specified coordinates.All Block id and data can be found in src/blocks.jl"
},

{
    "location": "blocks.html#",
    "page": "Block Reference",
    "title": "Block Reference",
    "category": "page",
    "text": ""
},

{
    "location": "blocks.html#Block-Reference-1",
    "page": "Block Reference",
    "title": "Block Reference",
    "category": "section",
    "text": "Id Name Subtype Image Data\n0 Air   0\n1 Stone  (Image: mc-block) 0\n2 Grass  (Image: mc-block) 0\n3 Dirt  (Image: mc-block) 0\n4 Cobblestone  (Image: mc-block) 0\n5 Wood Plank Oak (Image: mc-block) 1\n  Spruce (Image: mc-block) 2\n  Birch (Image: mc-block) 3\n  Jungle (Image: mc-block) 4\n6 Sapling Oak (Image: mc-block) 0\n Sapling Spruce (Image: mc-block) 1\n Sapling Birch (Image: mc-block) 2\n Sapling Jungle (Image: mc-block) 3\n7 Bedrock  (Image: mc-block) 0\n8 Water(Flowing)   0\n9 Water(Stationary) High (Image: mc-block) 0\n Water(Stationary) Low  7\n10 Lava(Flowing)   0\n11 Lava(Stationary) High (Image: mc-block) 0\n11 Lava(Stationary) Low  7\n12 Sand  (Image: mc-block) 0\n13 Gravel  (Image: mc-block) 0\n14 Gold Ore  (Image: mc-block) 0\n15 Iron Ore  (Image: mc-block) 0\n16 Coal Ore  (Image: mc-block) 0\n17 Wood Oak(up/down) (Image: mc-block) 0\n  Spruce(up/down) (Image: mc-block) 1\n  Birch(up/down) (Image: mc-block) 2\n  Jungle(up/down) (Image: mc-block) 3\n  Oak(east/west)  4\n  Spruce(east/west)  5\n  Birch(east/west)  6\n  Jungle(east/west)  7\n  Oak(north/south)  8\n  Spruce(north/south)  9\n  Birch(north/south)  10\n  Jungle(north/south)  11\n  Oak(only bark) (Image: mc-block) 12\n  Spruce(only bark) (Image: mc-block) 13\n  Birch(only bark) (Image: mc-block) 14\n  Jungle(only bark) (Image: mc-block) 15\n18 Leaves Oak (Image: mc-block) 1\n  Spruce (Image: mc-block) 2\n  Birch (Image: mc-block) 3\n19 Glass  (Image: mc-block) 0\n21 Lapis Lazuli Ore  (Image: mc-block) 0\n22 Lapis Lazuli Block  (Image: mc-block) 0\n24 Sandstone Ordinary (Image: mc-block) 0\n  Chiselled (Image: mc-block) 1\n  Smooth (Image: mc-block) 2\n26 Bed  (Image: mc-block) 0\n30 Cobweb  (Image: mc-block) 0\n31 Grass(tall) Shrub (Image: mc-block) 0\n  Grass (Image: mc-block) 1\n  Fern (Image: mc-block) 2\n  Grass(color by biome)  3\n35 Wool White (Image: mc-block) 0\n  Orange (Image: mc-block) 1\n  Magenta (Image: mc-block) 2\n  Light Blue (Image: mc-block) 3\n  Yellow (Image: mc-block) 4\n  Lime (Image: mc-block) 5\n  Pink (Image: mc-block) 6\n  Grey (Image: mc-block) 7\n  Light Grey (Image: mc-block) 8\n  Cyan (Image: mc-block) 9\n  Purple (Image: mc-block) 10\n  Blue (Image: mc-block) 11\n  Brown (Image: mc-block) 12\n  Green (Image: mc-block) 13\n  Red (Image: mc-block) 14\n  Black (Image: mc-block) 15\n37 Yellow Flower(dandelion)  (Image: mc-block) 0\n38 Cyan Flower  (Image: mc-block) 0\n39 Brown Mushroom  (Image: mc-block) 0\n40 Red Mushroom  (Image: mc-block) 0\n41 Gold Block  (Image: mc-block) 0\n42 Iron Block  (Image: mc-block) 0\n43 Double Slab Stone (Image: mc-block) 0\n  Sandstone (Image: mc-block) 1\n  Wooden (Image: mc-block) 2\n  Cobblestone (Image: mc-block) 3\n  Brick (Image: mc-block) 4\n  Stone Brick (Image: mc-block) 5\n  Nether Brick (Image: mc-block) 6\n  Quartz (Image: mc-block) 7\n44 Single Slab Stone (Image: mc-block) 0\n  Sandstone (Image: mc-block) 1\n  Wooden (Image: mc-block) 2\n  Cobblestone (Image: mc-block) 3\n  Brick (Image: mc-block) 4\n  Stone Brick (Image: mc-block) 5\n  Nether Brick (Image: mc-block) 6\n  Quartz (Image: mc-block) 7\n45 Brick Block  (Image: mc-block) 0\n46 TNT Inactive (Image: mc-block) 0\n  Ready to explode (Image: mc-block) 1\n47 Bookshelf  (Image: mc-block) 0\n48 Moss Stone  (Image: mc-block) 0\n49 Obsidian  (Image: mc-block) 0\n50 Torch On floor (Image: mc-block) 0\n  Pointing East  1\n  Pointing West  2\n  Pointing South  3\n  Pointing North  4\n51 Fire  (Image: mc-block) 0\n53 Stair Wood Ascending east (Image: mc-block) 0\n  Ascending west  1\n  Ascending south  2\n  Ascending north  3\n  Ascending east(upside down) (Image: mc-block) 4\n  Ascending west(upside down)  5\n  Ascending south(upside down)  6\n  Ascending north(upside down)  7\n54 Chest Facing north (Image: mc-block) 2\n  Facing south  3\n  Facing west  4\n  Facing east  5\n56 Diamond Ore  (Image: mc-block) 0\n57 Diamond Block  (Image: mc-block) 0\n58 Crafting Table  (Image: mc-block) 0\n60 Farmland  (Image: mc-block) 0\n61 Furnace(Inactive) Facing north (Image: mc-block) 2\n  Facing south  3\n  Facing west  4\n  Facing east  5\n62 Furnace(Active) Facing north (Image: mc-block) 2\n  Facing south  3\n  Facing west  4\n  Facing east  5\n64 Wooden Door  (Image: mc-block) 0\n65 Ladder Facing north (Image: mc-block) 2\n  Facing south  3\n  Facing west  4\n  Facing east  5\n67 Cobblestone Stairs Ascending east (Image: mc-block) 0\n  Ascending west  1\n  Ascending south  2\n  Ascending north  3\n  Ascending east(upside down) (Image: mc-block) 4\n  Ascending west(upside down)  5\n  Ascending south(upside down)  6\n  Ascending north(upside down)  7\n71 Iron Door  (Image: mc-block) 0\n73 Redstone Ore  (Image: mc-block) 0\n78 Snow Lowest <img src=\"./assets/BlockImages/Snow.png\" width=\"150\" height=\"78\" /> 0\n  Highest  7\n79 Ice  (Image: mc-block) 0\n80 Snow Block  (Image: mc-block) 0\n81 Cactus  (Image: mc-block) 0\n82 Clay  (Image: mc-block) 0\n83 Sugarcane  (Image: mc-block) 0\n85 Fence  (Image: mc-block) 0\n89 Glowstone  (Image: mc-block) 0\n95 Bedrock(invisible)   0\n98 Stone Brick Normal (Image: mc-block) 0\n  Mossy (Image: mc-block) 1\n  Cracked (Image: mc-block) 2\n  Chiseled (Image: mc-block) 3\n102 Glass Pane  (Image: mc-block) 0\n103 Melon  (Image: mc-block) 0\n107 Fence Gate  (Image: mc-block) 0\n246 Glowing Obsidian  (Image: mc-block) 0\n247 Nether Reactor Unused (Image: mc-block) 0\n  Active (Image: mc-block) 1\n  Stopped/used up (Image: mc-block) 2"
},

{
    "location": "api.html#",
    "page": "API Reference",
    "title": "API Reference",
    "category": "page",
    "text": "Modules = [PiCraft]\nOrder   = [:type, :function]world.getBlock(x, y, z)world.setBlock(x, y, z, block)world.setBlocks(x1,y1,z1,x2,y2,z2,block::PiCraft.Block)world.checkpoint.save()world.checkpoint.restore()chat.post(s)player.getTile()player.setTile(x, y, z)player.getPos()player.setPos(x, y, z)"
},

]}
