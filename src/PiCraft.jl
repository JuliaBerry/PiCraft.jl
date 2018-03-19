module PiCraft

include("blocks.jl")

export world, player, chat, Block, find_item

# package code goes here

type World
    s::TCPSocket
    function World()
        try
            s=connect("localhost", 4711)
            new(s)
        catch
            warn("Unable to connect to Minecraft World. Use `PiCraft.connectToWorld()` after starting Minecraft")
            new(TCPSocket())
        end
    end
end

global const minecraftWorld = World()

function connectToWorld()
    sock=connect("localhost", 4711)
    minecraftWorld.s = sock
end

module world
    using PiCraft
    function getBlock(x, y, z)
        (x, y, z) = (floor(Int64, x), floor(Int64, y), floor(Int64,z))
        res = PiCraft.mc_send("world.getBlock($x,$y,$z)", true)
        @assert length(res) == 1
        return Block(parse(Int, res[1]))
    end

    function setBlock(x,y,z,block::PiCraft.Block)
        PiCraft.mc_send("world.setBlock($x,$y,$z,$(block.id))", false)
    end

    function setBlock(x,y,z,block::PiCraft.Block, data)
        (x, y, z) = (floor(Int64, x), floor(Int64, y), floor(In64, z))
        PiCraft.mc_send("world.setBlock($x,$y,$z,$(block.id),$(block.data),$data)", false)
    end

    function setBlocks(x1,y1,z1,x2,y2,z2,block::PiCraft.Block)
        (x1, y1, z1, x2, y2, z2) = (floor(x1), floor(y1), floor(z1), floor(x2), floor(y2), floor(z2))
        PiCraft.mc_send("world.setBlocks($x1,$y1,$z1,$x2,$y2,$z2,$(block.id),$(block.data))", false)
    end

    function getHeight(x::Int,z::Int)
        res = PiCraft.mc_send("world.getHeight($x,$z), true")
        @assert length(res) == 1
        return parse(Int, res[1])
    end

    module checkpoint
        using PiCraft
        save() = PiCraft.mc_send("world.checkpoint.save()", false)
        restore() = PiCraft.mc_send("world.checkpoint.restore()", false)
    end
end

module chat
    using PiCraft
    function post(s)
        PiCraft.mc_send("chat.post($(string(s)))", false)
    end
end

module player
    using PiCraft
    function getTile()
        res = PiCraft.mc_send("player.getTile()", true)
        @assert length(res) == 3
        return (parse(Int, res[1]),
                parse(Int, res[2]),
                parse(Int, res[3]))
    end

    function setTile(x::Int, y::Int, z::Int)
        PiCraft.mc_send("player.setTile($x,$y,$z)")
    end

    function getPos()
        res = PiCraft.mc_send("player.getPos()", true)
        @assert length(res) == 3
        return [parse(Float64, res[1]),
                parse(Float64, res[2]),
                parse(Float64, res[3])]
    end

    function setPos(xf::Float64, yf::Float64, zf::Float64)
        PiCraft.mc_send("player.setPos($xf,$yf,$zf)")
    end

end

function mc_send(cmd, output=true)
    if minecraftWorld.s.status == Base.StatusInit || minecraftWorld.s.status == Base.StatusUninit
        error("Connection to Minecraft World is not initialised. Use `PiCraft.connectToWorld()` first.")
    end
    #println("Command: $cmd")
    write(minecraftWorld.s, cmd*"\n")
    #write(minecraftWorld.s, '\n')
    if output
        s = readline(minecraftWorld.s)
        println("Return: $s")
        if contains(s,  "Fail")
            error("Error from Minecraft in command $cmd")
        end
        return split(strip(s), ',')
    end
end

end # module
