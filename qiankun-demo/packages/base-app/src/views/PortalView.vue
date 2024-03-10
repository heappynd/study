<template>
  <div>
    PortalView
    <button @click="setState">set state</button>
    <div id="container"></div>
  </div>
</template>

<script setup>
import {
  initGlobalState,
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
} from "qiankun";
import { onMounted, onUnmounted } from "vue";

registerMicroApps([
  {
    name: "sub-a",
    entry: "//localhost:7100",
    container: "#container",
    activeRule: "/portal/sub-a",
  },
  {
    name: "sub-b",
    entry: "//localhost:7200",
    container: "#container",
    activeRule: "/portal/sub-b",
  },
  {
    name: "sub-c",
    entry: "//localhost:7300",
    container: "#container",
    activeRule: "/portal/sub-c",
  },
]);

// setDefaultMountApp("/portal/sub-c");

runAfterFirstMounted(() => console.log("first app mounted"));

const actions = initGlobalState({ a: 0 });

onMounted(() => {
  if (!window.qiankunStarted) {
    console.log("-------------------------0------------------");
    window.qiankunStarted = true;
    start({ sandbox: { strictStyleIsolation: true } });
  }

  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
});

onUnmounted(() => {
  actions.offGlobalStateChange();
});

const setState = () => {
  actions.setGlobalState({ a: Date.now() });
};
</script>
