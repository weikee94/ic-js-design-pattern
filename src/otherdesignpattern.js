// 原型模式
// 一个原型 对象
const prototype = {
  getName: function () {
    console.log(this.first + " " + this.last);
  },
  say: function () {
    console.log("hello");
  },
};

// 基于原型创建
let x = Object.create(prototype);
x.first = "a";
x.last = "b";
x.getName();
x.say();

// --------------------

// 桥接模式
// 抽象实现分离
class Color {
  constructor(name) {
    this.name = name;
  }
  getColor() {
    return this.name;
  }
}

class Shape {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  draw() {
    console.log(`${this.name} with ${this.color}`);
  }
}

let red = new Color("red");
let yellow = new Color("yellow");

let circle = new Shape("circle", red.getColor());
console.log(circle.draw());

// ----------------------------

// 组合模式
// vNode

<div id="div1" class="container">
    <p>123</p>
    <p>456</p>
</div>

{
    tag: 'div',
    attr: {
        id: 'div1',
        className: 'container'
    },
    children: [
        {
            tag: 'p',
            attr: {},
            children: ['123']
        },
        {
            tag: 'p',
            attr: {},
            children: ['456']
        }
    ]
}


// ------------------------

// 享元模式
// 主要考虑内存，而非效率
// 相同数据共享使用

// 无限下拉列表，将事件代理到高层节点
// 如果都绑定在 a 标签，队内存开销太大

<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
</div>

<script>
    var div1 = document.getElementById('div1')
    div1.addEventListener('click', function(e) {
        var target = e.target;
        if(e.nodeName === 'A') {
            console.log(target.innerHTML)
        }
    })
</script>

// ---------------------------
// 策略模式
// instead using a lot of if else, we separate the cases by following

class OrdinaryUser {
    buy() {
        console.log('normal user')
    }
}

class MemberUser {
    buy() {
        console.log('member user')
    }
}

class VIPUser {
    buy() {
        console.log('VIP user')
    }
}

let u1 = new OrdinaryUser();
let u2 = new MemberUser();
let u3 = new VIPUser();


// -------------------------------
// 模版方法模式和职责链模式
// 模版方法
class Action {
    handle() {
        handle1()
        handle2()
    }
    handle1() {
        console.log('handle 1')
    }
    handle2() {
        console.log('handle 2')
    }
}

// 职责链模式
class ActionLink {
    constructor(name) {
        this.name = name;
        this.nextAction = null;
    }

    setNextAction(action) {
        this.nextAction = action;
    }

    handle() {
        console.log(`${this.name} handling`)
        if(this.nextAction!== null) {
            this.nextAction.handle();
        }
    }
}

// testing 
let a1 = new ActionLink('groupLead')
let a2 = new ActionLink('managerLead')
let a3 = new ActionLink('CEO')
a1.setNextAction(a2)
a2.setNextAction(a3)
a1.handle();




// -------------------------------------
// 命令模式

// 执行者
class Receiver {
    exec() {
        console.log('execute')
    }
}

// 传达命令者
class Command {
    constructor(receiver) {
        this.receiver = receiver
    }
    cmd() {
        console.log('passing the execute command')
        this.receiver.exec()
    }
}

// 触发者
class Invoker {
    constructor(command) {
        this.command = command;
    }
    invoke() {
        console.log('trigger')
        this.command.cmd()
    }
}

let soldier = new Receiver();
let trumpeter = new Command(soldier);
let general = new Invoker(trumpeter);
general.invoke()


// ----------------------------------------------
// 备忘录模式

// 状态备忘
class Memo {
    constructor(content) {
        this.content = content;
    }
    getContent() {
        return this.content;
    }
}

// 备忘列表
class NoteList {
    constructor() {
        this.list = []
    }
    add(memo) {
        this.list.push(memo)
    }
    get(index) {
        console.log(this.list[index])
    }
}

// 编辑器
class Editor {
    constructor() {
        this.content = null
    }

    setContent(content) {
        this.content = content
    }

    getContent() {
        return this.content
    }

    saveContentToMemo() {
        return new Memo(this.content)
    }

    getContentFromMemo(memo) {
        this.content = memo.getContent()
    }
}

// testing
let editor = new Editor()
let noteList = new NoteList()
editor.setContent('111')
// saveContentToMemo return new Memo
noteList.add(editor.saveContentToMemo())
console.log(editor.getContentFromMemo(noteList.get(0)))


// ----------------------------------
// 中介者模式
// 不允许直接修改值，必须通过中介者来去执行
// 确保各个修改不冲突

class A {
    constructor() {
        this.number = 0;
    }
    setNumber(num, m) {
        this.number = num;
        if(m) {
            m.setB()
        }
    }
}

class B {
    constructor() {
        this.number = 0;
    }   
    setNumber(num, m) {
        this.number = num;
        if(m) {
            m.setA()
        }
    }
}

class Mediator {
    constructor(a,b) {
        this.a = a;
        this.b = b;
    }

    setA() {
        let number = this.b.number;
        this.a.setNumber(number + 1);
    }

    setB() {
        let number = this.a.number;
        this.b.setNumber(number - 1)
    }
}

// testing
let a = new A();
let b = new B();
let m = new Mediator(a, b);
a.setNumber(200, m)
console.log(a.number, b.number)





