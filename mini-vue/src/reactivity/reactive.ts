import { mutableHandlers, readonlyHandlers } from './baseHandlers'

export const enum ReactiveFlags { // 响应式标识
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

export function reactive(raw) {
  return createReactiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandlers)
}

function createReactiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}

export const isReactive = (value) => {
  // original will get undefined, use !!
  return !!value[ReactiveFlags.IS_REACTIVE]
}
export const isReadonly = (value) => {
  // original will get undefined, use !!
  return !!value[ReactiveFlags.IS_READONLY]
}
