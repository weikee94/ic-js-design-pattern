import $ from "jquery";
import getCart from "../ShoppingCart/GetCart.js";
import StateMachine from "javascript-state-machine";
import { log } from "../util/log.js";

export default class Item {
  constructor(list, data) {
    this.list = list;
    this.data = data;
    this.$el = $("<div>");
    this.cart = getCart();
  }

  initContent() {
    let $el = this.$el;
    let data = this.data;
    $el.append($(`<p>name: ${data.name}</p>`));
    $el.append($(`<p>price: ${data.price}</p>`));
  }

  initBtn() {
    let $el = this.$el;
    let $btn = $("<button>");

    let _this = this;
    let fsm = new StateMachine({
      init: "加入购物车",
      transitions: [
        {
          name: "addToCart",
          from: "加入购物车",
          to: "从购物车删除",
        },
        {
          name: "deleteFromCart",
          from: "从购物车删除",
          to: "加入购物车",
        },
      ],
      methods: {
        // 加入购物车
        onAddToCart: function () {
          _this.addToCartHandler();
          updateText();
        },
        // 从购物车删除
        onDeleteFromCart: function () {
          _this.deleteFromCartHandler();
          updateText();
        },
      },
    });

    function updateText() {
      $btn.text(fsm.state);
    }

    $btn.click(() => {
      if (fsm.is("加入购物车")) {
        fsm.addToCart();
      } else {
        fsm.deleteFromCart();
      }
    });

    $el.append($btn);
  }

  @log("add")
  addToCartHandler() {
    this.cart.add(this.data);
  }

  @log("del")
  deleteFromCartHandler() {
    this.cart.del(this.data.id);
  }

  render() {
    this.list.$el.append(this.$el);
  }

  init() {
    this.initContent();
    this.initBtn();
    this.render();
  }
}
