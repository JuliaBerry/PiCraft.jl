# buildTools

"""
    buildModel(m::Array{Block, 3}, pos::Tuple{Real, Real, Real})

Build a model from a 3-D block array.
"""
function buildModel(m::Array{Block,3}, pos::Tuple{Real, Real, Real})
    for X in 1:size(m, 1)
        for Y in 1:size(m, 2)
            for Z in 1:size(m, 3)
                setBlock(pos .+ (X, Y, Z), m[X, Y, Z])
            end
        end
    end
end

"""
    copyModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real})

Copy the Blocks between the diagonally opposite blocks in the form of a 3-D Block Array.
"""
function copyModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real})
    p1 = round.(Int, p1)
    p2 = round.(Int, p2)
    dims = (abs.(p2 .- p1) .+ (1, 1, 1))
    m = Array{Block, 3}(dims)
    for X in 1:dims[1]
        for Y in 1:dims[2]
            for Z in 1:dims[3]
                m[X, Y, Z] = getBlock(min.(p1, p2) .+ (X, Y, Z) .- (1, 1, 1))
            end
        end
    end
    return m
end

"""
    cutModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block)

Copy blocks between diagonally opposite blocks and fill the space with `block`.
"""
function cutModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block)
    m = copyModel(p1, p2)
    setBlocks(p1, p2, block)
    return m
end
