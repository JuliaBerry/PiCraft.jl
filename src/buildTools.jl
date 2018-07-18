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
