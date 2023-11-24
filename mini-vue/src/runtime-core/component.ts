import { reactive } from "@vue/reactivity";
import { isObject } from "../shared";
import { onBeforeMount, onMounted } from "./apiLifecycle";

let uid = 0;

export const enum LifecycleHooks {
  BEFORE_CREATE = "bc",
  CREATED = "c",
  BEFORE_MOUNT = "bm",
  MOUNTED = "m",
}

export function createComponentInstance(vnode) {
  const { type } = vnode;

  const instance = {
    uid: uid++,
    vnode,
    type,
    subTree: null,
    effect: null,
    update: null,
    render: null,
    isMounted: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
  };

  return instance;
}

export function setupComponent(instance) {
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance) {
  finishComponentSetup(instance);
}

export function finishComponentSetup(instance) {
  const Component = instance.type;

  instance.render = Component.render;

  applyOptions(instance);
}
function applyOptions(instance: any) {
  const {
    data: dataOptions,
    beforeCreate,
    created,
    beforeMount,
    mounted,
  } = instance.type;

  // init options 之前
  if (beforeCreate) {
    callHook(beforeCreate);
  }

  if (dataOptions) {
    const data = dataOptions();
    if (isObject(data)) {
      instance.data = reactive(data);
    }
  }

  if (created) {
    callHook(created);
  }

  function registerLifecycleHook(register: Function, hook?: Function) {
    register(hook, instance);
  }

  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
}

function callHook(hook: Function) {
  hook();
}
