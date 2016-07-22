
function safeFeet()
    x,y,z = player.getTile()
    b = world.getBlock(x,y-1, z)
    if b == PiCraft.AIR || b == PiCraft.WATER_STATIONARY || b == PiCraft.WATER_FLOWING
        world.setBlock(x, y-1, z, PiCraft.DIAMOND_BLOCK, 1)
    end
end
    
        
