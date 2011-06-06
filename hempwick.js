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

exports.linspace = function(a,b,n) {
    var every = (b-a)/(n-1);
    var ranged = exports.range(a,b,every);
    return ranged.length == n ? ranged : ranged.concat(b);

}

exports.logspace = function(a,b,n) {
    return exports.linspace(a,b,n).map(function(x) { return Math.pow(10,x); });
}

// Cool ideas:
// 1) Allow for an object {iterator: f, stop: g, x0: a}
// 2) Lazy version
exports.iterate = function(iterator, stop, x0) {
    var xs = [x0];

    while (!stop(xs[xs.length-1])) {
        xs.push(iterator(xs[xs.length-1]));
    }
    return xs;
}
