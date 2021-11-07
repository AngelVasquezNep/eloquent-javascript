/**
 * Iterable groups
 *
 * Make the Group class from the previous exercise iterable. Refer to the
 * section about the iterator interface earlier in the chapter if you aren’t
 * clear on the exact form of the interface anymore.
 *
 * If you used an array to represent the group’s members, don’t just return the
 * iterator created by calling the Symbol.iterator method on the array. That
 * would work, but it defeats the purpose of this exercise.
 *
 * It is okay if your iterator behaves strangely when the group is modified
 * during iteration.
 * 
 * for (let value of Group.from(["a", "b", "c"])) {
 *    console.log(value);
 * }
 * 
 * // → a
 * // → b
 * // → c
 *
 */

const Group = require('./groups');

class IterableGroup {
  constructor(group) {
    this.index = 0;
    this.values = Object.keys(group.data);
    this.group = group;
  }

  next() {
    const value = this.values[this.index];

    if (!value) {
      return {
        done: true,
      };
    }

    this.index++;

    return {
      value,
      done: false,
    };
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new IterableGroup(this);
};

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}