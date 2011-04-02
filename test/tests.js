var hw = require('../hempwick');
var assert = require('assert');

//Since zip is a special case for zipWith, this should effectively test zipWith
exports.testZip = function() {
    assert.eql( hw.zip(['a', 'b', 'c'],[1, 2, 3]),
                  [['a', 1], ['b', 2], ['c', 3]]);
}

exports.testChunk = function() {
    assert.eql( hw.chunk(3, [1,2,3,4,5,6,7,8,9,10]),
                [[1,2,3],[4,5,6],[7,8,9],[10]] );
}
