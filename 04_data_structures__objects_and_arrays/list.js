/**
 * A LIST
 *
 * Write a function arrayToList that builds up a list structure like the one
 * shown when given [1, 2, 3] as argument. Also write a listToArray function
 * that produces an array from a list. Then add a helper function prepend, which
 * takes an element and a list and creates a new list that adds the element to 
 * the front of the input list, and nth, which takes a list and a number and
 * returns the element at the given position in the list (with zero referring to
 * the first element) or undefined when there is no such element.
 * 
 * List example:
 
    let list = {
      value: 1,
      rest: {
        value: 2,
        rest: {
          value: 3,
          rest: null
        }
      }
    };
 */

function arrayToList(arr) {
  if (arr.length === 0) {
    return null;
  }

  return {
    value: arr[0],
    rest: arrayToList(arr.slice(1)),
  };
}

function listToArray(list, arr = []) {
  if (list === null) {
    return arr;
  }
  return listToArray(list.rest, [...arr, list.value]);
}

function prepend(element, list) {
  return {
    value: element,
    rest: list,
  };
}

function nth(list, index) {
  const arr = listToArray(list);
  return arr[index];
}

console.log(arrayToList([10, 20, 30]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
