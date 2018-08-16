
# # Safe Feet
#
# Walk over water and air by replacing it with Dimaond Blocks
# Usage:
#

using PiCraft

function safeFeet()
   b = getTile() .+ (0, -1, 0)    #Get the Block coordinates on which the player is standing
   if getBlock(b) ∈  [PiCraft.AIR, PiCraft.WATER_STATIONARY, PiCraft.WATER_FLOWING, PiCraft.LAVA, PiCraft.LAVA_STATIONARY] #Check if the block is
       setBlock(b, PiCraft.DIAMOND_BLOCK)
   end
   sleep(0.05) #Pause as to not spam the API, results in a smoother experience
end

# Run this function in a loop, and press Ctrl-C to stop

# ```julia
#    t = now()
#    while (now() - t).value/1000 < time_period
#       safeFeet()
#    end
# ```

# ### Challenge:
# * Use a queue to remove blocks such that the maximum bridge length is 10.
# * Your script should automatically remove blocks which had too far behind.
# * Enter "\py bridge" for a demonstration
