/**
 * RECURSION
 *
 * We’ve seen that % (the remainder operator) can be used to
 * test whether a number is even or odd by using % 2 to see
 * whether it’s divisible by two. Here’s another way to define
 * whether a positive whole number is even or odd:
 *  - Zero is even.
 *  - One is odd.
 *
 * For any other number N, its evenness is the same as N - 2.
 * Define a recursive function isEven corresponding to this
 * description. The function should accept a single parameter
 * (a positive, whole number) and return a Boolean.
 *
 */

function isEven(n) {
  if (n < 0) {
    return isEven(n * -1);
  }

  if (n === 0) {
    return true;
  }

  if (n === 1) {
    return false;
  }

  return isEven(n - 2);
}

console.log(`-2 is even: ${isEven(-2)}`);
console.log(`-1 is even: ${isEven(-1)}`);
console.log(`0 is even: ${isEven(0)}`);
console.log(`1 is even: ${isEven(1)}`);
console.log(`2 is even: ${isEven(2)}`);
console.log(`3 is even: ${isEven(3)}`);
console.log(`4 is even: ${isEven(4)}`);
console.log(`233 is even: ${isEven(233)}`);
console.log(`378 is even: ${isEven(378)}`);
