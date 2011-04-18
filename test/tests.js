var hw = require('../hempwick');
var assert = require('assert');

exports.testChunk = function() {
    assert.eql( hw.chunk(3, [1,2,3,4,5,6,7,8,9,10]),
                [[1,2,3],[4,5,6],[7,8,9],[10]] );
}

exports.testRange = function() {
    assert.eql(hw.range(10), [0,1,2,3,4,5,6,7,8,9]);
    assert.eql(hw.range(3,6), [3,4,5]);
    assert.eql(hw.range(1,10,2), [1,3,5,7,9]);
}

exports.testLinspaceExact = function() {
    assert.eql(hw.linspace(1,5,5), [1,2,3,4,5]);    
}

exports.testLinspaceApprox = function() {
    var wiggle = 0.00001;
    hw.zip(hw.linspace(1,5,4), [1, 2.33333, 3.66667, 5]).forEach( function(tu) {
        assert.ok(tu[1]-wiggle < tu[0] && tu[0] < tu[1] + wiggle);
    });
}

exports.testLogspaceApprox = function() {
    var wiggle = 0.001;
    hw.zip(hw.logspace(1,2,4), [10, 21.544, 46.416, 100]).forEach( function(tu) {
        assert.ok(tu[1]-wiggle < tu[0] && tu[0] < tu[1] + wiggle);
    });
}


exports.testIterate = function() {
    assert.eql(hw.iterate(function(x) { return x+1; }, function(x) {return x >= 10}, 0),
               hw.range(11));
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
