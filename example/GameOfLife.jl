# # Cellular Automaton
#
# ## Abstract
# We have an arrangement of atoms/cells. Each cell belongs to one in a finite
# set of states. With the progression of a unit time cells change their state
# in a parallel fashion determined by the rules of the system.
#
# Depending on the initial state and thr rules of the system we get a variety
# of behaviours. Some systems lead to homogenous states, some exhibit periodic
# oscillations between states, some are chaotic non-deterministic behaviours,
# ,.etc . The study of these discrete and abstract computational systems is
# called cellular automaton.
# ![https://plato.stanford.edu/entries/cellular-automata/](https://plato.stanford.edu/entries/cellular-automata/)
# is a great resource to understand and explore these systems.
#
# # Game of Life
#
# Game of Life is a popular cellular automaton devised by British mathematician
# John Conway. It consists of a two dimensional grid of cells with a start state
# with each cell being either dead or live at any point in time.
#
# The rules of the system are as follows :-
# * A cell with less than two neighbours dies due to underpopulation.
# * A cell with two or three neighbours lives.
# * A cell with greater than three neighbours dies by overpopulation.
# * A dead cell with three live neighbours becomes live.
#
# We will implement this game of life in minecraft to generate some interesting
# patterns.

using PiCraft

# First let's write our function which will transform from one state to another.

function nextState(A::Array{Bool, 2})
    B = similar(A)
    dims = size(A)
    for i = 1:dims[1], j = 1:dims[2]
        liveNeighbours = 0
        for p = -1:1, q = -1:1
            if checkbounds(Bool, A, i + p, j + q) && (p == 0 && q == 0)
                liveNeighbours += 1
            end
        end
        if A[i, j] == false && liveNeighbours == 3
            B[i, j] = true
        elseif liveNeighbours < 2 || liveNeighbours > 3
            B[i, j] = false
        end
    end
    return B
end

# Now to render an arbitrary 2-D board in Minecraft
# Let live cells be white wool and dead be black wool

function displayState(p::Tuple{Int, Int, Int}, A::Array{Bool, 2})
    dims = size(A)
    for i = 1:dims[1], j = 1:dims[2]
        if A[i, j]
            setBlock(p .+ (i, j, 0), Block(35))
        else
            setBlock(p .+ (i, j, 0), Block(35, 15))
        end
    end
end

p = getTile() .+ (3, 4, 3)
A = rand(Bool, 10, 10)

for i = 1:20
    displayState(A)
    A = nextState(A)
    sleep(0.5)
end

# A variety of interesting patterns can be found ![here](http://web.stanford.edu/~cdebs/GameOfLife/)
# It is encouraged that you experiment with various patterns.

# # 3-D implementation
# If we want to consider a 3-D implementation of the Game of Life then we must
# realise that in 3-D a cell will have 26 Neighbours (3^3 - 1).
#
# We generally express a 3-D system as a `Life wxyz` system.
# The rules of such a system are :
#
# * The number of live neighbours must be between `w` and `x` to sustain life.
# * The number of live neighbours must be between `y` and `z` to bring a dead
#   back to life.
#
# Conway's Game of Life is hence a `Life 2333` system.
# Since a large number of combinations are possible they have been studied
# extensively for their properties. Most systems quickly collapse or explode.
# Life 4555 and 5766 are the only valid systems which exhibit life like
# properties.
#
# Let's implement Life 4555. For that we will rewrite the `nextState` and `displayState`
# funcitons.

function nextState(A::Array{Bool, 3})
    B = similar(A)
    dims = size(A)
    for i = 1:dims[1], j = 1:dims[2], k = 1:dims[3]
        liveNeighbours = 0
        for p = -1:1, q = -1:1, r = -1:1
            if checkbounds(Bool, A, i + p, j + q, k + r) && (p == 0 && q == 0 && r == 0)
                liveNeighbours += 1
            end
        end
        if A[i, j, k] == false && liveNeighbours == 5
            B[i, j, k] = true
        elseif liveNeighbours < 4 || liveNeighbours > 5
            B[i, j, k] = false
        end
    end
    return B
end

function displayState(p::Tuple{Int, Int, Int}, A::Array{Bool, 3})
    dims = size(A)
    for i = 1:dims[1], j = 1:dims[2], k = 1:dims[3]
        if A[i, j, k]
            setBlock(p .+ (i, j, k), Block(35))
        else
            setBlock(p .+ (i, j, k), Block(35, 15))
        end
    end
end

p = getTile() .+ (3, 4, 3)
A = rand(Bool, 7, 7, 7)

for i = 1:20
    displayState(A)
    A = nextState(A)
    sleep(0.5)
end
