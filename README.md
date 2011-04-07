# CODENAME: HEMPWICK

The array library to go with your [hashish](https://github.com/substack/node-hashish). Eventually.

Truth be told, I just don't like requiring underscore when the only thing I use from it is the zip function. While I'm at it, I plan on making some more useful tidbits for array manipulation action.

## Right Away:

* `zip` (zipWith with function(a,b) { return [a, b]; })
* `zipWith`
* `chunk` (chunk(n, [1 .. 9]) -> [[1, 2, 3], [4, 5, 6], [7, 8, 9]] )
* `range` action

## Later, Potentially:

* `linspace`, `logspace`
* `iterate`
* "fancy indexing" (think numpy.array)
* node-lazy integration
* Array().method action for a cleaner and more Hashish-ish API
* Who knows?
