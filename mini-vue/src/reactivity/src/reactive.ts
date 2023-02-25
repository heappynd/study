import { track, trigger, TriggerType } from './effect'
export const ITERATE_KEY = Symbol()

export function reactive(data) {
  return new Proxy(data, {
    get(target, key, receiver) {
      // console.log("拦截读取操作", key);

      track(target, key)

      return Reflect.get(target, key, receiver)
    },
    set(target, key, newVal, receiver) {
      // console.log("- 拦截设置操作", key, newVal);
      // 如果属性不存在，则说明是在添加新属性，否则是设置已有属性
      const type = Object.prototype.hasOwnProperty.call(target, key)
        ? TriggerType.SET
        : TriggerType.ADD
      const res = Reflect.set(target, key, newVal, receiver)
      trigger(target, key, type)
      return res
    },
    has(target, p) {
      track(target, p)
      return Reflect.has(target, p)
    },
    ownKeys(target) {
      track(target, ITERATE_KEY)
      return Reflect.ownKeys(target)
    },
    deleteProperty(target, p) {
      // 检查被操作的属性是否是对象自己的属性
      const hasKey = Object.prototype.hasOwnProperty.call(target, p)
      // 使用 Reflect.deleteProperty 完成属性的删除
      const res = Reflect.deleteProperty(target, p)

      if (res && hasKey) {
        // 只有当被删除的属性是对象自己的属性并且成功删除时，才触发更新
        trigger(target, p, TriggerType.DELETE)
      }
      return res
    },
  })
}
