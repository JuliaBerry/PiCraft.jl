# PiCraft

### Control a Minecraft world on the Minecraft: Pi or Java edition from Julia

PiCraft is a Julia package which allows control over the Minecraft World using code. It is compatible with the Minecraft: Pi Edition and the Java Edition with the help of RaspberryJamMod or RaspberryJuice.

With this package you will be able to :

- Write scripts to teleport and walk over Water and Lava.
- Construct multi-storey skyscrapers within seconds.
- Draw fractals and shapes using a 3-D turtle.
- Import and export `.schematic` models without external software.  

## Installation and Usage

### Get Minecraft

- The Minecraft: Pi edition is pre-installed on all Rasbian since September 2014. Launch it by navigating to **Menu** > **Games** or typing **minecraft-pi** in the terminal. However, if you are running an older version of Raspbian get it [here](https://minecraft.net/en-us/edition/pi/).
- Get the Minecraft: Java edition(MacOS, Linux and Windows) [here](https://minecraft.net/en-us/download/alternative).

### Get RaspberryJuice or RaspberryJamMod (for Minecraft: Java edition)

Officially the ability to communicate with the Minecraft world is only available for the Minecraft: Pi edition. To get this to work on the Java edition we need to install a Mod.

- "RaspberryJamMod" is a Forge Mod, if you wish to use this along with other Forge mods then this is recommended. Installation instructions are available [here](http://www.instructables.com/id/Python-coding-for-Minecraft/).
- "RaspberryJuice" is a Bukkit server plugin, recommended if you wish to work on a Bukkit Minecraft server. Get it [here](https://dev.bukkit.org/projects/raspberryjuice).

### Get Julia

Download the appropriate Julia version for your system from [here](https://julialang.org/downloads/).

### Install the PiCraft package

```julia
using Pkg
Pkg.add("https://github.com/JuliaBerry/PiCraft.jl")
```

### Documentation

Documentation for this package can be accessed at https://juliaberry.github.io/PiCraft.jl/

## Quick Start Guide

Load the `PiCraft` package on the Julia console:
```julia
using PiCraft
```

On load, the library will attempt to connect to a running Minecraft world on `localhost`. If Minecraft is not running, an error message will be printed. Subsequently, once Minecraft has been started,  a connection can be forced by calling `connectToWorld()`.

A 3-D coordinate system is used to describe the Minecraft world. Every position in the Minecraft World can be described with the help of 3 numbers. The X, Y and Z coordinates. These coordinates can be viewed by opening the Debug screen using `F3`.

![debug-screen](./docs/src/assets/img/coordinates.png)

### Player
You can find and set your player's location:
1) Find Player position: `getPos()`
      * Returns a `Tuple{Float64, Float64, Float64}` which contains the player's current coordinates.
2) Set Player position: `setPos(pos::Tuple{Float64, Float64, Float64})`
      * Teleports the player to the specified coordinates.

For example : `setPos(getPos .+ (0, 10, 0))` will teleport you 10m above you current position.

### Blocks
Blocks are the heart of Minecraft. The package provides the ability to modify blocks at specified coordinates.
`Block` is an immutable datatype defined in `src/blocks.jl`.

```julia
struct Block
    id::Int
    data::Int
end
```
The `id` defines the type of block (like cobblestone, wool, wood,.etc) and the `data` attribute defines additional characteristics of the block, on default every block has it `data` set to `0`. For example, Wool's block id is 35, `Block(35,0)` refers to a block of white wool. Different wool colors can be accessed by changing the `data` attribute. Red Wool is `Block(35, 14)`, Pink Wool is `Block(35,6)` and so on. A complete reference can be found [here](https://juliaberry.github.io/PiCraft.jl/blocks.html) in the documentation.

1) Place Block: `setBlock(Tuple{Int, Int, Int}, block::Block)`
    * Place the specified Block at the specified coordinates.
2) Place Blocks: `setBlocks(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block)`
    * Set an entire region to the specified block type defined by corners.
3) Get Block information: `getBlock(Tuple{Int,Int,Int})`
    * Returns the block present at the specified coordinates.

While the `getBlock` and `setBlock` functions will accept `Float64` as arguments these will be rounded and set to `Int` as a block cannot be placed on non-integer coordinates.

 ## Reference

```julia

getBlock(Tuple{Int,Int,Int}) # retrive a Block object at the specified coordinates
setBlock(Tuple{Int,Int,Int}, block::Picraft.Block) #set the specified Block to these coordinates
setBlocks(pos::Tuple{UnitRange{Int}, UnitRange{Int}, UnitRange{Int}}, block::PiCraft.Block) #set a block to an entire region
getHeight(x::Int, z::Int) #Get the height of the world at the specified `x` and `z` coordinates.
getPlayerIds() # Return an array of all Player Id's connected to the server.
setting(name, status) #Change a setting
save() #save the current world state
restore() #restore the world to the previously saved world state
post(s::string) #send string s to chat
getTile() # return a tuple of integers (x, y, z),  for the tile on which the player is placed
setTile(pos::Tuple{Real, Real, Real}) # move the player to the tile specified by the integer coordinates
getPos() # return a tuple of floats (x, y, z) with the player's position
setPos(pos::Tuple{Real, Real, Real}) # move the player to the specified coordinates
pollBlockHits() #Return an Array of hit events. ((x,y,z), faceId, entityId)
```
