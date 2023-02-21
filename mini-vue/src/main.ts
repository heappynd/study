const bucket = new Set();

const data = { text: "hello world" };

let activeEffect;

function effect(fn) {
  activeEffect = fn;
  fn();
}

const obj = new Proxy(data, {
  get(target, key) {
    console.log("拦截读取操作", key);
    if (activeEffect) {
      bucket.add(activeEffect);
    }

    return target[key];
  },
  set(target, key, newVal) {
    console.log("- 拦截设置操作 key", key);
    console.log("- 拦截设置操作 newVal", newVal);
    target[key] = newVal;
    bucket.forEach((fn) => fn());
    return true;
  },
});

effect(() => {
  console.log("effect run");
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.text = "hello vue3";
}, 1000);
