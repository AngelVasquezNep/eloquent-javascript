/**
 * THE SUM OF A RANGE
 *
 * The introduction of this book alluded to the following as a nice way to
 * compute the sum of a range of numbers:
 *
 * console.log(sum(range(1, 10)));
 *
 * Write a range function that takes two arguments, start and end, and returns
 * an array containing all the numbers from start up to (and including) end.
 *
 * Next, write a sum function that takes an array of numbers and returns the sum
 * of these numbers. Run the example program and see whether it does indeed
 * return 55.
 *
 * As a bonus assignment, modify your range function to take an optional third
 * argument that indicates the “step” value used when building the array. If no
 * step is given, the elements go up by increments of one, corresponding to the
 * old behavior. The function call range(1, 10, 2) should return
 * [1, 3, 5, 7, 9].
 * Make sure it also works with negative step values so that range(5, 2, -1)
 * produces [5, 4, 3, 2].
 */

function range(start, end, step = 1) {
  const result = [];
  const loops = Math.floor(Math.abs((start - end) / step));
  let aux = 0;
  let current = start;

  while (aux <= loops) {
    result.push(current);
    current = current + step;
    aux++;
  }

  return result;
}

function sum(numbers) {
  let result = 0;

  for (let number of numbers) {
    result += Number(number);
  }

  return result;
}

console.log('Range from 1 to 10:', range(1, 10));
console.log('Sum of range from 1 to 10:', sum(range(1, 10)));

console.log("Range from 1 to 10 by 2 step is:", range(1, 10, 2));
console.log("Range from 5 to 2 by -1 step is:", range(5, 2, -1));
