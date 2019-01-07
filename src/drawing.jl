# drawLine using Bresenham's Line algorithm (3-D implementation)
"""
    drawLine(p1::Tuple{Real,Real,Real}, p2::Tuple{Real,Real,Real}, block::PiCraft.Block = PiCraft.GOLD_BLOCK, width::Real = 1)

Draw a line from point `p1` to point `p2` using `block`.
`block` is gold block by default.

"""
function drawLine(p1::Tuple{Real,Real,Real}, p2::Tuple{Real,Real,Real}, block::PiCraft.Block = PiCraft.GOLD_BLOCK, width::Real = 1.0)
    p = p1 = round.(Int, p1)
    p2 = round.(Int, p2)
    
    if(width < 1)
        error("Width must be greater than or equal to 1")
    end
    if width > 1.0
       r = (-width/2):(width/2)
        for a = r, b = r, c = r
            if sum((a, b, c).^2) <= (width/2)^2
                setBlock(p .+ (a, b, c), block)
            end
        end
    else
        setBlock(p, block)
    end
    
    Δx, Δy, Δz = p2 .- p1
    δx, δy, δz = ifelse.((Δx, Δy, Δz) .< 0, -1, 1)
    l, m, n = abs.((Δx, Δy, Δz))
    Δx2, Δy2, Δz2 = abs.(2 .* (Δx, Δy, Δz))
    if (l >= m && l >= n)
        ϵ1, ϵ2 = (Δy2, Δz2) .- (l, l)
        for i in 1:l
            if width > 1.0
               r = (round(-width/2 - 1)):(round(width/2 + 1))
                for a = r, b = r, c = r
                    if sum((a, b, c).^2) <= (width/2)^2
                        setBlock(p .+ (a, b, c), block)
                    end
                end
            else
                setBlock(p, block)
            end
            if ϵ1 > 0
                p = p .+ (0, δy, 0)
                ϵ1 -= Δx2
            end
            if ϵ2 > 0
                p = p .+ (0, 0, δz)
                ϵ2 -= Δx2
            end
            ϵ1 += Δy2
            ϵ2 += Δz2
            p = p .+ (δx, 0, 0)
        end
    elseif m >= l && m >= n
        ϵ1, ϵ2 = (Δx2, Δz2) .- (m, m)
        for i in 1:m
            if width > 1.0
               r = (-width/2):(width/2)
                for a = r, b = r, c = r
                    if sum((a, b, c).^2) <= (width/2)^2
                        setBlock(p .+ (a, b, c), block)
                    end
                end
            else
                setBlock(p, block)
            end
            if ϵ1 > 0
                p = p .+ (δx, 0, 0)
                ϵ1 -= Δy2
            end
            if ϵ2 > 0
                p = p .+ (0, 0, δz)
                ϵ2 -= Δy2
            end
            ϵ1 += Δx2
            ϵ2 += Δz2
            p = p .+ (0, δy, 0)
        end
    else
        ϵ1 , ϵ2 = (Δy2, Δx2) .- (n, n)
        for i in 1:n
            if width > 1.0
               r = (-width/2):(width/2)
                for a = r, b = r, c = r
                    if sum((a, b, c).^2) <= (width/2)^2
                        setBlock(p .+ (a, b, c), block)
                    end
                end
            else
                setBlock(p, block)
            end
            if ϵ1 > 0
                p = p .+ (0, δy, 0)
                ϵ1 -= Δz2
            end
            if ϵ2 > 0
                p = p .+ (δx, 0, 0)
                ϵ2 -= Δz2
            end
            ϵ1 += Δy2
            ϵ2 += Δx2
            p = p .+ (0, 0, δz)
        end
    end
    if width > 1.0
       r = (-width/2):(width/2)
        for a = r, b = r, c = r
            if sum((a, b, c).^2) <= (width/2)^2
                setBlock(p2 .+ (a, b, c), block)
            end
        end
    else
        setBlock(p2, block)
    end
    return
end
