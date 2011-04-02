exports.zipWith = function () {
    var fxn = Array.prototype.slice.call(arguments);
    var args = fxn.splice(1);
    fxn = fxn[0];

    var width = Math.max.apply(null, args.map(function(xs) {
        return xs.length;
    }));

    console.log(width);
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

exports.zip = exports.zipWith.bind(null, function(a,b) { return [a, b]; });
