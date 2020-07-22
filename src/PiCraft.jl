module PiCraft

using Sockets
using GZip

include("api.jl")
include("blocks.jl")
include("turtle.jl")
include("drawing.jl")
include("NBT.jl")
include("buildTools.jl")

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
    World()
end

global const minecraftWorld = Ref{World}()


end