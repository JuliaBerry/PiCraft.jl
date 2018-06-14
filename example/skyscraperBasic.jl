# Construct a skyscraper

using PiCraft

# Let's first define a few basic parameters for our building
p = getPos() .+ (0, -1, 0)
floors = 5
#length will go in the +ve x direction and width in the +ve z direction
length = 10
width = 15
height = 6

# We're first going to write code to construct a single floor relative to a point
# Then we will use a loop to create a skyscraper
# pseudocode:
#    x = start_position
#    for i in 1:floors
#        buildFloor(x)
#        increase x's height by floor's height
#    end
#    Build a ceiling for the top floor
#
# Now to build a floor
#    1) Make all the walls out of glass panes
#    2) Set the bottom level as floor
#    3) Get Pillars on the corners

function buildFloor(p)
    # Set all walls to glass panes
    setBlocks(p .+ (1, 0, 1), p .+ (1, height, width), PiCraft.GLASS_PANE)
    setBlocks(p .+ (1, 0, 1), p .+ (length, height, 1), PiCraft.GLASS_PANE)
    setBlocks(p .+ (1, height, width), p .+(length, 0, width), PiCraft.GLASS_PANE)
    setBlocks(p .+ (length, height, width), p .+ (length, 0, 1), PiCraft.GLASS_PANE)

    #Set entire floor to Stone Brick
    setBlocks(p .+ (1, 0, 1), p .+ (length, 0, width), PiCraft.STONE_BRICK)

    #Set 4 Pillars to the corners
    setBlocks(p .+ (1, 0, 1), p .+ (1, height, 1), PiCraft.STONE_BRICK)
    setBlocks(p .+ (1, 0, width), p .+ (1, height, width), PiCraft.STONE_BRICK)
    setBlocks(p .+ (length, 0, 1), p .+ (length, height, 1), PiCraft.STONE_BRICK)
    setBlocks(p .+ (length, 0 , width), p .+ (length, height, width), PiCraft.STONE_BRICK)
end

function makeSkyscraper()
    for i in 1:floors
        buildFloor(p .+ (0, height*i - height, 0))
    end
    setBlocks(p .+ (1, height*floors, 1), p .+ (length, height*floors, width), PiCraft.IRON_BLOCK) # Set Roof to Iron Block
end

# This building isn't particularly nice and has too much glass. Let's have another go.
# When we use programming to solve a problem there can be multiple solutions to the same
# problem.

# This time let's make the building first and then add windows later

function makeSkyscraper2()
    # Make a filled cuboid of Blocks filling the entire building space
    setBlocks(p .+ (1, 0, 1), p .+ (length, height*floors + 1, width),Block(251, 0))

    # Hollow out the inside of the building
    setBlocks(p .+ (2, 1, 2), p .+ (length - 1, height*floors, width - 1), PiCraft.AIR)

    # Add wooden flooring
    for i in 0:floors
        setBlocks(p .+ (2, height*i, 2), p .+ (length - 1, height*i, width - 1), PiCraft.WOOD_PLANKS)
    end
    # Add window Panes, careful if you change the given building dimensions, the change in coordinates may result
    # in unintended consequences.
    for i in 0:(floors - 1)
        setBlocks(p .+ (1, height*i + 2, floor.((width + 1)/2 - 2)),
        p .+ (1, height*i + 4, floor.((width + 1)/2 + 2)), PiCraft.GLASS_PANE)
        setBlocks(p .+ (1, height*i + 2, floor.((width + 1)/2 - 2)),
        p .+ (1, height*i + 4, floor.((width + 1)/2 + 2)), PiCraft.GLASS_PANE)
    end
end

# In our second iteration we made the building better, the code is easier to
# follow through and is less in comparison.
# Now, experiment around writing your own code architecturing your own designs.
# Check out the challenges listed below
# Challenges :
# 1) Make the building well lit with torches
# 2) Add a balcony to each floor.
# 3) A common ladder access for all floors.
# 4) Add randomness to your design
#     Hint: for all blocks in building
#               if block is cobblestone and rand() < 0.1
#                   set block to Mossy Cobblestone
