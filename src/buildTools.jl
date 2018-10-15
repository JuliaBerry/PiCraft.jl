# buildTools

"""
    buildModel(m::Array{Block, 3}, pos::Tuple{Real, Real, Real})

Build a model from a 3-D block array.
"""
function buildModel(m::Array{Block,3}, pos::Tuple{Real, Real, Real})
    for X in 1:size(m, 1)
        for Y in 1:size(m, 2)
            for Z in 1:size(m, 3)
                setBlock(pos .+ (X, Y - 1, Z) , m[X, Y, Z])
            end
        end
    end
end

"""
    copyModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real})

Copy the Blocks between the diagonally opposite blocks and store in a 3-D Block Array.
"""
function copyModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real})
    p1 = round.(Int, p1)
    p2 = round.(Int, p2)
    dims = (abs.(p2 .- p1) .+ (1, 1, 1))
    m = Array{Block, 3}(undef, dims)
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
function cutModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block = Block(0, 0))
    m = copyModel(p1, p2)
    setBlocks(p1, p2, block)
    return m
end

"""
    flip(A::Array{Block, 3}, dim::Symbol)

Flip a 3-D Block Array in a particular dimension. Dimensions are `x`, `y` and `z`

# Example
```julia-repl
julia> A = reshape(Block.(collect(1:8)), (2,2,2))
2×2×2 Array{PiCraft.Block,3}:
[:, :, 1] =
 PiCraft.Block(1, 0)  PiCraft.Block(3, 0)
 PiCraft.Block(2, 0)  PiCraft.Block(4, 0)

[:, :, 2] =
 PiCraft.Block(5, 0)  PiCraft.Block(7, 0)
 PiCraft.Block(6, 0)  PiCraft.Block(8, 0)

julia> flip(A, :z)
2×2×2 Array{PiCraft.Block,3}:
[:, :, 1] =
 PiCraft.Block(5, 0)  PiCraft.Block(7, 0)
 PiCraft.Block(6, 0)  PiCraft.Block(8, 0)

[:, :, 2] =
 PiCraft.Block(1, 0)  PiCraft.Block(3, 0)
 PiCraft.Block(2, 0)  PiCraft.Block(4, 0)
```
"""
flip(A::Array{Block, 3}, dim::Symbol) = flip(A, Val{dim})

function flip(A, ::Type{Val{:x}})
    B = similar(A)
    for i = 1:size(A, 1)
        B[i, :, :] = A[size(A, 1) - i + 1, :, :]
    end
    return B
end

function flip(A, ::Type{Val{:y}})
    B = similar(A)
    for i = 1:size(A, 2)
        B[:, i, :] = A[:, size(A, 2) - i + 1, :]
    end
    return B
end

function flip(A, ::Type{Val{:z}})
    B = similar(A)
    for i = 1:size(A, 3)
        B[:, :, i] = A[:, :, size(A, 3) - i + 1]
    end
    return B
end

"""
    rotate(A::Array{Block, 3}; dir::Symbol = :l, dim::Symbol = :x)

Rotate a 3-D Block Array 90 degrees in a dimension and direction.
Dimensions are `x`, `y` and `z`. Directions are `l` & `r`.

# Example
```julia-repl
julia> A = reshape(Block.(collect(1:8)), (2,2,2))
2×2×2 Array{PiCraft.Block,3}:
[:, :, 1] =
 PiCraft.Block(1, 0)  PiCraft.Block(3, 0)
 PiCraft.Block(2, 0)  PiCraft.Block(4, 0)

[:, :, 2] =
 PiCraft.Block(5, 0)  PiCraft.Block(7, 0)
 PiCraft.Block(6, 0)  PiCraft.Block(8, 0)

julia> rotate(A, dir = :r, dim = :y)
 2×2×2 Array{PiCraft.Block,3}:
 [:, :, 1] =
  PiCraft.Block(3, 0)  PiCraft.Block(7, 0)
  PiCraft.Block(4, 0)  PiCraft.Block(8, 0)

 [:, :, 2] =
  PiCraft.Block(1, 0)  PiCraft.Block(5, 0)
  PiCraft.Block(2, 0)  PiCraft.Block(6, 0)
```
"""
rotate(A::Array{Block, 3}, dir::Symbol, dim::Symbol) = rotate(A, Val{dir}, Val{dim})
rotate(A::Array{Block, 3}; dir::Symbol = :l, dim::Symbol = :x) = rotate(A, Val{dir}, Val{dim})

function rotate(A, ::Type{Val{:l}}, ::Type{Val{:x}})
    B = similar(A, (size(A, 1), size(A, 3), size(A, 2)))
    for i in 1:size(A, 1)
        B[i,:,:] = rotl90(A[i,:,:])
    end
    return B
end

function rotate(A, ::Type{Val{:l}}, ::Type{Val{:y}})
    B = Array{Block, 3}(undef, (size(A, 3), size(A, 2), size(A, 1)))
    for i in 1:size(A, 2)
        B[:, i, :] = rotl90(A[:, i, :])
    end
    return B
end

function rotate(A, ::Type{Val{:l}}, ::Type{Val{:z}})
    B = Array{Block, 3}(undef, (size(A, 2), size(A, 1), size(A, 3)))
    for i in 1:size(A, 1)
        B[:, :, i] = rotl90(A[:, :, i])
    end
    return B
end

function rotate(A, ::Type{Val{:r}}, ::Type{Val{:y}})
    B = Array{Block, 3}(undef, (size(A, 1), size(A, 3), size(A, 2)))
    for i in 1:size(A, 1)
        B[i,:,:] = rotr90(A[i,:,:])
    end
    return B
end

function rotate(A, ::Type{Val{:r}}, ::Type{Val{:z}})
    B = Array{Block, 3}(undef, (size(A, 3), size(A, 2), size(A, 1)))
    for i in 1:size(A, 1)
        B[:, i, :] = rotr90(A[:, i, :])
    end
    return B
end

function rotate(A, ::Type{Val{:r}}, ::Type{Val{:x}})
    B = Array{Block, 3}(undef, (size(A, 2), size(A, 1), size(A, 3)))
    for i in 1:size(A, 1)
        B[:, :, i] = rotr90(A[:, :, i])
    end
    return B
end
