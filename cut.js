module.exports = function (array, slicage) {
    // API?
    // cut(A, 3, 2 ) --> 3rd row, 2nd column (3rd of first dimension, 2nd of second)
    // cut(A, 3) --> 3rd row
    // cut(A, 3, []) --> Should the empty array represent "yes all of it?" SURE
    // cut(A, [2,4]) --> 2nd and 4th row
}

//Negative indices helper?
function treatNegativeIndices (n, len) {
    return n < 0 ? len + n : n;
}
