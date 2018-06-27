using Documenter, PiCraft

load_dir(x) = map(file -> joinpath("lib", x, file), readdir(joinpath(Base.source_dir(), "src", "lib", x)))

makedocs(
   modules = [PiCraft],
   clean = false,
   format = [:html],#, :latex],
   sitename = "PiCraft",
   pages = Any[
       "Home" => "index.md",
       "Quick Start" => "quick.md",
       "Tutorial" => Any["tutorial/skyscraper.md"]
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
