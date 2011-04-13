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

exports.range = function() {
    var from = 0;
    var to = 0;
    var every = 1;
    switch(arguments.length) {
    case 1:
        to = arguments[0];
        break;
    case 3:
        every = arguments[2];
    case 2:
        from = arguments[0];
        to = arguments[1];
        break;
    }
    var output = [];
    for(i=from; i < to; i+=every) {
        output.push(i);
    }
    return output;
}

exports.iterate = function(x0, iterator, stop) {
    var xs = [x0];

    while (!stop(xs[xs.length-1])) {
        xs.push(iterator(xs[xs.length-1]));
    }
    return xs;
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
