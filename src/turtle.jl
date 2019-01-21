using LinearAlgebra: normalize, cross

"""
    turtle

A graphics turtle meant to move in all 3-Dimensions. It contains the following fields:

* `pos` : The coordinates of the turtle.
* `direction` : The Roll Axis - direction in which the turtle is facing.
* `normal` : The Yaw axis - direction normal to the turtle's body.
* `penBlock` : The block which will be used to draw.
* `stepSize` : The size of a turtle's step.
* `penDown` : Activation state of `penBlock`.

The default constructor initializes the `turtle` at the player's position,roll axis is the positive x-direction,
with the yaw axis pointing downwards. `penBlock` is gold by default and is activated with the `stepSize` = 0.5
"""
mutable struct turtle
    pos::Tuple{Float64, Float64, Float64}
    direction::Array{Float64, 1} # Direction turtle is facing, Roll axis
    normal::Array{Float64, 1} # Direction normal to the turtle's body, Yaw axis
    penBlock::PiCraft.Block
    penWidth::Float64
    penScale::Float64
    penDown::Bool

    turtle(;pos = getPos(), direction = [1.0; 0.0; 0.0], normal = [0.0; -1.0; 0.0], penBlock = Block(41), penWidth = 1.0, penScale = 1.0, penDown = true) = new(pos, direction, normal, penBlock, penWidth, penScale, penDown)
end

"""
    move(t::turtle, s::Int)

Move the turtle `t` forward `s` units.
"""
function move(t::turtle, s::Real)
    t.penDown && drawLine(t.pos, Tuple(t.pos .+ s*t.direction), t.penBlock, t.penWidth)
    t.pos = Tuple(t.pos .+ s*t.direction)
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
