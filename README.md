# zippy

zippy is a tiny library that implements the `zip` and the more general `zipWith`. It was factored out of the "hempwick" project, since it's the only part of it I've used regularly and the project was too big for me to maintain.

# Install

    npm install zippy

# Methods:

### zip(xs, ys, ...)

Returns a list with elements (x_i, y_i, ...). For example:

    > zippy.zip([1, 2, 3], [1, 4, 9])
    [[1, 1], [2, 4], [3, 9]]

`zip` may take more than two arguments.

**protip:**

    > var transpose = function(a) { return zippy.zip.apply(null, M); };

### zipWith(fxn, xs, ys, ...)

`zipWith` is a more general form of `zip`, which takes a function that "does
something" with each set of x_i, y_i. In fact, `zip` is implemented with
`zipWith`! For an example:

    > zippy.zipWith(function(x,y) {return x+y;}, [1, 2, 3], [3, 2, 1])
    [4, 4, 4]

# Testing

    npm test

# Pull requests?

Why yes, I *would* be interested!

# License

MIT.
