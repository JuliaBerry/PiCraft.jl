#Turn blocks to gold by hitting them

clearEvents()
t = now()
post("60 seconds to turn blocks to gold.")
while (now() - t).value/1000 < 60.0
    for hit in pollBlockHits()
        setBlock(hit[1], Block(41))
    end
end
post("Time Over!")
