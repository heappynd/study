// TODO: Remove
export enum LifecycleHooks {
  BEFORE_CREATE = "bc",
  CREATED = "c",
  BEFORE_MOUNT = "bm",
  MOUNTED = "m",
}

export function injectHook(type: LifecycleHooks, hook: Function, target) {
  if (target) {
    // 往 instance 里面注册了生命周期
    target[type] = hook;
    return hook;
  }
}

export const createHook = (lifecycle: LifecycleHooks) => {
  return (hook, target) => {
    return injectHook(lifecycle, hook, target);
  };
};

export const onBeforeMount = createHook(LifecycleHooks.BEFORE_MOUNT);
export const onMounted = createHook(LifecycleHooks.MOUNTED);
