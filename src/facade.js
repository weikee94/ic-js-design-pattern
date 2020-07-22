function bindEvent(elem, type, selector, fn) {
  if (fn === null) {
    fn = selector;
    selector = null;
  }
}

// When building an application, we often face problems with
// external APIs. One has simple methods, other has them very
// complicated. Unifying them under one common interface
// is one of uses of the facade pattern.

// 假设该方法支持不同数目的参数且返回不同值
// 我们可以考虑使用同个接口，但需注意避免胖接口出现
// 胖接口：(意思就是把所有都放在一个里面管理，不推荐)
bindEvent(elem, "click", "#div1", fn);
bindEvent(elem, "click", fn);
