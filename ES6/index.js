class Father {
  constructor(name) {
    this.fatherName = name;
  }

  fatherPropertyA() {}

  static fatherStaticProperty() {}
}

class Child extends Father {
  constructor(name) {
    super(name);
    this.childName = name;
  }
}

// 实例化
let father = new Father("老爸");
let child = new Child("孩子");

console.log(father);
console.log(child);

console.log(child instanceof Father);

console.log(father.fatherPropertyA); // [Function: fatherPropertyA]
console.log(child.fatherPropertyA); // [Function: fatherPropertyA]

console.log(child.fatherStaticProperty); // undefined

console.log(child.__proto__); // node: Child {}，浏览器：Father {}
