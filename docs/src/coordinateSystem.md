# 3-D coordinate system

A 3-D coordinate system is used to describe the Minecraft world. Throughout this
package we describe a set of coordinates using a **Tuple** of numbers, for example
(3.5, 19, 7) describes a position in the Minecraft World. The 2nd attribute of
the tuple describes the y-axis or height. When in game it is convenient to
find the player coordinates by opening the debug menu using `f3`.

Here, are a few commands associated with positions.

1. `getPos()`: Returns the tuple containg the player's coordinates
2. `setPos(x, y, z)`: Teleport the player to the coordinates (x, y, z)
  For example, `setPos(getPos() .+ (0, 10, 0))` moves the player up by 10 units.
3. `getBlock(pos::Tuple{Real, Real, Real})`: Returns the block information
4. `setBlock(pos::Tuple{Real, Real, Real}, block::Block)`: Place `block` at `pos`.

More information on blocks and the `Block` type will be provided in the next section.

### Arrays and Tuples

`Array` and `Tuple` are the simplest containers. An array is an **ordered** collection
of elements often used to store lists, tables, vectors and matrices. A tuple is
also an ordered collection but of **immutable** elements. **Immutable** means that
once a tuple is created it cannot be altered. Tuples are generally used for small
fixed length collections.

Both are 1-indexed meaning that the first element is accessed by `a[1]` where
`a` is the container. Many if not most programming languages use 0 based indexing
but trying to access the 0th element of a container will result in an error in Julia.

Refer to the [Introducing Julia](https://en.wikibooks.org/wiki/Introducing_Julia)
wikibook's Arrays and Tuples page [here](https://en.wikibooks.org/wiki/Introducing_Julia/Arrays_and_tuples)
for more information.
