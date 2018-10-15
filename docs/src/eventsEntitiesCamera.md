# Events, Entities and Camera

## Event

There are two types of events: Hit events and Chat events

#### Hit Event

If you equip your player with a sword and right click to hit a block then that
hit will be recorded and is effectively a 'HitEvent'. Use the `pollBlockHits()`
function to get an array of all of these events. Each event is described by a tuple
`((x, y, z), face, entityId)`. `x`, `y` and `z` are the coordinates of the block.
`face` is the block's face number which was hit and `entityId` identifies the player who
hit the block using a sword.

Check out the [turntogold](https://juliaberry.github.io/PiCraft.jl/example/turnToGold.html) example
to find out how it can be used.

#### Chat Event

We can find out all the chat messages posted in the session using the `getChatEvents()`
function.

```julia-repl
julia> getChatEvents()
2-element Array{Tuple{Int64,String},1}:
 (152, "Hello!")               
 (152, "Is anyone listening ?")
```

## Entity

Each player is uniquely identified by an id called 'EntityId'.
Execute `getPlayerIds()` to get an array of all Entities connected to this session.

```julia-repl
julia> getPlayerIds()
1-element Array{Int64,1}:
 152
```

You can also manipulate the position of any entity using the commands:

1. `getPos(entityId::Int)`
2. `setPos(pos::Tuple{Real, Real, Real})`
3. `getTile(entityId::Int)`
4. `setTile(entityId::Int, pos::Tuple{Real, Real, Real})`

## Camera

Camera commands are only available on the Pi. Here are all the available camera
commands.

1. `setNormal(entityId::Int)`
2. `setFixed()`
3. `setFollow(entityId::Int)`
4. `setPos(pos::Tuple{Real, Real, Real})`
