class PGroup {
  constructor(initial) {
    this.data = {};

    if (initial) {
      this.data[initial] = initial;
    }
  }

  static from(iterable) {
    const group = new Group();

    for (const element of iterable) {
      group.add(element);
    }

    return group;
  }

  get size() {
    return Object.keys(this.data).length;
  }

  add(value) {
    if (!this.has(value)) {
      const newData = { ...this.data };
      newData[value] = value;
      return PGroup.from(newData);
    }

    return this;
  }

  delete(value) {
    const newData = {};

    if (this.has(value)) {
      Object.keys(this.data).forEach((key) => {
        if (value !== this.data[key]) {
          newData[key] = this.data[key];
        }
      });

      return new PGroup(newData);
    }

    return this;
  }

  has(value) {
    return this.data.hasOwnProperty(value);
  }
}

let a = new PGroup('a');
let ab = a.add('b');
let b = ab.delete('a');

console.log(b.has('b'));
// → true
console.log(a.has('b'));
// → false
console.log(b.has('a'));
// → false
