using Documenter, PiCraft
using Literate

examples = ["safeFeet", "turnToGold", "turtle", "skyscraperBasic", "GameOfLife",
            "platform9_75"]

for eg in examples
    file_path = "../example/" * eg * ".jl"
    out_path = "src/example"
    Literate.markdown(file_path, out_path; documenter=false, execute=false)
end

makedocs(
   modules = [PiCraft],
   format = Documenter.HTML(prettyurls = get(ENV, "CI", nothing) == "true"),
   clean = true,
   sitename = "PiCraft",
   pages = Any[
       "Home" => "index.md",
       "Quick Start" => Any[
            "Installation" => "installation.md",
            "Connecting" => "connecting.md",
            "Coordinate System" => "coordinateSystem.md",
            "Blocks and Models" => "blocksAndModels.md",
            "Events, Entities and Camera" => "eventsEntitiesCamera.md"
       ],
       "Examples" => Any[
            "Safe Feet" => "example/safeFeet.md",
            "Turn to Gold" => "example/turnToGold.md",
            "Turtle" => "example/turtle.md",
            "Sky Scraper" => "example/skyscraperBasic.md",
            "Game Of Life" => "example/GameOfLife.md",
            "Platform 9¾" => "example/platform9_75.md",
            "Whac-a-Block" => "whacABlock.md"
       ],
       "Block Reference" => "blocks.md",
       "API Reference" => "api.md"
   ]
)

deploydocs(
    repo = "github.com/aviks/PiCraft.jl.git",
    target = "build",
    deps = nothing,
    make = nothing,
)
