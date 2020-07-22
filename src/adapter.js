class Adaptee {
  specificRequest() {
    return "updated success";
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee();
  }
  request() {
    let info = this.adaptee.specificRequest();
    return `normal - adapter - ${info} `;
  }
}

// testing
let target = new Target();
let res = target.request();
console.log(res);
