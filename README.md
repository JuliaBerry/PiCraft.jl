# PiCraft

### Control a Minecraft world on a Raspberry Pi from Julia

## Installation and Usage
```julia
Pkg.clone("https://github.com/JuliaBerry/PiCraft.jl")

using PiCraft
```

On load, the library will attempt to connect to a running Minecraft world on localhost. If Minecraft is not running, an error message will be printed. Subseqently, once Minecraft has been started,  a connection can be forced by calling `PiCraft.connectToWorld()`

## Reference

The API is modelled on the original python interface to Minecraft on the RPi. 

```julia

world.getBlock(x, y, z) # retrive a Block object at the specified coordinates
world.setBlcok(x, y, z, block) #set the specified Block to these coordinates
world.setBlocks(x1,y1,z1,x2,y2,z2,block::PiCraft.Block) #set a block to an entire region
world.checkpoint.save()
world.checkpoint.restore()

chat.post(s) #send a string to chat

player.getTile() # return a tuple of integers (x, y, z),  for the tile on which the player is placed
player.setTile(x, y, z) # move the player to the tile specified by the integer coordinates
player.getpos() # return a tuple of floats (x, y, z) with the player's position
player.setPos(x, y, z) # move the player to the specified coordinates

```
