var zipped = require("../lib/zippy").zip(['a', 'b', 'c'],[1, 2, 3],['u','v','w']);

[['a', 1, 'u'], ['b', 2, 'v'], ['c', 3, 'w']].forEach( function (row, i) {
    row.forEach( function (elem, j) {
        exports["zipped["+i+","+j+"] == "+elem] = function (test) {
            test.equal(elem, zipped[i][j]);
            test.done();
        }
    });
});
