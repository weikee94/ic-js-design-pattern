class State {
  constructor(color) {
    this.color = color;
  }
  handle(context) {
    console.log(`turn into ${this.color} light`);
    context.setState(this);
  }
}

class Context {
  constructor() {
    this.state = null;
  }

  // retrieve state
  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
  }
}

// testing
let context = new Context();

let green = new State("green");
let yellow = new State("yellow");
let red = new State("red");

green.handle(context);
console.log(context.getState());

// 有限状态机
var fsm = new StateMachine({
  init: "fav",
  transitions: [
    {
      name: "doStore",
      from: "fav",
      to: "cancelFav",
    },
    {
      name: "deleteStore",
      from: "cancelFav",
      to: "fav",
    },
  ],
  methods: {
    // execute fav
    onDoStore: function () {
      alert("fav sucess");
      updateText();
    },
    // execute cancelFav
    onDeleteStore: function () {
      alert("cancel fav success");
      updateText();
    },
  },
});

var $btn = $("#btn1");
// click event
$btn.click(function () {
  if (fsm.is("fav")) {
    fsm.doStore();
  } else {
    fsm.deleteStore();
  }
});

// updateText
function updateText() {
  $btn.text(fsm.state);
}

// initialization
updateText();

// Define Promise
class MyPromise {
  constructor(fn) {
    this.successList = [];
    this.failList = [];

    fn(
      () => {
        // resolve case
        fsm.resolve(this);
      },
      () => {
        // reject case
        fsm.reject(this);
      }
    );
  }

  then(successFn, failFn) {
    this.successList.push(successFn);
    this.failList.push(failFn);
  }
}

// 状态机
var fsm = new StateMachine({
  init: "pending",
  transitions: [
    {
      name: "resolve",
      from: "pending",
      to: "fullfilled",
    },
    {
      name: "reject",
      from: "pending",
      to: "rejected",
    },
  ],
  methods: {
    onResolve: function (state, data) {
      data.successList.forEach((fn) => fn());
    },
    onReject: function (state, data) {
      data.failList.forEach((fn) => fn());
    },
  },
});

// load image
function loadImage(src) {
  var promise = new MyPromise(function (resolve, reject) {
    var img = document.createElement("img");
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject("Load failed");
    };
    img.src = src;
  });

  return promise;
}

var src =
  "https://cdn.vox-cdn.com/thumbor/E9RM8-qg-iyLEAzP4d7tobqI09o=/0x0:2012x1341/1400x933/filters:focal(0x0:2012x1341):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg";
var result = loadImage(src);

result.then(
  function () {
    console.log("success case");
  },
  function () {
    console.log("fail case");
  }
);
