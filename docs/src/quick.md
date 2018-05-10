Load the `PiCraft` package on the Julia console:
```julia
using PiCraft
```

On load, the library will attempt to connect to a running Minecraft world on localhost. If Minecraft is not running, an error message will be printed. Subsequently, once Minecraft has been started,  a connection can be forced by calling `connectToWorld()`

You can save and restore your progress using the commands:
1) Save: `save()`
2) Load last savepoint: `restore()`

A 3-D coordinate system is used to describe the Minecraft world. Throughout this package we describe a set of coordinates using a `Tuple` of numbers, for example `(3.5, 19, 7)` describes a position in the Minecraft World. The 2<sup>nd</sup> attribute of the `Tuple` describes the y-axis or height. When in game it is convenient to find the player coordinates by opening the debug menu.  

### Player
You can find and set your player's location:
1) Find Player position: `getPos()`
      * Returns a `Tuple{Float64, Float64, Float64}` which contains the player's current coordinates.
2) Set Player position: `setPos(pos::Tuple{Float64, Float64, Float64})`
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
The `id` defines the type of block (like cobblestone, wool, wood,.etc) and the `data` attribute defines additional characteristics of the block, on default every block has it `data` set to `0`. For example, Wool's block id is 35, `Block(35,0)` refers to a block of white wool. Different wool colors can be accessed by changing the `data` attribute. Red Wool is `Block(35, 14)`, Pink Wool is `Block(35,6)` and so on. A complete reference can be found in the documentation.

1) Place Block: `setBlock(Tuple{Int,Int,Int}, block::Picraft.Block)`
    * Place the specified Block at the specified coordinates.
2) Place Blocks: `setBlocks(pos::Tuple{UnitRange{Int}, UnitRange{Int}, UnitRange{Int}}, block::PiCraft.Block)`
    * Place the specified block in the entire region described by the unit range.
3) Get Block information: `getBlock(Tuple{Int,Int,Int})`
    * Returns the block present at the specified coordinates.

While the `getBlock` and `setBlock` functions will accept `Float64` as arguments these will be rounded and set to `Int` as a block cannot be placed on non-integer coordinates.
