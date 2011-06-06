// Functions shamelessly lifted and adapted from Haskell's Data.List.
// Refer to:
//     http://hackage.haskell.org/packages/archive/base/latest/doc/html/Data-List.html
// 

// # "Basic Functions"

exports.head = head = function (xs) {
    return xs[0];
}

exports.last = last = function (xs) {
    return xs[xs.length-1];
}

exports.tail = tail = function (xs) {
    return xs.slice(1);
}

exports.init = init = function (xs) {
    return xs.slice(0,xs.length-1);
}

// Not implemented: null, length.


// # "List Transformations"

exports.reverse = reverse = function (xs) {
     return xs.slice().reverse();
}

exports.transpose = transpose = function (xs) {
    return exports.zip.apply(null, xs);
}

// `subsequences` looks handy but difficult to implement.
// This is the code as implemented in Haskell:
//
//     nonEmptySubsequences []      =  []
//     nonEmptySubsequences (x:xs)  =  [x] : foldr f [] (nonEmptySubsequences xs)
//       where f ys r = ys : (x : ys) : r
//
// I took a one-off crack at it, which of course doesn't work :/

//Important bug stems from xs.concat(y) vs. xs.concat([y])
function nonEmptySubsequences (xs) {
    if (xs.length == 0) {
        return [];
    } else {
        var x = head(xs);
        console.log(xs);
        var xs = tail(xs);
        console.log(xs);
        function f (ys, r) {
            return ys.concat([x].concat(ys)).concat(r);
        }
        return [x].concat(nonEmptySubsequences(xs).reduce(f,[]));
    }
}

exports.subsequences = subsequences = function (xs) {
    throw new Error("`subsequences` not properly implemented!");
    return [].concat(nonEmptySubsequences(xs));
}

// Similar situation to the `subsequences` function, except that I haven't
// tried to write it yet!
exports.permutations = permutations = function (xs) {
    throw new Error("`permutations` not properly implemented!");
}

// Not implemented: map, intersperse, intercalate


// # "folds"

exports.sum = sum = function (xs) {
    return xs.reduce(function(x, acc) { return x + acc; });
}

exports.product = product = function (xs) {
    return xs.reduce(function(x, acc) { return x * acc; });
}

exports.maximum = maximum = function (xs) {
    return Math.max.apply(this, xs);
}

exports.minimum = minimum = function (xs) {
    return Math.min.apply(this, xs);
}

// Not implemented: foldl, foldl', foldl1, foldl1', foldr, foldr', foldr1, foldr1, concat, concatMap, and, or, any, all


// # "Scans"

// A good candidate for a wrapper to match xs.reduce() styles.
// Arguments in the haskell order atm.
// This is roughly equivalent to scanl'.
// Also, since reduce is in native code, scan is likely *much* slower.
// ex: scan(function(a,b) {return a+b}, 0, [1,2,3]);
exports.scan = scan = function (fxn, acc0, xs) {
    var res = [acc0];
    xs.forEach(function(x) {
        res.push(fxn( last(res), x ));
    });
    return res;
}

//Not implemented: scan1r, scanl, scan1l


// # "Accumulating Maps"
// These are supposed to do a map and a reduce in the same step.
// `mapAccum` is a crack at translating mapAccumL, which may not work right
// since I've never used it in Haskell. :/
// Could end up being useful, though! Depending.

exports.mapAccum = mapAccum = function (fxn, acc0, xs) {
    var acc = acc0;
    var transformed = xs.map(function(x) {
        //returns [x', acc']
        var intermediate = fxn(x,acc);
        acc = intermediate[1];
        return intermediate[0];
    });
}

//Not implemented: mapAccumR


// # "Infinite Lists"
// Note that these require lazy lists. These functions would need to use, say,
// node-lazy.

//Not implemented: iterate, repeat, replicate, cycle.


// # "Unfolding"
// Should be a spiritual port of "unfoldr." Note that while Haskell uses
// `maybe`, I just return null if need be.
// ex:
//    unfold(function (b) {
//        if (b == 0) {
//            return null;
//        } else {
//            return [b, b-1];
//        }
//    }, 10);
//
// returns
// [10,9,8,7,6,5,4,3,2,1]

exports.unfold = unfold = function (fxn, acc) {
    return _unfold(fxn, acc, []);
    function _unfold (fxn, acc, xs) {
        var res = fxn(acc);
        if (res === null) {
            return xs;
        } else {  
            return _unfold(fxn, res[1], xs.concat([res[0]]))
        }
    }
}


// # "Sublists"
// Some of Haskell's make the most sense for laziness, and hence are
// unimplemented

//Predicates
exports.isPrefixOf = isPrefixOf = function (pre, xs) {
    for(var i = 0; (xs[i] == pre[i]) || (i > pre.length); i++);
    return (i === pre.length);
}

exports.isSuffixOf = isSuffixOf = function (suf, xs) {
    return isPrefixOf(reverse(suf), reverse(xs));
}

exports.isInfixOf = isInfixOf = function (inf, xs) {
    var isInfix = false;
    for (var i = 0; i < (xs.length - inf.length); i++) {
        if ( isPrefixOf(inf, xs.slice(i)) ) {
            isInfix = true;           
        }
    }
    isInfix = isInfix || isSuffixOf(inf,xs);
    return isInfix;
}

//Not-so-predicates

exports.takeWhile = takeWhile = function (pred, xs) {
    //incr's i until predicate not met.
    for(var i = 0; pred(xs[i]) || i > xs.length; i++);
    return xs.slice(0,i);
}

exports.dropWhile = dropWhile = function (pred, xs) {
    //Very similar to takeWhile. Last line is diff. tho!
    for(var i=0; pred(xs[i]) || i > xs.length; i++);
    return xs.slice(i);
}

//Note: break is a reserved keyword, so use !pred instead
exports.span = span = function (pred, xs) {
    var left = xs;
    for(var i=0; pred(xs[i]); i++);
    var right = left.splice(i);
    return [left, right];
}

exports.stripPrefix = stripPrefix = function (pre, xs) {
    //See isPrefixOf.
    return isPrefixOf(pre,xs) ? xs.slice(pre.length) : null;
}

//Works on lists and not strings. May be worth "baking in" string support.
//Alternately, write a separate set for string manips.
exports.group = group = function (xs) {
    var res = [[xs[0]]];
    var j = 0;

    xs.slice(1).forEach(function(x,i) {
        if (x !== last(res[j]) ) {
            j++;
            res[j] = [];
        }
        res[j].push(x);
    });

    return res;
}

exports.inits = inits = function (xs) {
    var res = [];
    xs.forEach(function(x,i) {
        res.push(xs.slice(0,i));
    });
    res.push(xs);
    return res;
}

exports.tails = tails = function (xs) {
    var res = [];
    xs.forEach(function(x,i) {
        res.push(xs.slice(i));
    });
    res.push([]);
    return res;
}

// Not implemented: take, drop, splitAt, break


// # "Searching lists"

exports.find = find = function (pred, xs) {
    for(var i = 0; pred(xs[i]) || i > xs.length; i++);
    return i >= xs.length ? null : xs[i];
}

// Not implemented: elem, notElem, lookup, filter


// # "Indexing lists"
//I need to think about what the idiomatic was of doing this are.
//TODO: Examine: elemIndex, elemIndices, findIndex, findIndices
//Not implemented: "!!"


// # "Zipping and Unzipping Lists"
// Because js is dynamic and doesn't rock tuples, these zippers work with n
// chars iirc, and also acts as an unzip.

exports.zipWith = function () {
    var fxn = Array.prototype.slice.call(arguments);
    var args = fxn.splice(1);
    fxn = fxn[0];

    var width = Math.max.apply(null, args.map(function(xs) {
        return xs.length;
    }));

    var output = [];
    //potentially a better way to do this?
    for (i=0; i<width; i++) {
        var thisOne = 
            fxn.apply(null, args.map(function(xs) {
                return xs[i];
            }));
        output.push(thisOne);
    }
    return output;
}

exports.zip = exports.zipWith.bind(null, function() {
    return Array.prototype.slice.call(arguments); 
});


// # "Special Lists"
// ## "string functions" (strings aren't [Char] so...)
// ## "set operations"
// ## "ordered lists"


// # "Generalized functions"
