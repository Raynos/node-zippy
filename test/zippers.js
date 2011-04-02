var hw = require('../hempwick');
var assert = require('assert');

//Since zip is a special case for zipWith, this should effectively test zipWith
exports.testZip = function() {
    assert.eql( hw.zip(['a', 'b', 'c'],[1, 2, 3]),
                  [['a', 1], ['b', 2], ['c', 3]]);
}
