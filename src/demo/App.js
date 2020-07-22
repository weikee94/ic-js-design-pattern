import $ from "jquery";
import ShoppingCart from "./ShoppingCart/ShoppingCart.js";
import List from "./List/List.js";

export default class App {
  constructor(id) {
    this.$el = $("#" + id);
  }

  // init shopping cart
  initShoppingCart() {
    let shoppingCart = new ShoppingCart(this);
    shoppingCart.init();
  }

  // init list
  initList() {
    let list = new List(this);
    list.init();
  }

  init() {
    this.initShoppingCart();
    this.initList();
  }
}
