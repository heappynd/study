const bucket = new WeakMap();

const data = { text: "hello world" };

let activeEffect;

function effect(fn) {
  activeEffect = fn;
  fn();
}

const obj = new Proxy(data, {
  get(target, key) {
    console.log("拦截读取操作", key);

    track(target, key);

    return target[key];
  },
  set(target, key, newVal) {
    console.log("- 拦截设置操作 key", key);
    console.log("- 拦截设置操作 newVal", newVal);
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
}
function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  effects && effects.forEach((fn) => fn());
}

effect(() => {
  console.log(bucket);

  console.log("effect run");
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.text = "hello vue3";
}, 1000);
