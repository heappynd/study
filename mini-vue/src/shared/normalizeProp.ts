import { isArray, isString } from ".";
import { isObject } from "@vue/shared";

export function normalizeCss(value: unknown): string {
  let res = "";

  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeCss(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }

  return res.trim();
}
