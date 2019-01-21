module PiCraft

using Sockets
using GZip

include("blocks.jl")
include("turtle.jl")
include("drawing.jl")
include("NBT.jl")
include("buildTools.jl")

export World, Block, connectToWorld, mc_send, getBlock, setBlock, setBlocks, getHeight, getPlayerIds
export setting, saveWorld, restoreWorld, post, getChatEvents, getTile, setTile, getPos, setPos, pollBlockHits
export clearEvents, camera
export turtle, move, yaw, pitch, roll
export drawLine
export parseNBT, importSchematic, exportSchematic
export buildModel, copyModel, cutModel, flip, rotate, rotate!

mutable struct World
    s::Sockets.TCPSocket
    function World()
        try
            s = Sockets.connect("localhost", 4711)
            new(s)
        catch
            @warn("Unable to connect to Minecraft World. Use `connectToWorld()` after starting Minecraft")
            new(TCPSocket())
        end
    end
end

global const minecraftWorld = Ref{World}()

"""
    connectToWorld(address = "localhost", port = 4711)

Connect to the Minecraft API.
"""
function connectToWorld(address = "localhost", port = 4711)
    try
        minecraftWorld[].s = connect(address, port)
    catch
        error("Unable to connect to the Minecraft World.")
    end
    @info("Successfully connected to the Minecraft World.")
end

"""
    mc_send(cmd, output=true)

Communicate with the Minecraft API.
"""
function mc_send(cmd, output=true)
    if minecraftWorld[].s.status == Base.StatusInit || minecraftWorld[].s.status == Base.StatusUninit
        error("Connection to Minecraft World is not initialised. Use `PiCraft.connectToWorld()` first.")
    end
    write(minecraftWorld[].s, cmd*"\n")
    if output
        s = readline(minecraftWorld[].s)
        if occursin("Fail", s)
            println("Return: $s")
            error("Error from Minecraft in command $cmd")
        end
        return split(strip(s), ',')
    end
end

"""
    getBlock(pos::Tuple{Real, Real, Real})

Get the Block information from the specified coordinates.
"""
function getBlock(pos::Tuple{Real, Real, Real})
    pos = round.(Int, pos)
    res = PiCraft.mc_send("world.getBlockWithData($(pos[1]),$(pos[2]),$(pos[3]))", true)
    return Block(parse(Int, res[1]), (parse(Int, res[2])))
end

"""
    setBlock(pos::Tuple{Real, Real, Real}, block::Block)

Place the specified `Block` at the given coordinates.
"""
function setBlock(pos::Tuple{Real, Real, Real}, block::Block)
    pos = round.(Int, pos)
    PiCraft.mc_send("world.setBlock($(pos[1]),$(pos[2]),$(pos[3]),$(block.id),$(block.data))", false)
end

"""
    setBlocks(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block)

Set an entire region to the specified block type defined by the corners `p1` and `p2`.
"""
function setBlocks(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block)
    p1 = round.(Int, p1)
    p2 = round.(Int, p2)
    PiCraft.mc_send("world.setBlocks($(p1[1]),$(p1[2]),$(p1[3]),$(p2[1]),$(p2[2]),$(p2[3]),$(block.id),$(block.data))", false)
end

"""
    getHeight(x::Int, z::Int)

Get the height of the world at the specified `x` and `z` coordinates.
"""
function getHeight(x::Int, z::Int)
    h = PiCraft.mc_send("world.getHeight($x,$z)", true)
    return parse(Int, h[1])
end

"""
    getPlayerIds()

Return an array of all Player Id's connected to the server.
"""
function getPlayerIds()
    return parse.(Int,PiCraft.mc_send("world.getPlayerIds()"))
end

setting(name, status) = PiCraft.mc_send("world.setting($(name),$(status))", false)

"Save the World's progress"
saveWorld() = PiCraft.mc_send("world.checkpoint.save()", false)

"Restore the world to the previous savepoint."
restoreWorld() = PiCraft.mc_send("world.checkpoint.restore()", false)

"""
    post(m...)

Post a message to chat
"""
function post(m...)
    s = ""
    for x in m
        s *= string(x)
    end
    PiCraft.mc_send("chat.post($(s)", false)
end

function getChatEvents()
    ChatEventsRaw = []
    for j in PiCraft.mc_send("events.chat.posts()", true)
        for s in split(j, "|")
            length(s) > 0 && push!(ChatEventsRaw, s)
        end
    end
    ChatEvents = Array{Tuple{Int, String}, 1}(undef, Int(length(ChatEventsRaw)/2))
    for i in 1:length(ChatEvents)
        ChatEvents[i] = (parse(Int, ChatEventsRaw[2*i - 1]), ChatEventsRaw[2*i])
    end
    return ChatEvents
end

"""
    getTile()
Return the tile's coordinates on which the player is standing.
"""
function getTile()
    pos = PiCraft.mc_send("player.getTile()", true)
    return tuple(parse.(Int,pos)...)
end

"""
    setTile(pos::Tuple{Real, Real, Real})

Teleport the player on top of the specified tile
"""
function setTile(pos::Tuple{Real, Real, Real})
    pos = round.(Int, pos)
    PiCraft.mc_send("player.setTile($(pos[1]),$(pos[2]),$(pos[3]))", false)
end

"""
    getPos()

Return the player's coordinates.
"""
function getPos()
    pos = PiCraft.mc_send("player.getPos()", true)
    return tuple(parse.(Float64, pos)...)
end

"""
    setPos(pos::Tuple{Real, Real, Real})

Teleport the player to the specified coordinates
"""
function setPos(pos::Tuple{Real, Real, Real})
    PiCraft.mc_send("player.setPos($(pos[1]),$(pos[2]),$(pos[3]))", false)
end

#Entity Commands
"""
    getTile(entityId::Int)

Get the tile on which the specified `entity` is.
"""
function getTile(entityId::Int)
    pos = PiCraft.mc_send("player.getTile($(entityId))", true)
    return tuple(parse.(Int, pos)...)
end

"""
    setTile(entityId::Int)

Teleport the `entity` on the specified tile.
"""
function setTile(entityId::Int, pos::Tuple{Real, Real, Real})
    pos = round.(Int,pos)
    PiCraft.mc_send("player.setTile($(entityId),$(pos[1]),$(pos[2]),$(pos[3]))", false)
end

"""
    getPos(entityId::Int)

Get the position of the specified `entity`.
"""
function getPos(entityId::Int)
    pos = PiCraft.mc_send("player.getPos($(entityId))", true)
    return tuple(parse.(Float64, pos)...)
end

"""
    setPos(entityId::Int, pos::Tuple{Real, Real, Real})

Set the position of the specified `entity`.
"""
function setPos(entityId::Int, pos::Tuple{Real, Real, Real})
    PiCraft.mc_send("player.setPos($(entityId),$(pos[1]),$(pos[2]),$(pos[3]))", false)
end

"""
    pollBlockHits()

Returns an array of all the events which have occurred since the last time the function was called.
Each event is described with a tuple `((x, y, z), face, entityId)`. `x`, `y` and `z` are the coordinates of the block.
`face` is the block's face number which was hit and `entityId` identifies the player who hit the block using a sword.
"""
function pollBlockHits()
    rawEvents = []
    for s in PiCraft.mc_send("events.block.hits()", true)
        for j in split(s, "|")
            length(j) > 0 && push!(rawEvents, parse(Int,j))
        end
    end
    Events = []
    for i in 0:(Int(length(rawEvents)/5) - 1)
        push!(Events, ( (rawEvents[1 + 5*i], rawEvents[2 + 5*i], rawEvents[3 + 5*i]) , rawEvents[4 + 5*i], rawEvents[5 + 5*i]))
    end
    return Events
end

"Clear all events in the buffer"
clearEvents() = PiCraft.mc_send("events.clear()", false)

# Camera functions, Only supported by Minecraft: Pi Edition
module camera
    using PiCraft

    setNormal(entityId::Int) = PiCraft.mc_send("camera.mode.setNormal($(entityId))", false)
    setFixed() = PiCraft.mc_send("camera.mode.setFixed()", false)
    setFollow(entityId::Int) = PiCraft.mc_send("camera.mode.setFollow($(entityId))", false)
    setPos(pos::Tuple{Real, Real, Real}) = PiCraft.mc_send("camera.setPos($(pos[1]),$(pos[2]),$(pos[3]))", false)

end

end # module
