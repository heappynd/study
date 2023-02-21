const bucket = new WeakMap();

const data = { text: "hello world" };

let activeEffect;

function effect(fn) {
  activeEffect = fn;
  fn();
}

// WeakMap 由 target --> Map 构成；
// Map 由 key --> Set 构成。
// 其中 WeakMap 的键是原始对象 target，
// WeakMap 的值是一个Map 实例，
// 而 Map 的键是原始对象 target 的 key，
// Map 的值是一个由副作用函数组成的 Set。 又叫依赖集合
const obj = new Proxy(data, {
  get(target, key) {
    console.log("拦截读取操作", key);
    // 没有 activeEffect，直接 return
    if (!activeEffect) {
      return target[key];
    }
    // 根据 target 从“桶”中取得 depsMap，它也是一个 Map 类型：key --> effects
    let depsMap = bucket.get(target);
    if (!depsMap) {
      // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联
      bucket.set(target, (depsMap = new Map()));
    }
    // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，
    // 里面存储着所有与当前 key 相关联的副作用函数：effects
    let deps = depsMap.get(key);
    if (!deps) {
      // 如果 deps 不存在，同样新建一个 Set 并与 key 关联
      depsMap.set(key, (deps = new Set()));
    }
    // 最后将当前激活的副作用函数添加到“桶”里
    deps.add(activeEffect);
    // 返回属性值
    return target[key];
  },
  set(target, key, newVal) {
    console.log("- 拦截设置操作 key", key);
    console.log("- 拦截设置操作 newVal", newVal);
    target[key] = newVal;
    // 根据 target 从桶中取得 depsMap，它是 key --> effects
    const depsMap = bucket.get(target);
    if (!depsMap) return;
    // 根据 key 取得所有副作用函数 effects
    const effects = depsMap.get(key);
    // 执行副作用函数
    effects && effects.forEach((fn) => fn());
  },
});

effect(() => {
  console.log("effect run");
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.notExist = "hello vue3";
}, 1000);
