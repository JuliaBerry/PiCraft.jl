using Documenter, PiCraft
using Literate

load_dir(x) = map(file -> joinpath("lib", x, file), readdir(joinpath(Base.source_dir(), "src", "lib", x)))


Literate.markdown("../example/safeFeet.jl", "src/example"; documenter=true)
Literate.markdown("../example/turnToGold.jl", "src/example"; documenter=true)
Literate.markdown("../example/turtle.jl", "src/example"; documenter=true)
Literate.markdown("../example/skyscraperBasic.jl", "src/example"; documenter=true)
Literate.markdown("../example/GameOfLife.jl", "src/example"; documenter=true)
Literate.markdown("../example/platform9_75.jl", "src/example"; documenter=true)

makedocs(
   modules = [PiCraft],
   clean = false,
   format = [:html],#, :latex],
   sitename = "PiCraft",
   pages = Any[
       "Home" => "index.md",
       "Quick Start" => "quick.md",
       "Examples" => Any[
            "Safe Feet" => "example/safeFeet.md",
            "Turn to Gold" => "example/turnToGold.md",
            "Turtle" => "example/turtle.md",
            "Sky Scraper" => "example/skyscraperBasic.md"
            "Game Of Life" => "example/GameOfLife.jl",
            "Platform 9¾" => "example/platform9_75.jl"
       ],
       "Block Reference" => "blocks.md",
       "API Reference" => "api.md"
   ],
   assets = ["assets/custom.css"]
)

deploydocs(
    repo = "github.com/aviks/PiCraft.jl.git",
    target = "build",
    julia = "0.6",
    osname = "linux",
    deps = nothing,
    make = nothing,
)
