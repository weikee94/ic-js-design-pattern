class SingleObject {
  // 这里的login 不是静态的
  // 因为每次初始化，这个都会存在每个instance 里
  login() {
    console.log("login");
  }
}

// getInstance 这个就是静态，因为它被挂载到SingleObject 上
// 所以无论new 多少次，只会有一个
SingleObject.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new SingleObject();
    }
    return instance;
  };
})();

// test
// 注意⚠️这里使用静态函数 getInstance, 不能 new SingleObject();

let obj1 = SingleObject.getInstance();
obj1.login();
let obj2 = SingleObject.getInstance();
obj2.login();
console.log("obj1 === obj2 ", obj1 === obj2);

console.log("--------Divider----------");

let obj3 = new SingleObject();
obj3.login();
console.log("obj1 === obj3", obj1 === obj3);
