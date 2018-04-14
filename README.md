# PiCraft

### Control a Minecraft world on the Minecraft: Pi or Java edition from Julia

## Installation and Usage

### Get Minecraft

- The Minecraft: Pi edition is pre-installed on all Rasbian since September 2014. Launch it by navigating to **Menu** > **Games** or typing **minecraft-pi** in the terminal. However, if you are running an older version of Raspbian get it [here](https://minecraft.net/en-us/edition/pi/).
- Get the Minecraft: Java edition(MacOS, Linux and Windows) [here](https://minecraft.net/en-us/download/alternative).

### Get RaspberryJuice or RaspberryJamMod (for Minecraft: Java edition)

Officially the ability to communicate with the Minecraft world is only available for the Minecraft: Pi edition. To get this to work on the Java edition we need to install a Mod.

- "RaspberryJamMod" is a Forge Mod, if you wish to use this along with other Forge mods then this is recommended. Installation instructions are available [here](http://www.instructables.com/id/Python-coding-for-Minecraft/).
- "RaspberryJuice" is a Bukkit server plugin, recommended if you wish to work on a Bukkit Minecraft server. Get it [here](https://dev.bukkit.org/projects/raspberryjuice).

There is a disagreement in the coordinates reported by Minecraft's debug mode and the `player.getPos()` command. Enter `/setworldspawn 0 0 0` in the Minecraft console to remove this discrepancy.

### Get Julia

Download the appropriate Julia version for your system from [here](https://julialang.org/downloads/).

### Install the PiCraft packge

```julia
Pkg.clone("https://github.com/JuliaBerry/PiCraft.jl")
```

## Quick Start Guide

Load the `PiCraft` package on the Julia console:
```julia
using PiCraft
```

On load, the library will attempt to connect to a running Minecraft world on localhost. If Minecraft is not running, an error message will be printed. Subsequently, once Minecraft has been started,  a connection can be forced by calling `PiCraft.connectToWorld()`

You can save and restore your progress using the commands:
1) Save: `world.checkpoint.save()`
2) Load last savepoint: `world.checkpoint.restore()`

### Player
You can find and set your player's location:
1) Find Player position: `playet.getPos()`
      * Returns a `Tuple{Float64, Float64, Float64}` which contains the player's current coordinates. Note that the 2<sup>nd</sup> index or y-axis refers to the height axis.
2) Set Player position: `player.setPos(x, y, z)`
      * Teleports the player to the specified coordinates.

### Blocks
Blocks are the heart of Minecraft. The package provides the ability to modify blocks at specified coordinates.
`Block` is an immutable datatype defined in `src/blocks.jl`.

```julia
immutable Block
    id::Int
    data::Int
end
```
The `id` defines the type of block (like cobblestone, wool, wood,.etc) and the `data` attribute defines additional characteristics of the block, on default every block has it `data` set to `0`. For example, Wool's block id is 35, the `Block(35,0)` refers to a block of white wool. Different wool colors can be accessed by changing the `data` attribute. Red Wool is `Block(35, 14)` and Pink Wool is `Block(35,6)`.

1) Place Block: `world.setBlock(x, y, z, block::Picraft.Block)`
    * Place the specified Block at the specified coordinates.
2) Place Blocks: `world.setBlocks(x1, y1, z1, x2, y2, z2, block::PiCraft.Block)`
    * Place the specified block in the entire region specified by the two sets of coordinates.
3) Get Block information: `world.getBlock(x, y, z)`
    * Returns the block present at the specified coordinates.

All Block `id` and `data` can be found in `src/blocks.jl`
 
 ## Reference

The API is modelled on the original python interface to Minecraft on the RPi. 

```julia

world.getBlock(x, y, z) # retrive a Block object at the specified coordinates
world.setBlock(x, y, z, block) #set the specified Block to these coordinates
world.setBlocks(x1,y1,z1,x2,y2,z2,block::PiCraft.Block) #set a block to an entire region
world.checkpoint.save() #save the current world state
world.checkpoint.restore() #restore the world to the previouly saved world state

chat.post(s) #send string s to chat

player.getTile() # return a tuple of integers (x, y, z),  for the tile on which the player is placed
player.setTile(x, y, z) # move the player to the tile specified by the integer coordinates
player.getPos() # return a tuple of floats (x, y, z) with the player's position
player.setPos(x, y, z) # move the player to the specified coordinates

```
