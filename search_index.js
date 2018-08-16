var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#PiCraft-1",
    "page": "Home",
    "title": "PiCraft",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#Overview-1",
    "page": "Home",
    "title": "Overview",
    "category": "section",
    "text": "Control a Minecraft world from Julia(Image: PiCraft.png)PiCraft is a Julia package which utilizes the Minecraft: Pi edition programming API to control the Minecraft World. The package can be used with Minecraft: Java Edition with the help of RaspberryJamMod & RaspberryJuice plugin.With this package you will be able to :Write scripts to teleport and walk over Water and Lava.\nConstruct multi-storey skyscrapers within seconds.\nDraw fractals and shapes using a 3-D turtle.\nImport and export .schematic models without external software.  "
},

{
    "location": "index.html#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "This library requires a working installation of Minecraft on your machine. On the Raspberry Pi, this is the only required dependency. On a PC or Mac, the basic Minecraft install needs to be paired with an unofficial plugin that provides the programmatic API access."
},

{
    "location": "index.html#Get-Minecraft-1",
    "page": "Home",
    "title": "Get Minecraft",
    "category": "section",
    "text": "The Minecraft: Pi edition is pre-installed on all Rasbian since September 2014. Launch it by navigating to Menu > Games or typing minecraft-pi in the terminal. However, if you are running an older version of Raspbian get it here.\nGet the Minecraft: Java edition(MacOS, Linux and Windows) here."
},

{
    "location": "index.html#Get-RaspberryJuice-or-RaspberryJamMod-(for-Minecraft:-Java-edition)-1",
    "page": "Home",
    "title": "Get RaspberryJuice or RaspberryJamMod (for Minecraft: Java edition)",
    "category": "section",
    "text": "Officially the ability to communicate with the Minecraft world is only available for the Minecraft: Pi edition. To get this to work on the Java edition we need to install a Mod.\"RaspberryJamMod\" is a Forge Mod, if you wish to use this along with other Forge mods then this is recommended. Installation instructions are available here.\n\"RaspberryJuice\" is a Bukkit server plugin, recommended if you wish to work on a Bukkit Minecraft server. Get it here.There is a disagreement in the coordinates reported by Minecraft\'s debug mode and the getPos() command. Enter /setworldspawn 0 0 0 in the Minecraft console to remove this discrepancy."
},

{
    "location": "index.html#Get-Julia-1",
    "page": "Home",
    "title": "Get Julia",
    "category": "section",
    "text": "Download the appropriate Julia version for your system from here."
},

{
    "location": "index.html#Install-the-PiCraft-packge-1",
    "page": "Home",
    "title": "Install the PiCraft packge",
    "category": "section",
    "text": "Pkg.clone(\"https://github.com/JuliaBerry/PiCraft.jl\")"
},

{
    "location": "quick.html#",
    "page": "Quick Start",
    "title": "Quick Start",
    "category": "page",
    "text": "Load the PiCraft package on the Julia console:using PiCraftOn load, the library will attempt to connect to a running Minecraft world on localhost. If Minecraft is not running, an error message will be printed. Subsequently, once Minecraft has been started,  a connection can be forced by calling connectToWorld()You can save and restore your progress using the commands:Save: save()\nLoad last savepoint: restore()A 3-D coordinate system is used to describe the Minecraft world. Throughout this package we describe a set of coordinates using a Tuple of numbers, for example (3.5, 19, 7) describes a position in the Minecraft World. The 2nd attribute of the Tuple describes the y-axis or height. When in game it is convenient to find the player coordinates by opening the debug menu.(Image: )"
},

{
    "location": "quick.html#Player-1",
    "page": "Quick Start",
    "title": "Player",
    "category": "section",
    "text": "You can find and set your player\'s location:Find Player position: getPos()\nReturns a Tuple{Float64, Float64, Float64} which contains the player\'s current coordinates.\nSet Player position: setPos(pos::Tuple{Float64, Float64, Float64})\nTeleports the player to the specified coordinates."
},

{
    "location": "quick.html#Blocks-1",
    "page": "Quick Start",
    "title": "Blocks",
    "category": "section",
    "text": "Blocks are the heart of Minecraft. The package provides the ability to modify blocks at specified coordinates. Block is an immutable datatype defined in src/blocks.jl.immutable Block\n    id::Int\n    data::Int\nendThe id defines the type of block (like cobblestone, wool, wood,.etc) and the data attribute defines additional characteristics of the block, on default every block has it data set to 0. For example, Wool\'s block id is 35, Block(35,0) refers to a block of white wool. Different wool colors can be accessed by changing the data attribute. Red Wool is Block(35, 14), Pink Wool is Block(35,6) and so on. A complete reference can be found in the documentation.Place Block: setBlock(Tuple{Int,Int,Int}, block::Block)\nPlace the specified Block at the specified coordinates.\nPlace Blocks: setBlocks(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block)\nSet an entire region to the specified block type defined by the corners p1 and p2.\nGet Block information: getBlock(Tuple{Int,Int,Int})\nReturns the block present at the specified coordinates.While the getBlock and setBlock functions will accept Float64 as arguments but these will be rounded to Int as a block cannot be placed on non-integer coordinates."
},

{
    "location": "quick.html#Models-1",
    "page": "Quick Start",
    "title": "Models",
    "category": "section",
    "text": "A model is a 3-D Array of Blocks. Whenever we refer to a model we more specifically mean Array{Block, 3}. Storing a model can be convenient way to write scripts. For example if we have a streetlight stored as a model we can easily write a script to copy and paste at equal intervals on a street. There are model manipulation functions available such as:Copy Model: copyModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real})\nCopy the Blocks between the diagonally opposite blocks and store in a 3-D Block Array.\nCut Model: cutModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block)\nCopy blocks between diagonally opposite blocks and fill the space with block.\nFlip Model: flip(A::Array{Block, 3}, dim::Symbol)\nFlip a Block Array in a particular dimension. Dimensions are x, y and z\nRotate Model"
},

{
    "location": "example/safeFeet.html#",
    "page": "Safe Feet",
    "title": "Safe Feet",
    "category": "page",
    "text": "EditURL = \"https://github.com/TRAVIS_REPO_SLUG/blob/master/\""
},

{
    "location": "example/safeFeet.html#Safe-Feet-1",
    "page": "Safe Feet",
    "title": "Safe Feet",
    "category": "section",
    "text": "Walk over water and air by replacing it with Dimaond Blocks Usage:using PiCraft\n\nfunction safeFeet()\n   b = getTile() .+ (0, -1, 0)    #Get the Block coordinates on which the player is standing\n   if getBlock(b) ∈  [PiCraft.AIR, PiCraft.WATER_STATIONARY, PiCraft.WATER_FLOWING, PiCraft.LAVA, PiCraft.LAVA_STATIONARY] #Check if the block is\n       setBlock(b, PiCraft.DIAMOND_BLOCK)\n   end\n   sleep(0.05) #Pause as to not spam the API, results in a smoother experience\nendRun this function in a loop, and press Ctrl-C to stop   t = now()\n   while (now() - t).value/1000 < time_period\n      safeFeet()\n   end"
},

{
    "location": "example/safeFeet.html#Challenge:-1",
    "page": "Safe Feet",
    "title": "Challenge:",
    "category": "section",
    "text": "Use a queue to remove blocks such that the maximum bridge length is 10.\nYour script should automatically remove blocks which had too far behind.\nEnter \"\\py bridge\" for a demonstrationThis page was generated using Literate.jl."
},

{
    "location": "example/turnToGold.html#",
    "page": "Turn to Gold",
    "title": "Turn to Gold",
    "category": "page",
    "text": "EditURL = \"https://github.com/TRAVIS_REPO_SLUG/blob/master/\""
},

{
    "location": "example/turnToGold.html#Turn-to-Gold-1",
    "page": "Turn to Gold",
    "title": "Turn to Gold",
    "category": "section",
    "text": ""
},

{
    "location": "example/turnToGold.html#Turn-blocks-to-gold-by-hitting-them-1",
    "page": "Turn to Gold",
    "title": "Turn blocks to gold by hitting them",
    "category": "section",
    "text": "Demonstration of pollBlockHits() the function pollBlockHits() returns an Array of hit Events A hit event is a tuple, say ((5, 4, 5), 2, 17) (5, 4, 5) are the coordinates to the block which was hit 2 is the face of the block which was hit 17 is the entityId of the Entity which was responsible for the hitusing Dates\nusing PiCraft\n\nclearEvents() # Clear all previous events\nt = now() # Mark the current time\n\npost(\"60 seconds to turn blocks to gold.\")\n\nwhile (now() - t).value/1000 < 60.0 # Continue the loop if 60 seconds has not elapsed\n    for hit in pollBlockHits()\n        setBlock(hit[1], Block(41)) # hit[1] are the coordinates to the Block which was hit\n    end\nendPost a message to screen when donepost(\"Time Over!\")This page was generated using Literate.jl."
},

{
    "location": "example/turtle.html#",
    "page": "Turtle",
    "title": "Turtle",
    "category": "page",
    "text": "EditURL = \"https://github.com/TRAVIS_REPO_SLUG/blob/master/\""
},

{
    "location": "example/turtle.html#Turtle-Programming-1",
    "page": "Turtle",
    "title": "Turtle Programming",
    "category": "section",
    "text": ""
},

{
    "location": "example/turtle.html#Introduction-1",
    "page": "Turtle",
    "title": "Introduction",
    "category": "section",
    "text": "In this tutorial we will have a look at Turtle Programming. In 1967 a general purpose programming language called LOGO was created. The main highlight of this language was turtle graphics. In turtle graphics we have a robot with a pen which draws on a canvas. We can control this turtle using a few commands. The main commands are :forward : move the turtle forward\nturn : turn the turtle\npenUp/penDown : activate/deactivate the turtle\'s penTo get a brief understanding of how this works head over here.While Turtle programming generally refers to a 2-D turtle we have a 3-D version available. In the 3-D version we have three types of turn available for each of the dimensions of the turtle.pitch\nyaw\nrollLet\'s first start with only operating on a 2-D plane and later we will discuss 3-D.You need to clear up space for experimentation. Use setBlocks() with PiCraft.AIR to clear up space. If you are on the Java edition then it is suggested that you use New World -> Creative -> World Type: Superflat -> Customize -> Presets -> The Void -> Create New World Then we can setup a canvas for drawing as follows:p = getPos()\nsetBlocks(p .+ (-50, 0, -50), p .+ (50, 0, 50), Block(35, 15))(Image: canvasSetup.png)To initialize the turtle:t = turtle(pos = p)Since we are only concerned with the 2 dimensions of the plane we only need a single turn function which will be yawturn = yaw\n\nmove(t, 10)\nturn(t, 45) # Note that the angle is in degrees, use `deg2rad(θ)` to convert from radians.\nmove(t, 10)\nt.penBlock = PiCraft.IRON_BLOCK # Change penBlock\nmove(t, 10)\nturn(t, 45)\nmove(t, 10)\nt.penDown = false\nturn(t, 90)\nmove(t, 10)\nt.penDown = true\nmove(t, 10)(Image: draw1.png) To reset the canvas and the turtle it can be convenient to define a functionfunction clrscr(t, p)\n    setBlocks(p .+ (-50, 0, -50), p .+ (50, 0, 50), Block(35, 15))\n    t.pos = p\nend\nclrscr(t, p)Draw a squaremove(t, 10)\nyaw(t, 90)\nmove(t, 10)\nyaw(t, 90)\nmove(t, 10)\nyaw(t, 90)\nmove(t, 10)(Image: square.png)We can also use a \'for loop\' for the sameclrscr(t, p)\nfor i in 1:4\n    move(t, 10)\n    yaw(t, 90)\nendSimilarly, we can draw a triangleDraw a triangleclrscr(t, p)\nfor i in 1:3\n    move(t, 10)\n    turn(t, 120)\nendChallenge: Figure out how to draw a general polygon using a loopSolution:function drawPolygon(t::turtle, n::Integer, l::Real)\n    θ = 180 - 360/n\n    for i in 1:n\n        move(t, l)\n        yaw(t, θ)\n    end\nend\n\nclrscr(t, p)Starfor i in 1:5\n    move(t, 50)\n    turn(t, 144)\nend(Image: star.png)We can also make spirals.Spiralclrscr(t, p)\nfor i in 1:10\n    move(t, 5*i)\n    turn(t, 90)\nend(Image: spiral1.png)clrscr(t, p)\nfor i in 1:10\n    move(t, 5 + 5*i)\n    turn(t, 120)\nend(Image: spiral2.png)"
},

{
    "location": "example/turtle.html#D-turtle-1",
    "page": "Turtle",
    "title": "3-D turtle",
    "category": "section",
    "text": "As mentioned earlier instedad of a single turn command we have 3 commands, namely yaw, pitch and roll.(Image: Roll_Pitch_Yaw.JPG) In essence we have 3 mutually perpendicular axis on the turtle.Longitudinal(turtle.direction, points forward) : Roll Axis\nLateral : Pitch Axis\nVertical(turtle.normal, points downwards) : Yaw AxisTo get the positive rotation direction use the corkscrew rule. (Image: corkscrew rule image)Curl your right hand\'s fingers with the thumb pointing outwards like in a thumbs up position. When your thumb points in the axis vector then the curl direction is the positive rotation direction.We dont need a canvas to experiment with the 3-D turtle. Reset the world as required.move(t, 10)\npitch(t, 45)\nmove(t, 10)\npitch(t, -45)\nyaw(t, 90)\nmove(t, 10)\nroll(t, 90)\npitch(t, 90)\nmove(t, 10)(Image: draw2.png)We can use the same concepts of the 2-D turtle to draw in 3-D.Square inclined at 45 degreest = turtle(pos = getPos())\npitch(t, 45)\nfor i in 1:4\n    move(t, 10)\n    yaw(t, 90)\nend(Image: squareInclined.png)Springt = turtle(pos = getPos())\nR = 20\nC = 2*pi*R\nfor i in 1:720\n    move(t, C/90)\n    yaw(t, 7)\n    pitch(t, 5)\nendThis page was generated using Literate.jl."
},

{
    "location": "example/skyscraperBasic.html#",
    "page": "Sky Scraper",
    "title": "Sky Scraper",
    "category": "page",
    "text": "EditURL = \"https://github.com/TRAVIS_REPO_SLUG/blob/master/\""
},

{
    "location": "example/skyscraperBasic.html#Construct-a-skyscraper-1",
    "page": "Sky Scraper",
    "title": "Construct a skyscraper",
    "category": "section",
    "text": "using PiCraftWith the help of programming we can build entire cities with ease. Writing a program to build structures is a great way to minimize repetitive work while experimenting with different parameters. If you are making a small house odds are that writing a program is inefficient and manually building it will get the job done much faster. However, if you are trying to build a skyscraper which spawns 20 stories high then manually it could take several hours depending on your speed but it will definitely be very boring. Writing code to do the same will take a dozen minutes with the added advantage that making changes will be extremely easy.To get there first we will start small. In this tutorial we will learn how to build a simple skyscraper.Our first task is to decide the dimensions and the parameters. Then think of a strategy/algorithm which will do the construction."
},

{
    "location": "example/skyscraperBasic.html#makeSkyscraper()-1",
    "page": "Sky Scraper",
    "title": "makeSkyscraper()",
    "category": "section",
    "text": "Decide the location for the building   p = getTile()\nDecide the dimensions and parameters for the building\nfloors = 5\nlength = 10\nwidth = 15\nheight = 6\nWrite the pseudo-code/algorithm   Pseudo-code means to write informal code rather than actual code which a human can understand. It can be helpful in designing algorithms this way.\n  x = start_position\n  for i in 1:floors\n      buildFloor(x)\n      increment x\'s height by floor\'s height\n  end\n  Build a ceiling for the top floor\n\n  Now to build a floor\n     1) Make all the walls out of glass panes\n     2) Set the bottom level as the flooring block. (Cobblestone for instance)\n     3) Add pillars to the cornersLet\'s first define a few basic parameters for our buildingp = getTile()\nfloors = 5length will be in the +ve x direction and width in the +ve z directionlen = 10\nwidth = 15\nheight = 6We\'re first going to write code to construct a single floor relative to a point Then we will use a loop to create a skyscraper pseudocode:    x = start_position    for i in 1:floors        buildFloor(x)        increase x\'s height by floor\'s height    end    Build a ceiling for the top floorNow to build a floorMake all the walls out of glass panes\nSet the bottom level as floor\nGet Pillars on the cornersfunction buildFloor(p)\n    #Set all walls to glass panes\n    setBlocks(p .+ (1, 0, 1), p .+ (1, height, width), PiCraft.GLASS_PANE)\n    setBlocks(p .+ (1, 0, 1), p .+ (len, height, 1), PiCraft.GLASS_PANE)\n    setBlocks(p .+ (1, height, width), p .+(len, 0, width), PiCraft.GLASS_PANE)\n    setBlocks(p .+ (len, height, width), p .+ (len, 0, 1), PiCraft.GLASS_PANE)\n\n    #Set entire floor to Stone Brick\n    setBlocks(p .+ (1, 0, 1), p .+ (len, 0, width), PiCraft.STONE_BRICK)\n\n    #Set 4 Pillars to the corners\n    setBlocks(p .+ (1, 0, 1), p .+ (1, height, 1), PiCraft.STONE_BRICK)\n    setBlocks(p .+ (1, 0, width), p .+ (1, height, width), PiCraft.STONE_BRICK)\n    setBlocks(p .+ (len, 0, 1), p .+ (len, height, 1), PiCraft.STONE_BRICK)\n    setBlocks(p .+ (len, 0 , width), p .+ (len, height, width), PiCraft.STONE_BRICK)\nend\n\nfunction makeSkyscraper()\n    for i in 1:floors\n        buildFloor(p .+ (0, height*i - height, 0))\n    end\n    setBlocks(p .+ (1, height*floors, 1), p .+ (len, height*floors, width), PiCraft.IRON_BLOCK) # Set Roof to Iron Block\nendExecuting makeSkyscraper() once will construct a building in front of you. Try experimenting around with different dimensions.(Image: makeSkyscraper.gif)(Image: makeSkyscraper.png)"
},

{
    "location": "example/skyscraperBasic.html#makeSkyscraper2()-1",
    "page": "Sky Scraper",
    "title": "makeSkyscraper2()",
    "category": "section",
    "text": "This building serves as a demonstration of how we can break down a construction task. When programming we will generally have a choice of algorithms/strategies to choose among. In our next example we will choose a different algorithm.Decide the location, parameters and dimensions like last time.\np = getTile()\nfloors = 5\nlength = 10\nwidth = 15\nheight = 6\nPseudocode\nPlace a cuboid of blocks on the building space\nHollow out the inside\nFor each floor\nAdd flooring\nAdd windowsThis building isn\'t particularly nice and has too much glass. Let\'s have another go. When we use programming to solve a problem there can be multiple solutions to the same problem.This time let\'s make the building first and then add windows laterfunction makeSkyscraper2()Make a filled cuboid of Blocks filling the entire building space    setBlocks(p .+ (1, 0, 1), p .+ (len, height*floors + 1, width),Block(251, 0))Hollow out the inside of the building    setBlocks(p .+ (2, 1, 2), p .+ (len - 1, height*floors, width - 1), PiCraft.AIR)Add wooden flooring    for i in 0:floors\n        setBlocks(p .+ (2, height*i, 2), p .+ (len - 1, height*i, width - 1), PiCraft.WOOD_PLANKS)\n    endAdd window Panes, careful if you change the given building dimensions, the change in coordinates may result in unintended consequences.    for i in 0:(floors - 1)\n        setBlocks(p .+ (1, height*i + 2, floor.((width + 1)/2 - 2)),\n        p .+ (1, height*i + 4, floor.((width + 1)/2 + 2)), PiCraft.GLASS_PANE)\n        setBlocks(p .+ (1, height*i + 2, floor.((width + 1)/2 - 2)),\n        p .+ (1, height*i + 4, floor.((width + 1)/2 + 2)), PiCraft.GLASS_PANE)\n    end\nend(Image: makeSkyscraper2.png)To get better at building you should practice and try new structures and dimensions. Make your building beautiful by experimenting with a variety of different colored blocks and parameters. You can find a list of challenges below.In our second iteration we made the building better, the code is easier to follow through and is less in comparison. Now, experiment with writing your own code architecturing your own designs. Check out the challenges listed below Challenges :Make the building well lit with torches\nAdd a balcony to each floor.\nA common ladder access for all floors.\nAdd randomness to your design Hint: for all blocks in building if block is cobblestone and rand() < 0.1 set block to Mossy Cobblestone\nTry constructing a building with the \"setback\" design in mind. Given below is a documentary on how the setback principle came about.(Image: How New York got its Skyline)This page was generated using Literate.jl."
},

{
    "location": "example/GameOfLife.html#",
    "page": "Game Of Life",
    "title": "Game Of Life",
    "category": "page",
    "text": "EditURL = \"https://github.com/TRAVIS_REPO_SLUG/blob/master/\""
},

{
    "location": "example/GameOfLife.html#Cellular-Automaton-1",
    "page": "Game Of Life",
    "title": "Cellular Automaton",
    "category": "section",
    "text": ""
},

{
    "location": "example/GameOfLife.html#Abstract-1",
    "page": "Game Of Life",
    "title": "Abstract",
    "category": "section",
    "text": "We have an arrangement of atoms/cells. Each cell belongs to one in a finite set of states. With the progression of a unit time cells change their state in a parallel fashion determined by the rules of the system.Depending on the initial state and thr rules of the system we get a variety of behaviours. Some systems lead to homogenous states, some exhibit periodic oscillations between states, some are chaotic non-deterministic behaviours, ,.etc . The study of these discrete and abstract computational systems is called cellular automaton. (Image: https://plato.stanford.edu/entries/cellular-automata/) is a great resource to understand and explore these systems."
},

{
    "location": "example/GameOfLife.html#Game-of-Life-1",
    "page": "Game Of Life",
    "title": "Game of Life",
    "category": "section",
    "text": "Game of Life is a popular cellular automaton devised by British mathematician John Conway. It consists of a two dimensional grid of cells with a start state with each cell being either dead or live at any point in time.The rules of the system are as follows :-A cell with less than two neighbours dies due to underpopulation.\nA cell with two or three neighbours lives.\nA cell with greater than three neighbours dies by overpopulation.\nA dead cell with three live neighbours becomes live.We will implement this game of life in minecraft to generate some interesting patterns.using PiCraftFirst let\'s write our function which will transform from one state to another.function nextState(A::Array{Bool, 2})\n    B = similar(A)\n    dims = size(A)\n    for i = 1:dims[1], j = 1:dims[2]\n        liveNeighbours = 0\n        for p = -1:1, q = -1:1\n            if checkbounds(Bool, A, i + p, j + q) && (p == 0 && q == 0)\n                liveNeighbours += 1\n            end\n        end\n        if A[i, j] == false && liveNeighbours == 3\n            B[i, j] = true\n        elseif liveNeighbours < 2 || liveNeighbours > 3\n            B[i, j] = false\n        end\n    end\n    return B\nendNow to render an arbitrary 2-D board in Minecraft Let live cells be white wool and dead be black woolfunction displayState(p::Tuple{Int, Int, Int}, A::Array{Bool, 2})\n    dims = size(A)\n    for i = 1:dims[1], j = 1:dims[2]\n        if A[i, j]\n            setBlock(p .+ (i, j, 0), Block(35))\n        else\n            setBlock(p .+ (i, j, 0), Block(35, 15))\n        end\n    end\nend\n\np = getTile() .+ (3, 4, 3)\nA = rand(Bool, 10, 10)\n\nfor i = 1:20\n    displayState(A)\n    A = nextState(A)\n    sleep(0.5)\nendA variety of interesting patterns can be found (Image: here) It is encouraged that you experiment with various patterns."
},

{
    "location": "example/GameOfLife.html#D-implementation-1",
    "page": "Game Of Life",
    "title": "3-D implementation",
    "category": "section",
    "text": "If we want to consider a 3-D implementation of the Game of Life then we must realise that in 3-D a cell will have 26 Neighbours (3^3 - 1).We generally express a 3-D system as a Life wxyz system. The rules of such a system are :The number of live neighbours must be between w and x to sustain life.\nThe number of live neighbours must be between y and z to bring a dead back to life.Conway\'s Game of Life is hence a Life 2333 system. Since a large number of combinations are possible they have been studied extensively for their properties. Most systems quickly collapse or explode. Life 4555 and 5766 are the only valid systems which exhibit life like properties.Let\'s implement Life 4555. For that we will rewrite the nextState and displayState funcitons.function nextState(A::Array{Bool, 3})\n    B = similar(A)\n    dims = size(A)\n    for i = 1:dims[1], j = 1:dims[2], k = 1:dims[3]\n        liveNeighbours = 0\n        for p = -1:1, q = -1:1, r = -1:1\n            if checkbounds(Bool, A, i + p, j + q, k + r) && (p == 0 && q == 0 && r == 0)\n                liveNeighbours += 1\n            end\n        end\n        if A[i, j, k] == false && liveNeighbours == 5\n            B[i, j, k] = true\n        elseif liveNeighbours < 4 || liveNeighbours > 5\n            B[i, j, k] = false\n        end\n    end\n    return B\nend\n\nfunction displayState(p::Tuple{Int, Int, Int}, A::Array{Bool, 3})\n    dims = size(A)\n    for i = 1:dims[1], j = 1:dims[2], k = 1:dims[3]\n        if A[i, j, k]\n            setBlock(p .+ (i, j, k), Block(35))\n        else\n            setBlock(p .+ (i, j, k), Block(35, 15))\n        end\n    end\nend\n\np = getTile() .+ (3, 4, 3)\nA = rand(Bool, 7, 7, 7)\n\nfor i = 1:20\n    displayState(A)\n    A = nextState(A)\n    sleep(0.5)\nendThis page was generated using Literate.jl."
},

{
    "location": "example/platform9_75.html#",
    "page": "Platform 9¾",
    "title": "Platform 9¾",
    "category": "page",
    "text": "EditURL = \"https://github.com/TRAVIS_REPO_SLUG/blob/master/\""
},

{
    "location": "example/platform9_75.html#Platform-9-1",
    "page": "Platform 9¾",
    "title": "Platform 9¾",
    "category": "section",
    "text": "In this example we will explore Platform 9 and three quarters of King\'s cross station, LondonAt the beginning of an academic year of Hogwarts School of Witchcraft and Wizardry a large number of students choose to travel using the Hogwards Express. The train departs from platform 9 and three quarters, King\'s Cross Station, London. To reach this platform wizards and witches must run into an arch between the platforms 9 and 10 to be teleported the 9¾ platform. However due a certain number of mishaps/accidents over the years the Ministry of Magic has made new rules.Only those heading into the wall at a predetermined speed of 4.3 m/s may be teleported. Too slow and the wizrd might be folling around and too fast might result in a minor injury or worse... Being spotted by a muggle which the ministry will then have obliviate. PS : The ministry has now enforced the metric system for all official work. Hence the speed is mentioned in meters per second.using PiCraftFirst let us make the platforms (Muggle and Wizard world) Let\'s first make the muggle platform (9 & 10) and then place a platform perpendicular to that beneathp = getTile()\nsetBlocks(p .+ (1, 0, 1), p .+ (12, 1, 40), Block(43, 5)) # Make a cobblestone platform\nsetBlocks(p .+ (5, 2, 1), p .+ (8, 12, 40), Block(45))    # For Brick archesNow we want to make arches in the brick column. For now semi-circular arches will do The equation for a general circle is x^2 + y^2 = r^2 where r is the radius So in general if we have a point: (a, b, c) and we wish to make a circle around it we might do something like this:- (Say in the x-y plane)for x = -r:sign(r):r, y = -r:sign(r):r\n    if x^2 + y^2 <= r^2\n        setBlock(p .+ (x, y, 0), Block(1,0))\n    end\nendHowever, since we have to make a semicircle we should only iterate y from 0 to rr = 9\nc1 = p .+ (5, 2, 11) # Center for 1st arch\nfor y = 0:r, z = -r:r\n    if y^2 + z^2 < r^2\n        setBlocks(c1 .+ (0, y, z), c1 .+ (3, y, z), Block(0))\n    end\nend\n\nc2 = p .+ (5, 2, 40 - 10)\nfor y = 0:r, z = -r:r\n    if y^2 + z^2 < r^2\n        setBlocks(c2 .+ (0, y, z), c2 .+ (3, y, z), Block(0))\n    end\nend(Image: Platform.gif)Now we must now choose a reasonable condition to teleport One way can be: If player velocity in z direction and position is encosed within x: p[1] + 5:8 , y: p[2] + 2, z: 20.3 then teleport to desired location.Now how do we calculate velocity ? Velocity is the rate at which an object\'s position changes w.r.t time. We can compute velocity as follows:p1 = getPos()\nsleep(0.05)\np2 = getPos()\nvel = (p2 - p1)./0.05 # velocity = distance/timeThis gives us the velocity component of each direction. To get the true instantaneous velocity we have to take the norm of this. v = norm([velocity...]) # We effectively does v = sqrt(vel_x^2 + vel_y^2 + vel_z^2) However we only care about a wizard\'s z-component of velocity which will be vel[3]function getVel()\n    p1 = getPos()\n    sleep(0.05)\n    vel = getPos() .- p1\n    return vel[3]/0.05\nend\n\nt = time()\nwhile time() - t < 10\n    post(\"Velocity = \"*string.(getVel())*\" m/s\")\nend(Image: getVel.png)Since platform 9¾ remains closed for most of the year we can add a time constraint to automatically close it.t = time()\npost(\"Platform 9¾ open!\")\nwhile time() - t < 30 # Platform closes in 30 seconds\n    v = getVel()\n    pos = getPos()\n    if v >= 4.20 && v <= 4.32\n        if pos[1] < p[1] + 9 && pos[1] > p[1] + 4 && pos[2] == p[2] + 2 && pos[3] > p[3] + 19.3\n            setPos(p)\n        end\n    end\nend\npost(\"Platform 9¾ closed!\")Now, We wish to make an identical copy of this planform.m = copyModel(p .+ (1, 0, 1), p .+ (12, 12, 40))\nbuildModel(rotate(m, dir = :l, dim = :y), p .+ (1, 15, 1))This built a copy of the platform which is perpendicular and above it. Place the new plaform anywhere you desire. Then set p to the coordinates of the arch.This page was generated using Literate.jl."
},

{
    "location": "blocks.html#",
    "page": "Block Reference",
    "title": "Block Reference",
    "category": "page",
    "text": ""
},

{
    "location": "blocks.html#Block-Reference-1",
    "page": "Block Reference",
    "title": "Block Reference",
    "category": "section",
    "text": "Id Name Subtype Image Data\n0 Air   0\n1 Stone  (Image: mc-block) 0\n2 Grass  (Image: mc-block) 0\n3 Dirt  (Image: mc-block) 0\n4 Cobblestone  (Image: mc-block) 0\n5 Wood Plank Oak (Image: mc-block) 1\n  Spruce (Image: mc-block) 2\n  Birch (Image: mc-block) 3\n  Jungle (Image: mc-block) 4\n6 Sapling Oak (Image: mc-block) 0\n Sapling Spruce (Image: mc-block) 1\n Sapling Birch (Image: mc-block) 2\n Sapling Jungle (Image: mc-block) 3\n7 Bedrock  (Image: mc-block) 0\n8 Water(Flowing)   0\n9 Water(Stationary) High (Image: mc-block) 0\n Water(Stationary) Low  7\n10 Lava(Flowing)   0\n11 Lava(Stationary) High (Image: mc-block) 0\n11 Lava(Stationary) Low  7\n12 Sand  (Image: mc-block) 0\n13 Gravel  (Image: mc-block) 0\n14 Gold Ore  (Image: mc-block) 0\n15 Iron Ore  (Image: mc-block) 0\n16 Coal Ore  (Image: mc-block) 0\n17 Wood Oak(up/down) (Image: mc-block) 0\n  Spruce(up/down) (Image: mc-block) 1\n  Birch(up/down) (Image: mc-block) 2\n  Jungle(up/down) (Image: mc-block) 3\n  Oak(east/west)  4\n  Spruce(east/west)  5\n  Birch(east/west)  6\n  Jungle(east/west)  7\n  Oak(north/south)  8\n  Spruce(north/south)  9\n  Birch(north/south)  10\n  Jungle(north/south)  11\n  Oak(only bark) (Image: mc-block) 12\n  Spruce(only bark) (Image: mc-block) 13\n  Birch(only bark) (Image: mc-block) 14\n  Jungle(only bark) (Image: mc-block) 15\n18 Leaves Oak (Image: mc-block) 1\n  Spruce (Image: mc-block) 2\n  Birch (Image: mc-block) 3\n19 Glass  (Image: mc-block) 0\n21 Lapis Lazuli Ore  (Image: mc-block) 0\n22 Lapis Lazuli Block  (Image: mc-block) 0\n24 Sandstone Ordinary (Image: mc-block) 0\n  Chiselled (Image: mc-block) 1\n  Smooth (Image: mc-block) 2\n26 Bed  (Image: mc-block) 0\n30 Cobweb  (Image: mc-block) 0\n31 Grass(tall) Shrub (Image: mc-block) 0\n  Grass (Image: mc-block) 1\n  Fern (Image: mc-block) 2\n  Grass(color by biome)  3\n35 Wool White (Image: mc-block) 0\n  Orange (Image: mc-block) 1\n  Magenta (Image: mc-block) 2\n  Light Blue (Image: mc-block) 3\n  Yellow (Image: mc-block) 4\n  Lime (Image: mc-block) 5\n  Pink (Image: mc-block) 6\n  Grey (Image: mc-block) 7\n  Light Grey (Image: mc-block) 8\n  Cyan (Image: mc-block) 9\n  Purple (Image: mc-block) 10\n  Blue (Image: mc-block) 11\n  Brown (Image: mc-block) 12\n  Green (Image: mc-block) 13\n  Red (Image: mc-block) 14\n  Black (Image: mc-block) 15\n37 Yellow Flower(dandelion)  (Image: mc-block) 0\n38 Cyan Flower  (Image: mc-block) 0\n39 Brown Mushroom  (Image: mc-block) 0\n40 Red Mushroom  (Image: mc-block) 0\n41 Gold Block  (Image: mc-block) 0\n42 Iron Block  (Image: mc-block) 0\n43 Double Slab Stone (Image: mc-block) 0\n  Sandstone (Image: mc-block) 1\n  Wooden (Image: mc-block) 2\n  Cobblestone (Image: mc-block) 3\n  Brick (Image: mc-block) 4\n  Stone Brick (Image: mc-block) 5\n  Nether Brick (Image: mc-block) 6\n  Quartz (Image: mc-block) 7\n44 Single Slab Stone (Image: mc-block) 0\n  Sandstone (Image: mc-block) 1\n  Wooden (Image: mc-block) 2\n  Cobblestone (Image: mc-block) 3\n  Brick (Image: mc-block) 4\n  Stone Brick (Image: mc-block) 5\n  Nether Brick (Image: mc-block) 6\n  Quartz (Image: mc-block) 7\n45 Brick Block  (Image: mc-block) 0\n46 TNT Inactive (Image: mc-block) 0\n  Ready to explode (Image: mc-block) 1\n47 Bookshelf  (Image: mc-block) 0\n48 Moss Stone  (Image: mc-block) 0\n49 Obsidian  (Image: mc-block) 0\n50 Torch On floor (Image: mc-block) 0\n  Pointing East  1\n  Pointing West  2\n  Pointing South  3\n  Pointing North  4\n51 Fire  (Image: mc-block) 0\n53 Stair Wood Ascending east (Image: mc-block) 0\n  Ascending west  1\n  Ascending south  2\n  Ascending north  3\n  Ascending east(upside down) (Image: mc-block) 4\n  Ascending west(upside down)  5\n  Ascending south(upside down)  6\n  Ascending north(upside down)  7\n54 Chest Facing north (Image: mc-block) 2\n  Facing south  3\n  Facing west  4\n  Facing east  5\n56 Diamond Ore  (Image: mc-block) 0\n57 Diamond Block  (Image: mc-block) 0\n58 Crafting Table  (Image: mc-block) 0\n60 Farmland  (Image: mc-block) 0\n61 Furnace(Inactive) Facing north (Image: mc-block) 2\n  Facing south  3\n  Facing west  4\n  Facing east  5\n62 Furnace(Active) Facing north (Image: mc-block) 2\n  Facing south  3\n  Facing west  4\n  Facing east  5\n64 Wooden Door  (Image: mc-block) 0\n65 Ladder Facing north (Image: mc-block) 2\n  Facing south  3\n  Facing west  4\n  Facing east  5\n67 Cobblestone Stairs Ascending east (Image: mc-block) 0\n  Ascending west  1\n  Ascending south  2\n  Ascending north  3\n  Ascending east(upside down) (Image: mc-block) 4\n  Ascending west(upside down)  5\n  Ascending south(upside down)  6\n  Ascending north(upside down)  7\n71 Iron Door  (Image: mc-block) 0\n73 Redstone Ore  (Image: mc-block) 0\n78 Snow Lowest <img src=\"./assets/BlockImages/Snow.png\" width=\"150\" height=\"78\" /> 0\n  Highest  7\n79 Ice  (Image: mc-block) 0\n80 Snow Block  (Image: mc-block) 0\n81 Cactus  (Image: mc-block) 0\n82 Clay  (Image: mc-block) 0\n83 Sugarcane  (Image: mc-block) 0\n85 Fence  (Image: mc-block) 0\n89 Glowstone  (Image: mc-block) 0\n95 Bedrock(invisible)   0\n98 Stone Brick Normal (Image: mc-block) 0\n  Mossy (Image: mc-block) 1\n  Cracked (Image: mc-block) 2\n  Chiseled (Image: mc-block) 3\n102 Glass Pane  (Image: mc-block) 0\n103 Melon  (Image: mc-block) 0\n107 Fence Gate  (Image: mc-block) 0\n246 Glowing Obsidian  (Image: mc-block) 0\n247 Nether Reactor Unused (Image: mc-block) 0\n  Active (Image: mc-block) 1\n  Stopped/used up (Image: mc-block) 2"
},

{
    "location": "api.html#PiCraft.turtle",
    "page": "API Reference",
    "title": "PiCraft.turtle",
    "category": "type",
    "text": "turtle\n\nA graphics turtle meant to move in all 3-Dimensions. It contains the following fields:\n\npos : The coordinates of the turtle.\ndirection : The Roll Axis - direction in which the turtle is facing.\nnormal : The Yaw axis - direction normal to the turtle\'s body.\npenBlock : The block which will be used to draw.\nstepSize : The size of a turtle\'s step.\npenDown : Activation state of penBlock.\n\nThe default constructor initializes the turtle at the player\'s position,roll axis is the positive x-direction, with the yaw axis pointing downwards. penBlock is gold by default and is activated with the stepSize = 0.5\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.buildModel-Tuple{Array{Block,3},Tuple{Real,Real,Real}}",
    "page": "API Reference",
    "title": "PiCraft.buildModel",
    "category": "method",
    "text": "buildModel(m::Array{Block, 3}, pos::Tuple{Real, Real, Real})\n\nBuild a model from a 3-D block array.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.clearEvents-Tuple{}",
    "page": "API Reference",
    "title": "PiCraft.clearEvents",
    "category": "method",
    "text": "Clear all events in the buffer\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.connectToWorld",
    "page": "API Reference",
    "title": "PiCraft.connectToWorld",
    "category": "function",
    "text": "connectToWorld(address = \"localhost\", port = 4711)\n\nConnect to the Minecraft API.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.copyModel-Tuple{Tuple{Real,Real,Real},Tuple{Real,Real,Real}}",
    "page": "API Reference",
    "title": "PiCraft.copyModel",
    "category": "method",
    "text": "copyModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real})\n\nCopy the Blocks between the diagonally opposite blocks and store in a 3-D Block Array.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.cutModel-Tuple{Tuple{Real,Real,Real},Tuple{Real,Real,Real},Block}",
    "page": "API Reference",
    "title": "PiCraft.cutModel",
    "category": "method",
    "text": "cutModel(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block)\n\nCopy blocks between diagonally opposite blocks and fill the space with block.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.drawLine",
    "page": "API Reference",
    "title": "PiCraft.drawLine",
    "category": "function",
    "text": "drawLine(p1::Tuple{Real,Real,Real}, p2::Tuple{Real,Real,Real}, block::PiCraft.Block = PiCraft.GOLD_BLOCK, width::Real = 1)\n\nDraw a line from point p1 to point p2 using block. block is gold block by default.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.flip-Tuple{Array{Block,3},Symbol}",
    "page": "API Reference",
    "title": "PiCraft.flip",
    "category": "method",
    "text": "flip(A::Array{Block, 3}, dim::Symbol)\n\nFlip a 3-D Block Array in a particular dimension. Dimensions are x, y and z\n\nExample\n\njulia> A = reshape(Block.(collect(1:8)), (2,2,2))\n2×2×2 Array{PiCraft.Block,3}:\n[:, :, 1] =\n PiCraft.Block(1, 0)  PiCraft.Block(3, 0)\n PiCraft.Block(2, 0)  PiCraft.Block(4, 0)\n\n[:, :, 2] =\n PiCraft.Block(5, 0)  PiCraft.Block(7, 0)\n PiCraft.Block(6, 0)  PiCraft.Block(8, 0)\n\njulia> flip(A, :z)\n2×2×2 Array{PiCraft.Block,3}:\n[:, :, 1] =\n PiCraft.Block(5, 0)  PiCraft.Block(7, 0)\n PiCraft.Block(6, 0)  PiCraft.Block(8, 0)\n\n[:, :, 2] =\n PiCraft.Block(1, 0)  PiCraft.Block(3, 0)\n PiCraft.Block(2, 0)  PiCraft.Block(4, 0)\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.getBlock-Tuple{Tuple{Real,Real,Real}}",
    "page": "API Reference",
    "title": "PiCraft.getBlock",
    "category": "method",
    "text": "getBlock(pos::Tuple{Real, Real, Real})\n\nGet the Block information from the specified coordinates.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.getHeight-Tuple{Int64,Int64}",
    "page": "API Reference",
    "title": "PiCraft.getHeight",
    "category": "method",
    "text": "getHeight(x::Int, z::Int)\n\nGet the height of the world at the specified x and z coordinates.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.getPlayerIds-Tuple{}",
    "page": "API Reference",
    "title": "PiCraft.getPlayerIds",
    "category": "method",
    "text": "getPlayerIds()\n\nReturn an array of all Player Id\'s connected to the server.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.getPos-Tuple{Int64}",
    "page": "API Reference",
    "title": "PiCraft.getPos",
    "category": "method",
    "text": "getPos(entityId::Int)\n\nGet the position of the specified entity.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.getPos-Tuple{}",
    "page": "API Reference",
    "title": "PiCraft.getPos",
    "category": "method",
    "text": "getPos()\n\nReturn the player\'s coordinates.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.getTile-Tuple{Int64}",
    "page": "API Reference",
    "title": "PiCraft.getTile",
    "category": "method",
    "text": "getTile(entityId::Int)\n\nGet the tile on which the specified entity is.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.getTile-Tuple{}",
    "page": "API Reference",
    "title": "PiCraft.getTile",
    "category": "method",
    "text": "getTile()\n\nReturn the tile\'s coordinates on which the player is standing.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.importSchematic-Tuple{IO}",
    "page": "API Reference",
    "title": "PiCraft.importSchematic",
    "category": "method",
    "text": "importSchematic(istream::IO)\n\nReads a .schematic file and return a 3 - D matrix of type Array{Block, 3} which represents the schematic.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.mc_send",
    "page": "API Reference",
    "title": "PiCraft.mc_send",
    "category": "function",
    "text": "mc_send(cmd, output=true)\n\nCommunicate with the Minecraft API.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.move-Tuple{turtle,Real}",
    "page": "API Reference",
    "title": "PiCraft.move",
    "category": "method",
    "text": "move(t::turtle, s::Int)\n\nMove the turtle t forward s units.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.pitch-Tuple{turtle,Real}",
    "page": "API Reference",
    "title": "PiCraft.pitch",
    "category": "method",
    "text": "pitch(t::turtle, θ::Real)\n\nPitch the turtle t by θ degrees.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.pollBlockHits-Tuple{}",
    "page": "API Reference",
    "title": "PiCraft.pollBlockHits",
    "category": "method",
    "text": "pollBlockHits()\n\nReturns an array of all the events which have occurred since the last time the function was called. Each event is described with a tuple ((x, y, z), face, entityId). x, y and z are the coordinates of the block. face is the block\'s face number which was hit and entityId identifies the player who hit the block using a sword.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.post-Tuple",
    "page": "API Reference",
    "title": "PiCraft.post",
    "category": "method",
    "text": "post(m...)\n\nPost a message to chat\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.restoreWorld-Tuple{}",
    "page": "API Reference",
    "title": "PiCraft.restoreWorld",
    "category": "method",
    "text": "Restore the world to the previous savepoint.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.roll-Tuple{turtle,Real}",
    "page": "API Reference",
    "title": "PiCraft.roll",
    "category": "method",
    "text": "roll(t::turtle, θ::Real)\n\nRoll the turtle t by θ degrees.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.rotate-Tuple{Array{Block,3},Symbol,Symbol}",
    "page": "API Reference",
    "title": "PiCraft.rotate",
    "category": "method",
    "text": "rotate(A::Array{Block, 3}; dir::Symbol = :l, dim::Symbol = :x)\n\nRotate a 3-D Block Array 90 degrees in a dimension and direction. Dimensions are x, y and z. Directions are l & r.\n\nExample\n\njulia> A = reshape(Block.(collect(1:8)), (2,2,2))\n2×2×2 Array{PiCraft.Block,3}:\n[:, :, 1] =\n PiCraft.Block(1, 0)  PiCraft.Block(3, 0)\n PiCraft.Block(2, 0)  PiCraft.Block(4, 0)\n\n[:, :, 2] =\n PiCraft.Block(5, 0)  PiCraft.Block(7, 0)\n PiCraft.Block(6, 0)  PiCraft.Block(8, 0)\n\njulia> rotate(A, dir = :r, dim = :y)\n 2×2×2 Array{PiCraft.Block,3}:\n [:, :, 1] =\n  PiCraft.Block(3, 0)  PiCraft.Block(7, 0)\n  PiCraft.Block(4, 0)  PiCraft.Block(8, 0)\n\n [:, :, 2] =\n  PiCraft.Block(1, 0)  PiCraft.Block(5, 0)\n  PiCraft.Block(2, 0)  PiCraft.Block(6, 0)\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.saveWorld-Tuple{}",
    "page": "API Reference",
    "title": "PiCraft.saveWorld",
    "category": "method",
    "text": "Save the World\'s progress\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.setBlock-Tuple{Tuple{Real,Real,Real},Block}",
    "page": "API Reference",
    "title": "PiCraft.setBlock",
    "category": "method",
    "text": "setBlock(pos::Tuple{Real, Real, Real}, block::Block)\n\nPlace the specified Block at the given coordinates.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.setBlocks-Tuple{Tuple{Real,Real,Real},Tuple{Real,Real,Real},Block}",
    "page": "API Reference",
    "title": "PiCraft.setBlocks",
    "category": "method",
    "text": "setBlocks(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block)\n\nSet an entire region to the specified block type defined by the corners p1 and p2.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.setPos-Tuple{Int64,Tuple{Real,Real,Real}}",
    "page": "API Reference",
    "title": "PiCraft.setPos",
    "category": "method",
    "text": "setPos(entityId::Int, pos::Tuple{Real, Real, Real})\n\nSet the position of the specified entity.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.setPos-Tuple{Tuple{Real,Real,Real}}",
    "page": "API Reference",
    "title": "PiCraft.setPos",
    "category": "method",
    "text": "setPos(pos::Tuple{Real, Real, Real})\n\nTeleport the player to the specified coordinates\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.setTile-Tuple{Int64,Tuple{Real,Real,Real}}",
    "page": "API Reference",
    "title": "PiCraft.setTile",
    "category": "method",
    "text": "setTile(entityId::Int)\n\nTeleport the entity on the specified tile.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.setTile-Tuple{Tuple{Real,Real,Real}}",
    "page": "API Reference",
    "title": "PiCraft.setTile",
    "category": "method",
    "text": "setTile(pos::Tuple{Real, Real, Real})\n\nTeleport the player on top of the specified tile\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.yaw-Tuple{turtle,Real}",
    "page": "API Reference",
    "title": "PiCraft.yaw",
    "category": "method",
    "text": "yaw(t::turtle, θ::Real)\n\nYaw the turtle t by θ degrees.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.readTAG",
    "page": "API Reference",
    "title": "PiCraft.readTAG",
    "category": "function",
    "text": "readTag(stream::IO, tagId = -1)\n\nRead a single Binary Tag from stream. tagId is the type of nameless Tag tagId is -1 for Named Binary Tag.\n\n\n\n\n\n"
},

{
    "location": "api.html#PiCraft.post-Tuple{string}",
    "page": "API Reference",
    "title": "PiCraft.post",
    "category": "method",
    "text": "post(m...)\n\nPost a message to chat\n\n\n\n\n\n"
},

{
    "location": "api.html#",
    "page": "API Reference",
    "title": "API Reference",
    "category": "page",
    "text": "Modules = [PiCraft]\nOrder   = [:type, :function]getBlock(pos::Tuple{Real, Real, Real})setBlock(pos::Tuple{Real, Real, Real}, block::Block)setBlocks(p1::Tuple{Real, Real, Real}, p2::Tuple{Real, Real, Real}, block::Block)getHeight(x::Int, z::Int)getPlayerIds()setting(name, status)saveWorld()restoreWorld()post(s::string)getTile()setTile(pos::Tuple{Real, Real, Real})getPos()setPos(pos::Tuple{Real, Real, Real})"
},

]}
