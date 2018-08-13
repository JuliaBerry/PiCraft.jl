# # Turn to Gold

# ### Turn blocks to gold by hitting them
# Demonstration of pollBlockHits()
# the function pollBlockHits() returns an Array of hit Events
# A hit event is a tuple, say `((5, 4, 5), 2, 17)`
# `(5, 4, 5)` are the coordinates to the block which was hit
# `2` is the face of the block which was hit
# `17` is the entityId of the Entity which was responsible for the hit

using Dates
using PiCraft

clearEvents() # Clear all previous events
t = now() # Mark the current time

post("60 seconds to turn blocks to gold.")

while (now() - t).value/1000 < 60.0 # Continue the loop if 60 seconds has not elapsed
    for hit in pollBlockHits()
        setBlock(hit[1], Block(41)) # hit[1] are the coordinates to the Block which was hit
    end
end

# Post a message to screen when done
post("Time Over!")
