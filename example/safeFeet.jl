# Walk over water and air by replacing it with Dimaond Blocks
# Usage:
#   t = now()
#   while (now() - t).value/1000 < 60
#       safeFeet()
#    end


function safeFeet()
   b = getTile() .+ (0, -1, 0)
   if getBlock(b) ∈  [PiCraft.AIR, PiCraft.WATER_STATIONARY, PiCraft.WATER_FLOWING]
       setBlock(b, PiCraft.DIAMOND_BLOCK)
   end
end
