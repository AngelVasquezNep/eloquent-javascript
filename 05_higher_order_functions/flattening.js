/**
 * Use the reduce method in combination with the concat method to “flatten”
 * an array of arrays into a single array that has all the elements of the
 * original arrays.
 *
 * Example:
 *
 * let arrays = [[1, 2, 3], [4, 5], [6]];
 * // → [1, 2, 3, 4, 5, 6]
 *
 */

function flat(arr) {
  return arr.reduce((flattedArr, currentArr) => {
    return flattedArr.concat(currentArr);
  }, []);
}
const arrays = [[1, 2, 3], [4, 5], [6]];

console.log(flat(arrays));
