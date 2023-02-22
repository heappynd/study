const bucket = new WeakMap();

const data = { ok: true, text: "hello vue3" };

let activeEffect;
// 用一个全局变量存储被注册的副作用函数
export function effect(fn) {
  const effectFn = () => {
    // 调用 cleanup 函数完成清除工作
    cleanup(effectFn);
    // 当 effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn;
    fn();
  };
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];
  effectFn();
}
function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i];
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn);
  }
  // 最后需要重置 effectFn.deps 数组
  effectFn.deps.length = 0;
}

export const obj = new Proxy(data, {
  get(target, key) {
    // console.log("拦截读取操作", key);

    track(target, key);

    return target[key];
  },
  set(target, key, newVal) {
    // console.log("- 拦截设置操作", key, newVal);
    target[key] = newVal;
    trigger(target, key);
    return true;
  },
});

function track(target, key) {
  // 没有 activeEffect，直接 return
  if (!activeEffect) {
    return;
  }

  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  // deps 就是一个与当前副作用函数存在联系的依赖集合
  // 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps); // 新增
}
function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  const effectsToTun = new Set(effects);
  effectsToTun && effectsToTun.forEach((effectFn) => effectFn());
}
