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
