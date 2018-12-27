# Parse NBT files and import/export .schematic files
#
# NBT is a file format used by Minecraft to store data.
# https://minecraft.gamepedia.com/NBT_format
# A specification was provided by Notch which can be accessed at archive.org
# http://web.archive.org/web/20110723210920/http://www.minecraft.net/docs/NBT.txt
#
# The format of a Named Tag is :
#     byte tagType
#     TAG_String name
#     [payload]
#
# [payload] depends on the type of Named Tag.
# Name Tags are Named Tags without the name, [payload] is the same
#
# NBT files are mostly GZip Compressed however there are places where unzipped
# files are used.
# We use the GZip.jl Package to read/write GZip streams: https://github.com/JuliaIO/GZip.jl
#
# We don't differentiate between Named and Nameless files. Nameless Tags are
# Named Tags with an empty string as their name.

abstract type NBTag end

struct TAG_End <: NBTag
end

struct TAG_Byte <: NBTag
    named::Bool
    name::String
    payload::Int8
end

struct TAG_Short <: NBTag
    named::Bool
    name::String
    payload::Int16
end

struct TAG_Int <: NBTag
    named::Bool
    name::String
    payload::Int32
end

struct TAG_Long <: NBTag
    named::Bool
    name::String
    payload::Int64
end

struct TAG_Float <: NBTag
    named::Bool
    name::String
    payload::Float32
end

struct TAG_Double <: NBTag
    named::Bool
    name::String
    payload::Float64
end

struct TAG_Byte_Array <: NBTag
    named::Bool
    name::String
    payload::Array{UInt8, 1}
end

struct TAG_String <: NBTag
    named::Bool
    name::String
    payload::String
end

struct TAG_List <: NBTag
    named::Bool
    name::String
    payload::Array{T, 1} where T <: NBTag
end

struct TAG_Compound <: NBTag
    named::Bool
    name::String
    payload::Array{NBTag, 1}
end

struct TAG_Int_Array <: NBTag
    named::Bool
    name::String
    payload::Array{Int32, 1}
end

struct TAG_Long_Array <: NBTag
    named::Bool
    name::String
    payload::Array{Int64, 1}
end

tagDict = Dict(0 => TAG_End, 1 => TAG_Byte, 2 => TAG_Short, 3 => TAG_Int, 4 => TAG_Long,
               5 => TAG_Float, 6 => TAG_Double, 7 => TAG_Byte_Array, 8 => TAG_String,
               9 => TAG_List, 10 => TAG_Compound, 11 => TAG_Int_Array, 12 => TAG_Long_Array)

tagKeyDict = Dict(TAG_End => 0, TAG_Byte => 1, TAG_Short => 2, TAG_Int => 3, TAG_Long => 4,
                  TAG_Float => 5, TAG_Double => 6, TAG_Byte_Array => 7, TAG_String => 8,
                  TAG_List => 9, TAG_Compound => 10, TAG_Int_Array => 11, TAG_Long_Array => 12)
"""
    readTag(stream::IO, tagId = -1)

Read a single Binary Tag from `stream`. `tagId` is the type of nameless Tag
`tagId` is `-1` for Named Binary Tag.
"""
function readTAG(stream::IO, tagId = -1)
    named = tagId == -1 ? true : false
    if named
        tagId = read(stream, UInt8)
    end
    if !(tagId in 0:12)
        error("Unknown TagType")
    end

    if tagId == 0
        return TAG_End()
    end

    name = ""
    if named
        nameLength = bswap(read(stream, UInt16))
        for i in 1:nameLength
            name *= string(Char(read(stream, UInt8)))
        end
    end
    if tagId in 1:6    # Signed Values (Byte, Short, Float...)
        payload = bswap(read(stream, fieldtype(tagDict[tagId], :payload)))
    elseif tagId in [7, 11, 12] # Arrays (Byte, Int, Long)
        length = bswap(read(stream, Int32))
        payload = fieldtype(tagDict[tagId], :payload)()
        for i in 1:length
            push!(payload, bswap(read(stream, eltype(fieldtype(tagDict[tagId], :payload)))))
        end
    elseif tagId == 8 # String
        length = bswap(read(stream, UInt16))
        payload = ""
        for i in 1:length
            payload *= string(Char(read(stream, UInt8)))
        end
    elseif tagId == 9 # List
        listTagId = read(stream, UInt8)
        if !(listTagId in 0:12)
            error("Unknown tagId.")
        end
        tags = bswap(read(stream, UInt32))
        payload = Array{tagDict[listTagId], 1}(undef, tags)
        for i in 1:tags
            payload[i] = readTAG(stream, listTagId)
        end
    elseif tagId == 10 # TAG_Compound
        payload = Array{NBTag, 1}()
        tag = readTAG(stream, -1)
        while typeof(tag) != TAG_End
            push!(payload, tag)
            tag = readTAG(stream, -1)
        end
    end
    return tagDict[tagId](named, name, payload)
end

function writeTAG(stream::IO, tag::NBTag)
    tagId = tagKeyDict[typeof(tag)]
    if tagId == 0 # TAG_End
        write(stream, UInt8(0))
        return
    end
    if tag.named
       write(stream, UInt8(tagId))
       write(stream, bswap(UInt16(length(tag.name))))
       for i in 1:length(tag.name)
           write(stream, UInt8(tag.name[i]))
       end
    end
    if tagId in 1:6
        write(stream, bswap(tag.payload))
    elseif tagId in [7, 11, 12]
        write(stream, bswap(Int32(length(tag.payload))))
        for i in 1:length(tag.payload)
            write(stream, bswap(tag.payload[i]))
        end
    elseif tagId == 8
        write(stream, bswap(UInt16(length(tag.payload))))
        write(stream, UInt8.([tag.payload...]))
    elseif tagId == 9 # List
        write(stream, UInt8(tagKeyDict[eltype(tag.payload)]))
        write(stream, bswap(Int32(length(tag.payload))))
        for i in 1:length(tag.payload)
            writeTAG(stream, tag.payload[i])
        end
    elseif tagId == 10
        for i in 1:length(tag.payload)
            writeTAG(stream, tag.payload[i])
        end
        writeTAG(stream, TAG_End())
    end
end

function printTAG(tag::NBTag, stream::IO = STDOUT, tabDepth = 0)
    if typeof(tag) in  [TAG_Byte, TAG_Short, TAG_Int, TAG_Long, TAG_Float, TAG_Double, TAG_String]
        println(stream, "\t"^tabDepth, typeof(tag), " : ", "\""*tag.name*"\"", " = ", tag.payload)
    elseif typeof(tag) == TAG_List
        println(stream, "\t"^tabDepth, "TAG_List : ", eltype(tag.payload), " : ", "\""*tag.name*"\"", "(", length(tag.payload), " entries)")
        for t in tag.payload
            printTAG(t, stream, tabDepth + 1)
        end
    elseif typeof(tag) == TAG_Compound
        println(stream, "\t"^tabDepth, "TAG_Compound : ","\""*tag.name*"\"", " , (", length(tag.payload), " entries)")
        for t in tag.payload
            printTAG(t, stream, tabDepth + 1)
        end
    else
        println(stream, "\t"^tabDepth, typeof(tag),"\""*tag.name*"\" = ", tag.payload)
    end
end

"""
    parseNBT(filename::AbstractString, ostream::IO = stdout)

Parse a Named Binary tag file.
"""
function parseNBT(filename::AbstractString, ostream::IO = stdout)
istream = open(filename)
t = read(istream, UInt16)
close(istream)
if t == 0x8b1f #Starting bytes of a GZip file, note the endian
    istream = GZip.open(filename)
else
    istream = open(filename)
end

while !(eof(istream))
    printTAG(readTAG(istream), ostream, 0)
end
close(istream)
return 0
end

"""
    importSchematic(filename::AbstractString)

Reads a `.schematic` file and return a 3 - D matrix of type `Array{Block, 3}`(model)
which represents the schematic.

"""
function importSchematic(filename::AbstractString)
    istream = open(filename)
    t = read(istream, UInt16)
    close(istream)
    if t == 0x8b1f
        istream = GZip.open(filename)
    else
        istream = open(filename)
    end
    schematic = readTAG(istream)
    if schematic.name != "Schematic"
        @error("$istream is not a Schematic file. Is it GZip compressed ?")
    end

    Height, Length, Width = 0, 0, 0
    BlockData = []
    BlockIds = []

    for tag in schematic.payload
        if tag.name == "Height"
            Height = tag.payload
        elseif tag.name == "Length"
            Length = tag.payload
        elseif tag.name == "Width"
            Width = tag.payload
        elseif tag.name == "Blocks" && typeof(tag) == TAG_Byte_Array
            BlockIds = tag.payload
        elseif tag.name == "Data" && typeof(tag) == TAG_Byte_Array
            BlockData = tag.payload
        end
    end

    # Check for corruption
    if Height  < 1 || Width < 1 || Length < 1
        @error("Illegal model dimensions. Cannot be imported.")
    elseif length(BlockIds) != length(BlockData)
        @error("Illegal model. Cannot be imported.")
    end

    # Coordinates in schematics range from (0,0,0) to (Width-1, Height-1, Length-1).
    # Blocks are sorted by Height then Length and then Width
    model = Array{Block, 3}(undef, Int.((Width, Height, Length)))

    for Y in 1:Height
        for X in 1:Width
            for Z in 1:Length
                i = ((Y - 1)*Length + (Z - 1))*Width + X
                model[X, Y, Z] = Block(BlockIds[i], BlockData[i])
            end
        end
    end

    return model
end

function exportSchematic(m::Array{Block, 3}, filename::AbstractString)
    stream = GZip.open(filename, "w")
    (Width, Height, Length) = size(m)
    dataArr = Array{UInt8, 1}(undef, Width*Length*Height)
    idArr = Array{UInt8, 1}(undef, Width*Length*Height)
    for Y in 1:Height
        for X in 1:Width
            for Z in 1:Length
                i = ((Y - 1)*Length + (Z - 1))*Width + X
                idArr[i], dataArr[i] = m[X, Y, Z].id, m[X, Y, Z].data
            end
        end
    end
    final = Array{NBTag, 1}(undef, 8)
    final[1] = TAG_Short(true, "Width", Width)
    final[2] = TAG_Short(true, "Height", Height)
    final[3] = TAG_Short(true, "Length", Length)
    final[4] = TAG_String(true, "Materials", "Alpha")
    final[5] = TAG_Byte_Array(true, "Blocks", idArr)
    final[6] = TAG_Byte_Array(true, "Data", dataArr)
    final[7] = TAG_List(true, "Entities", Array{TAG_Compound, 1}())
    final[8] = TAG_List(true, "TileEntities", Array{TAG_Compound, 1}())
    writeTAG(stream, TAG_Compound(true, "Schematic", final))
    close(stream)
    return
end
