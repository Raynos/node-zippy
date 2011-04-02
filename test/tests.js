var hw = require('../hempwick');
var assert = require('assert');

exports.testChunk = function() {
    assert.eql( hw.chunk(3, [1,2,3,4,5,6,7,8,9,10]),
                [[1,2,3],[4,5,6],[7,8,9],[10]] );
}


// ZIPPERS // 

//Since zip is a special case for zipWith, this should effectively test zipWith
exports.testZip = function() {
    assert.eql( hw.zip(['a', 'b', 'c'],[1, 2, 3],['u','v','w']),
                  [['a', 1, 'u'], ['b', 2, 'v'], ['c', 3, 'w']]);
}

exports.testTranspose = function() {
    assert.eql( hw.transpose([[1,2,3], [4,5,6], [7,8,9]]),
                [[1,4,7],[2,5,8],[3,6,9]]);
}
