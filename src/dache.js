class Car {
  constructor(number, name) {
    this.number = number;
    this.name = name;
  }
}

class Kuaiche extends Car {
  constructor(number, name) {
    super(number, name);
    this.price = 1;
  }
}

class Zhuanche extends Car {
  constructor(number, name) {
    super(number, name);
    this.price = 2;
  }
}

class Trip {
  constructor(car) {
    this.car = car;
  }
  start() {
    console.log(`trip start: ${this.car.name} with ${this.car.price}`);
  }
  end() {
    console.log(
      "trip end:" + ` ${this.car.name} with price ` + this.car.price * 5
    );
  }
}

let car = new Kuaiche(100, "abc");
let trip = new Trip(car);
trip.start();
trip.end();
