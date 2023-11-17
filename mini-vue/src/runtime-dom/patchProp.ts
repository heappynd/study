import { isOn } from "../shared";
import { patchAttr } from "./modules/attrs";
import { patchClass } from "./modules/class";
import { patchDOMProp } from "./modules/props";

export function patchProp(el, key, prevValue, nextValue) {
  if (key === "class") {
    patchClass(el, nextValue);
  } else if (key === "style") {
  } else if (isOn(key)) {
  } else if (shouldSetAsProp(el, key)) {
    patchDOMProp(el, key, nextValue);
  } else {
    patchAttr(el, key, nextValue);
  }
}

function shouldSetAsProp(el: Element, key: string) {
  if (key === "form") {
    // 表单元素是只读的
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    // 因为 input list 属性必须通过 attr 设定
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    // 因为 TEXTAREA type 属性必须通过 attr 设定
    return false;
  }
  return key in el;
}
