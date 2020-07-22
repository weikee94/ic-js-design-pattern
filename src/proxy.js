class RealImg {
  constructor(fileName) {
    this.fileName = fileName;
    this.loadFromDisk();
  }
  loadFromDisk() {
    console.log("...loading " + this.fileName);
  }
  display() {
    console.log("...finished " + this.fileName);
  }
}

class ProxyImg {
  constructor(fileName) {
    this.realImg = new RealImg(fileName);
  }
  display() {
    this.realImg.display();
  }
}

let proxImg = new ProxyImg("1.png");
console.log(proxImg.display());

// 例子演示
$("#div1").click(function () {
  // this 符合期望
  $(this).addClass("red");
});

$("#div1").click(function () {
  // this 不符合期望
  setTimeout(function () {
    $(this).addClass("red");
  }, 1000);
});

// 可以用以下方式解决
$("#div1").click(function () {
  var _this = this;
  setTimeout(function () {
    $(_this).addClass("red");
  }, 1000);
});

// proxy 解决方法
$("#div1").click(function () {
  var fn = function () {
    $(this).css("background-color", "yellow");
  };
  fn = $.proxy(fn, this);
  setTimeout(fn, 1000);
});

// ES6 Proxy Example

let star = {
  name: "xxx",
  age: 20,
  phone: "1234",
};

// agent
let agent = new Proxy(star, {
  get: function (target, key) {
    if (key === "phone") {
      // this should be agent phone
      // cuz we cannot give star phone
      // by using proxy we provide agent phone instead star phone
      return "5678";
    }
    if (key === "price") {
      // agent call out price
      return 1200;
    }
    return target[key];
  },
});

console.log(agent.name);
console.log(agent.phone);
