class Product {
  constructor(name) {
    this.name = name;
  }
  init = () => {
    console.log("init");
  };
  fn1 = () => {
    console.log("this is fn1 function");
  };
}

class Creator {
  create = (name) => {
    return new Product(name);
  };
}

// test
let creator = new Creator();
let p = creator.create("p1");
p.init();
p.fn1();


var profile = React.createElement('div', null, 
        React.createElement('img', {src: 'avatar.png', className="profile"})
    )

class Vnode {
 // skip
}

React.createElement = function(tag, attrs, children) {
    return new Vnode(tag, attrs, children)
}