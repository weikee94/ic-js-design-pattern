<p>aa</p>
<p>bb</p>
<p>cc</p>

var arr = [1,2,3]
var nodeList = document.getElementsByTagName('p');
var $p = $('p')


// 要对这三个变量进行遍历
arr.forEach(function(item) {
    console.log(item)
})

var i, len = nodeList.length;
for(i = 0; i< len; i++) {
    console.log(nodeList[i])
}

$p.each(function(key, p) {
    console.log(key, p)
})

// 但是我们可以使用 jquery.each 来实现一种对多种不同类型的迭代
function each(data) {
    var $data = $(data);
    $data.each(function(key, v) {
        console.log(key, v)
    })
}
// 使用方法
each(arr)
each(nodeList)
each($p)


class Iterator {
    constructor(container) {
        this.list = container.list
        this.index = 0;
    }

    next() {
        if(this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }

    hasNext() {
        if(this.index >= this.list.length) {
            return false
        }
        return true
    }
}


class Container {
    constructor(list) {
        this.list = list;
    }
    // 生成遍历器
    getIterator() {
        return new Iterator(this)
    }
}

// testing
let container = new Container([1,2,3,4])
let iterator = container.getIterator()
while(iterator.hasNext()) {
    console.log(iterator.next())
}



// ES6 Iterator 示例
// 自己用 Symbol.iterator 来模拟
function each(data) {
    // 生成遍历器
    // 符合Symbol iterator 的有：Array, Map, Set, String, TypedArray, Arguments, NodeList
    let iterator = data[Symbol.iterator]()

    // console.log(iterator.next()) 有数据时返回 { value: 1, done: false }
    // console.log(iterator.next()) 没数据时返回 { value: undefined, done: true }

    let item = {done: false}
    while(!item.done) {
        item = iterator.next()
        if(!item.done) {
            console.log(item.value)
        }
    }
}

// testing 
let m = new Map()
m.set('a', 100)
m.set('b', 200)

each(m)



// ES6 own implementation
// `Symbol.iterator` 并不是人人都知道
// 也不是每个人都要封装一个 each 方法
// 因此有了 `for...of` 语法

function each(data) {
    // data 必须符合Symbol iterator 的有：Array, Map, Set, String, TypedArray, Arguments, NodeList
    for(let item of data) {
        console.log(item)
    }
}

// testing 
let m = new Map()
m.set('a', 100)
m.set('b', 200)

each(m)
