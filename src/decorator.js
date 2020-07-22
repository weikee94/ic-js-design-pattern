class Circle {
  draw() {
    console.log("draw a circle");
  }
}

class Decorator {
  constructor(circle) {
    this.circle = circle;
  }

  draw() {
    this.circle.draw();
    this.setRedBorder(circle);
  }

  setRedBorder(circle) {
    console.log("update border with red");
  }
}

// Testing
let circle = new Circle();
circle.draw();

console.log("<------分割线------->");
let dec = new Decorator(circle);
dec.draw();

// ES7
// 装饰类
@testDec
class Demo {}

function testDec(target) {
  target.isDec = true;
}

console.log(Demo.isDec);

// 装饰器原理
@decorator
class A {}
// 等同于
A = decorator(A) || A;

// 装饰器 mixins
function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

class Foo {
  foo() {
    console.log("foo");
  }
}

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo(); // foo 这里通过mixins 拿到Foo 的foo function

// 装饰方法 1
function readonly(target, name, descriptor) {
  // descriptor 属性描述对象 (Object.defineProperty 中会用到，原来值如下)
  // {
  //     value: specifiedFunction,
  //     enumerable: false,
  //     configurable: true,
  //     writable: true
  // }
  descriptor.writable = false;
  return descriptor;
}

class Person {
  constructor() {
    this.first = "A";
    this.last = "B";
  }

  @readonly
  name() {
    return `${this.first} and ${this.last}`;
  }
}

var p = new Person();
p.name();
// p.name = function() {} 会报错，因为name 是只读属性

// 装饰方法 2
function add(target, name, descriptor) {
  var oldV = descriptor.value;

  descriptor.value = function () {
    console.log(`Calling ${name}`, arguments);
    return oldV.apply(this, arguments);
  };
  return descriptor;
}

class MathClass {
  @log
  add(a, b) {
    return a + b;
  }
}

const math = new MathClass();
const result = math.add(1, 4); // 执行时，打印 log
console.log(result);
