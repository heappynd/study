import { isString } from "../../shared";

export function patchStyle(el: Element, prev, next) {
  const style = (el as HTMLElement).style;
  const isCssString = isString(next);

  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    // 清理旧样式
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  }
}

function setStyle(style: CSSStyleDeclaration, name: string, val: string) {
  style[name] = val;
}
