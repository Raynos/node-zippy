# CODENAME: HEMPWICK

Hempwick is the array library to go with your [hashish](https://github.com/substack/node-hashish). Eventually.

Truth be told, I just don't like requiring underscore when the only thing I use from it is the zip function. While I'm at it, I plan on making some more useful tidbits for array manipulation action.

Hempwick is in its infancy. In fact, you may call it a fetus. But, it's coming
along, and it will eventually be pretty rad. Eventually.

# Functions:

## zip(xs, ys, ...)

Returns a list with elements (x_i, y_i, ...). For example:

    > hw.zip([1, 2, 3], [1, 4, 9])
    [[1, 1], [2, 4], [3, 9]]

`zip` may take more than two arguments.

## zipWith(fxn, xs, ys, ...)

`zipWith` is a more general form of `zip`, which takes a function that "does
something" with each set of x_i, y_i. In fact, `zip` is implemented with
`zipWith`! For an example:

    > hw.zipWith(function(x,y) {return x+y;}, [1, 2, 3], [3, 2, 1])
    [4, 4, 4]

## chunk(n, xs)

`chunk` returns an array of arrays, where the ith sub-array contains elements
ni, ni+1, ... n(i+1)-1. For example:

    > hw.chunk(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

In a sense, it's the opposite of a `flatten`, which will likely be implemented
at a later date.

## range([start], stop, [every])

Acts like the range operator from many languages, but was specifically inspired
by python. Examples:

    > hw.range(5)
    [ 0, 1, 2, 3, 4 ]

    > hw.range(2,5)
    [ 2, 3, 4 ]

    > hw.range(0,10,2)
    [ 0, 2, 4, 6, 8 ]

## iterate(iterfxn, stopfxn, x0)

Iterate returns a list, where the ith value of the list is the ith iteration
of a process defined by iterfxn. The list is built until the stopfxn is
satisfied. Example:

    > hw.iterate(function(x) { return x/2; }, function(x) { return x < 0.001}, 1)
    [ 1,
      0.5,
      0.25,
      0.125,
      0.0625,
      0.03125,
      0.015625,
      0.0078125,
      0.00390625,
      0.001953125,
      0.0009765625 ]

Note that the last value is the first generated value to satisfy the stop
condition, and **not** the last value that didn't satisfy the stop condition. This
may change in the future.

While `iterate` is inspired by Haskell, notice that the API for this function
*is* different. This is necessary, as Haskell can rock infinite, lazy lists. A
node-lazy compatible version of this function may be developed in the future
that has no stop condition.


# Things Done Later:

As I mentioned, Hempwick is still in its fetal stages. We're not sure if it's a
boy or girl yet (figuratively)! What this means is that there are a number of
directions it could go, and the author is unsure as to which directions would be
best. However, here are some ideas for future functionality:

## `linspace`, `logspace`

These would behave like their MATLAB counterparts.


## "fancy indexing"

For nested arrays, this would allow for indexing "by columns", as well as
grabbing particular coordinates. Were this to be implemented, it would likely
be fairly similar to the indexing API of
[numpy's Arrays](http://docs.scipy.org/doc/numpy-1.5.x/reference/arrays.indexing.html).
However, the author isn't sure how well this sort of functionality would jibe
with the 1D-oriented functions used in most of Hempwick so far. So, the jury is
still out, so to speak.

## node-lazy integration

Given that the author learns how to use node-lazy, he will likely implement lazy
versions of many of the list generating tools.

## Hashish-esque Chainable API

Hempwick, despite being inspired by Hashish, does not currently have a chainable
API, one of Hashish's hallmarks. Chances are that it will eventually have
chainable versions for most of the array manipulation functions (if not all!),
though *unlike* Hashish, Hempwick also has a number of array-*generating*
functions. How these will be used with Hempwick's eventual chainable interface
is unknown.

## Who knows?

Will Hempwick be a blond(e), brunette, or a redhead? Blue, green or brown eyes?
Who knows? The possibilities are **endless**!

# Installation

If you use [npm](http://github.com/isaacs/npm), this should work nicely:

    npm install hempwick

Alternately, hempwick.js is currently self-contained.

# Testing

Hempwick rocks [expresso](http://github.com/visionmedia/expresso).

# Pull requests?

Why yes, I *would* be interested!

# License

MIT.
