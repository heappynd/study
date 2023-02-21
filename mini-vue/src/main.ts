const bucket = new Set();

const data = { text: "hello world" };

const obj = new Proxy(data, {
  get(target, key) {
    console.log("拦截读取操作", key);

    bucket.add(effect);
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

function effect() {
  document.body.innerText = obj.text;
}
effect();

setTimeout(() => {
  obj.text = "hello vue3";
}, 1000);
