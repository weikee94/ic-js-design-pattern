class People {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName = () => {
    return this.name;
  };

  getAge = () => {
    return this.age;
  };
}

let p = new People("haha", 12);
console.log(p.getName());
console.log(p.getAge());

class Student extends People {
  constructor(name, age, number) {
    super(name, age);
    this.number = number;
  }
  study = () => {
    console.log(`${this.name} with id ${this.number} study `);
  };
}

let ali = new Student("ali", 22, "110000");
console.log(ali.study());
console.log(ali.getAge());

class Shape {
  constructor(name) {
    this.name = name;
  }

  area = () => {};
}

class Triangle extends Shape {
  constructor(name) {
    super(name);
  }

  area = (b, h) => {
    return (b * h) / 2;
  };
}

let t1 = new Triangle("t1");
console.log(`${t1.name} area is: ${t1.area(5, 10)}`);

class Square extends Shape {
  constructor(name) {
    super(name);
  }

  area = (l) => {
    return l * l;
  };
}

let s1 = new Square("s1");
console.log(`${s1.name} area is ${s1.area(10)}`);
