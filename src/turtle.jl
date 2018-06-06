"""
    turtle

A graphics turtle meant to move in all 3-Dimensions. It contains the following fields:

* `pos` : The coordinates of the turtle.
* `direction` : The direction in which the turtle is facing.
* `normal` : The direction normal to the turtle's body.
* `penBlock` : The block which will be used to draw.
* `stepSize` : The size of a turtle's step.
* `penDown` : Activation state of `penBlock`.

"""
mutable struct turtle
    pos::Tuple{Float64, Float64, Float64}
    direction::Array{Float64, 1} # Direction turtle is facing, Roll axis
    normal::Array{Float64, 1} # Direction normal to the turtle's body, Yaw axis
    penBlock::PiCraft.Block
    stepSize::Float64
    penDown::Bool

    function turtle()
        pos = getPos()
        direction = [1.0; 0.0; 0.0]
        normal = [0.0; -1.0; 0.0]
        penBlock = Block(41)
        stepSize = 0.3
        penDown = true
        return new(pos, direction, normal, penBlock, stepSize, penDown)
    end
end

"""
    move(t::turtle, s::Int)

Move the turtle `t` forward `s` steps.
"""
function move(t::turtle, s::Real)
    s = floor(Int, s)
    for i in 1:s
        t.penDown && setBlock(t.pos, t.penBlock)
        t.pos = t.pos .+ Tuple(t.direction*t.stepSize)
    end
end

"""
    pitch(t::turtle, θ::Real)

Pitch the turtle `t` by `θ` degrees.
"""
function pitch(t::turtle, θ::Real)
    yawAxis = cross(t.normal, t.direction)
    t.normal, t.direction = normalize(t.normal*cosd(θ) + cross(yawAxis, t.normal)*sind(θ)), normalize(t.direction*cosd(θ) + cross(yawAxis, t.direction)*sind(θ))
end

"""
    yaw(t::turtle, θ::Real)

Yaw the turtle `t` by `θ` degrees.
"""
function yaw(t::turtle, θ::Real)
    t.direction = normalize(t.direction*cosd(θ) + cross(t.normal, t.direction)*sind(θ))
end

"""
    roll(t::turtle, θ::Real)

Roll the turtle `t` by `θ` degrees.
"""
function roll(t::turtle, θ::Real)
    t.normal = normalize(t.normal*cosd(θ) + cross(t.direction, t.normal)*sind(θ))
end
