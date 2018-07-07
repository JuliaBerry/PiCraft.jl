# Import/Export .schematic Files

mutable struct schematic
    Length::Integer
    Width::Integer
    Height::Integer
    BlockID
    BlockData
    schematic(;Length = -1, Width = -1, Height = -1, BlockID = [-1], BlockData = [-1]) = new(Length, Width, Height, BlockID, BlockData)
end

function parseNBT(istream::IO, ostream::IO = DevNull, model = schematic(), tagDepth = 0, tagType = -1, readName = true)
    tagString = ""
    if tagType <= 0
        tagType = read(istream, UInt8)
    end
    if tagType == 0
        return (tagDepth - 1, model)
    end
    if readName
        tagStringLength = bswap(read(istream, UInt16))
        for i in 1:tagStringLength
            c = Char.(read(istream, UInt8))
            tagString *= c
        end
    end
    if tagType == 1 # TAG_Byte
        num = read(istream, Int8)
        write(ostream, ("\t"^tagDepth)*"TAG_Byte : "*tagString*" = "string(num)*"\n")
    elseif tagType == 2 # TAG_Short
        num = bswap(read(istream, Int16))
        if tagString == "Length"
            model.Length = num
        elseif tagString == "Width"
            model.Width = num
        elseif tagString == "Height"
            model.Height = num
        end
        write(ostream, ("\t"^tagDepth)*"TAG_Short : "*tagString*" = "string(num)*"\n")
    elseif tagType == 3 # TAG_Int
        num = bswap(read(istream, Int32))
        write(ostream, ("\t"^tagDepth)*"TAG_Int : "*tagString*" = "string(num)*"\n")
    elseif tagType == 4 # TAG_Long
        num = bswap(read(istream, Int64))
        write(ostream, ("\t"^tagDepth)*"TAG_Long : "*tagString*" = "string(num)*"\n")
    elseif tagType == 5 # TAG_Float
        num = bswap(read(istream, Float32))
        write(ostream, ("\t"^tagDepth)*"TAG_Float : "*tagString*" = "string(num)*"\n")
    elseif tagType == 6 # TAG_Double
        num = bswap(read(istream, Float64))
        write(ostream, ("\t"^tagDepth)*"TAG_Double : "*tagString*" = "string(num)*"\n")
    elseif tagType == 7 # TAG_Byte_Array
        length = bswap(read(istream, Int32))
        arr = [read(istream, Int8) for i in 1:length]
        if tagString == "Data"
            model.BlockData = arr
        elseif tagString == "Blocks"
            model.BlockID = arr
        end
        write(ostream, ("\t"^tagDepth)*"TAG_Byte_Array : "*tagString*" = "string(dec.(arr))*"\n")
    elseif tagType == 8 # TAG_String
        length = bswap(read(istream, UInt16))
        tagStringName = "\""
        for i in 1:length
            tagStringName *= Char(read(istream, UInt8))
        end
        tagStringName *= "\""
        write(ostream, ("\t"^tagDepth)*"TAG_String : "*tagString*" = "*tagStringName*"\n")
    elseif tagType == 9 # TAG_List
        tagType2 = read(istream, UInt8)
        write(ostream, ("\t"^tagDepth)*"List : "*string(tagType2)*"\n")
        tags = bswap(read(istream, Int32))
        tagDepth += 1
        for i in 1:tags
            model = parseNBT(istream, ostream, model, tagDepth + 1, tagType2, false)[2]
        end
        tagDepth -= 1
    elseif tagType == 10 # TAG_Compound
        write(ostream, ("\t"^tagDepth)*"TAG_Compound : "*tagString*"\n")
        r = parseNBT(istream, ostream, model, tagDepth + 1)
        while r[1] != tagDepth
            model = r[2]
            r = parseNBT(istream, ostream, model, tagDepth + 1)
        end
        model = r[2]
    elseif tagType == 11 # TAG_Int_Array
        length = bswap(read(istream, Int32))
        arr = [read(istream, Int32) for i in 1:length]
        write(ostream, ("\t"^tagDepth)*"TAG_Int_Array : "*tagString*" = "string(dec.(arr))*"\n")
    elseif tagType == 12 # TAG_Long_Array
        length = bswap(read(istream, Int32))
        arr = [read(istream, Int64) for i in 1:length]
        write(ostream, ("\t"^tagDepth)*"TAG_Long_Array : "*tagString*" = "string(dec.(arr))*"\n")
    end
    return (tagDepth, model)
end

"""
    importSchematic(istream::IO, p::Tuple{Real, Real, Real} = getPos())

Imports model and constructs from a `.schematic` file.
"""
function importSchematic(istream::IO, p::Tuple{Real, Real, Real} = getPos())
    m = parseNBT(istream)[2]
    for Y in 0:(m.height - 1)
        for X in 0:(m.width - 1)
            for Z in 0:(m.length - 1)
                setBlock(p .+ (X, Y, Z), Block(m.BlockID[(Y*m.Length + Z)*m.Width + X], m.Data[(Y*m.Length + Z)*m.Width + X]))
            end
        end
    end
end
