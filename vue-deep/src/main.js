function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      // !important
      track(target, key);

      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      // !
      trigger(target, key);
    },
  });
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, "value");
      return value;
    },
    set value(newValue) {
      value = newValue;
      trigger(refObject, "value");
    },
  };
  return refObject;
}

function track(target, key) {
  console.log("track: ", key);
}
function trigger(target, key) {
  console.log("trigger: ", key);
}

const obj = reactive({
  num: 2,
});

let A3;

obj.num = 3

// lose reactive
let { num } = obj
num = 333333

function update() {
  A3 = obj.num;
}
