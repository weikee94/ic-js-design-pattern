class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }

  notifyAllObservers() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }

  attach(observer) {
    this.observers.push(observer);
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }

  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`);
  }
}

// testing
let s = new Subject();
let o1 = new Observer("o1", s);
s.setState(2);

// node js observer pattern
const EventEmitter = require("events").EventEmitter;
const emit1 = new EventEmitter();
// some 是event name
// on 监听 some 事件
emit1.on("some", () => {
  console.log("event 1 occured");
});
emit1.on("some", () => {
  console.log("event 2 occured");
});
// emit 触发事件
emit1.emit("some");

// example
// 任何 constructor 都可以继承 EventEmitter 的方法 on emit
class Dog extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
  }
}

var dogOne = new Dog("dogOne");
dogOne.on("bark", function () {
  console.log(this.name, "barked");
});
setInterval(() => {
  dogOne.emit("bark");
}, 500);

// stream 当读取一个很大文件时可以使用这个方法
// 流 可以一步步把数据读出来
const fs = require("fs");
const readStream = fs.createReadStream("./data/text1.txt");

let length = 0;
readStream.on("data", function (chunk) {
  let len = chunk.toString().length;
  console.log("len", len);
  length += len;
});
readStream.on("end", function () {
  console.log("length", length);
});
