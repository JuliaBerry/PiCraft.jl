
# PiCraft

## Overview

*Control a Minecraft world from Julia*

Minecraft is one of the most popular video games in existence, with a player base of over 75 million users. While normally a game that is played with regular user controls, the Pi edition introduced a programatic API, that allows external programs to to control the Minecraft world. This api has been ported to the existing Java version of the game as well, using server plugins. Being able to control a physical 3D world from code creates many amazing opportunities for fun and education.

This project provides a library that allows Julia programs to control a Minecraft world.

## Installation

This library requires a working installation of Minecraft on your machine. On the Raspberry Pi, this is the only required dependency. On a PC or Mac, the basic Minecraft install needs to be paired with an unofficial plugin that provides the programmatic API access. 

### Get Minecraft

- The Minecraft: Pi edition is pre-installed on all Rasbian since September 2014. Launch it by navigating to `Menu` *>* `Games` or typing `minecraft-pi` in the terminal. However, if you are running an older version of Raspbian get it [here](https://minecraft.net/en-us/edition/pi/).
- Get the Minecraft: Java edition(MacOS, Linux and Windows) [here](https://minecraft.net/en-us/download/alternative).

### Get RaspberryJuice or RaspberryJamMod (for Minecraft: Java edition)

Officially the ability to communicate with the Minecraft world is only available for the Minecraft: Pi edition. To get this to work on the Java edition we need to install a Mod.

- "RaspberryJamMod" is a Forge Mod, if you wish to use this along with other Forge mods then this is recommended. Installation instructions are available [here](http://www.instructables.com/id/Python-coding-for-Minecraft/).
- "RaspberryJuice" is a Bukkit server plugin, recommended if you wish to work on a Bukkit Minecraft server. Get it [here](https://dev.bukkit.org/projects/raspberryjuice).

There is a disagreement in the coordinates reported by Minecraft's debug mode and the `player.getPos()` command. Enter `/setworldspawn 0 0 0` in the Minecraft console to remove this discrepancy.

### Get Julia

Download the appropriate Julia version for your system from [here](https://julialang.org/downloads/).

### Install the PiCraft packge

```julia
Pkg.clone("https://github.com/JuliaBerry/PiCraft.jl")
```
