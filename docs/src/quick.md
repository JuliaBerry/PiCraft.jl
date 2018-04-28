# Quick Start Guide

Load the `PiCraft` package on the Julia console:
```julia
using PiCraft
```

On load, the library will attempt to connect to a running Minecraft world on localhost. If Minecraft is not running, an error message will be printed. Subsequently, once Minecraft has been started,  a connection can be forced by calling `PiCraft.connectToWorld()`

You can save and restore your progress using the commands:
1) Save: `world.checkpoint.save()`
2) Load last savepoint: `world.checkpoint.restore()`

## Player
You can find and set your player's location:
1) Find Player position: `playet.getPos()`
      * Returns a `Tuple{Float64, Float64, Float64}` which contains the player's current coordinates. Note that the 2<sup>nd</sup> index or y-axis refers to the height axis.
2) Set Player position: `player.setPos(x, y, z)`
      * Teleports the player to the specified coordinates.

## Blocks
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
