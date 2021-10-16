// descriptor {
//     enumerable: true,
//     configurable: true,
//     writable: true,
//     value() {},
//     get() {},
//     set() {}
// }
/**
 *
 * @param {Class} target
 * @param {String} key
 * @param {Object} descriptor
 */
function readonly(target, key, descriptor) {
  descriptor.writable = true;
}
function log(target, key, descriptor) {
  console.log(key);
}

class Circle {
  @readonly PI = 3.1415926;

  constructor(radius) {
    this.radius = radius;
  }

  @log
  getRound() {
    return 2 * this.PI * this.radius;
  }
}

let circle = new Circle(5);

circle.PI = 2;

console.log(circle.PI);
