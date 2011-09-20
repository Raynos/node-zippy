var zippy = require("../lib/zippy"),
    assert = require("assert");

//Since zip is a special case for zipWith, this should effectively test zipWith
exports.testZip = function() {
    assert.eql( zippy.zip(['a', 'b', 'c'],[1, 2, 3],['u','v','w']),
                  [['a', 1, 'u'], ['b', 2, 'v'], ['c', 3, 'w']]);
}
