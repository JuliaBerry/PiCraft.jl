using PiCraft, Test

@testset "NBT/schematic File reading" begin
    @test parseNBT("../example/hello_world.nbt", devnull) == 0
    @test parseNBT("../example/bigtest.nbt", devnull) == 0
    m = Array{Block, 3}(undef, 3, 2, 4)
    m[:, :, 1] = Block.([41 0; 41 0; 41 0])
    m[:, :, 4] = m[:, :, 3] = m[:, :, 2] = m[:, :, 1]
    m[3, 2, 3] = m[3, 2, 4] = Block(57)
    @test importSchematic("../example/sample.schematic") == m
end
