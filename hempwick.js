exports.chunk = function (n, xs) {
    function chunk_ (acc, n, xs) {
        if (n > xs.length) {
            return acc.concat([xs]);
        } else {
            var chunk = xs;
            var rest = xs.splice(n);
            return chunk_(acc.concat([chunk]), n, rest);
        }
    }
    return chunk_([], n, xs);
}

//zippers
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
exports.transpose = function (xs) { return exports.zip.apply(null, xs) };
