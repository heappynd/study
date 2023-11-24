export function patchEvent(
  el: Element & { _vei?: Object },
  rawName: string,
  prevValue,
  nextValue
) {
  const invokers = el._vei || (el._vei = {});
  // 是否有缓存
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    // 更新行为
    existingInvoker.value = nextValue;
  } else {
    // get event name
    const name = parseName(rawName);

    if (nextValue) {
      // 新增
      const invoker = (invokers[rawName] = createInvoker(nextValue));
      el.addEventListener(name, invoker);
    } else if (existingInvoker) {
      // 删除
      el.removeEventListener(name, existingInvoker);
      // 删除缓存
      invokers[rawName] = undefined;
    }
  }
}

function createInvoker(initialValue) {
  const invoker = (e: Event) => {
    invoker.value && invoker.value();
  };
  invoker.value = initialValue;
  return invoker;
}

function parseName(name: string) {
  return name.slice(2).toLowerCase();
}
