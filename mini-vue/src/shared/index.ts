export const isArray = Array.isArray;
export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";
export const isString = (val: unknown): val is string =>
  typeof val === "string";
export const isSymbol = (val: unknown): val is symbol =>
  typeof val === "symbol";
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";

const onRE = /^on[^a-z]/;
export const isOn = (key: string) => onRE.test(key);

export const extend = Object.assign;

const __DEV__ = false;

export const EMPTY_OBJ: { readonly [key: string]: any } = __DEV__
  ? Object.freeze({})
  : {};
