var assert = require('assert');
var hw = require('./hempwick')

exports.testCut = function () {
    var A = [[1,2,3],
             [4,5,6],
             [7,8,9]];

    //This basically defines the API
    assert.eql( hw.cut(A, 2, 1), 7 );
    assert.eql( hw.cut(A, 2), [7,8,9] );
    //{} is used as the lone ":" is in other similar schemes.
    //Instead of a range shorthand, use hw.range(), at least for now.
    assert.eql( hw.cut(A, {},1), [2,5,8] );
    assert.eql( hw.cut(A, [0,2]), [[1,2,3], [7,8,9]] );

    //Tests negative numbers
    assert.eql( hw.cut(A[0], -1), 2 ); 
}
