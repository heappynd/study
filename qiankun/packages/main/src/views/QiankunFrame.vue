<template>
  <div>
    <div ref="viewport">
    
  </div>
  <button @click="set">setGlobalState</button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { initGlobalState, loadMicroApp } from "qiankun";

/** @type { import('qiankun').MicroApp } */
let app = null;
const viewport = ref(null)

const { setGlobalState, onGlobalStateChange } = initGlobalState({user: 'qian'})

onMounted(() => {
  app = loadMicroApp({
    name: "vue3",
    entry: "//localhost:7105",
    container: viewport.value,
    // loader,
    // activeRule: "/vue3",
    props: {
      user: "qiankun",
    },
  });
  setGlobalState({user: 'andy'})
});

function set() {
  setGlobalState({user: 'andy' + Date.now()})
}

onUnmounted(()=>{
  console.log('unmount in main')
  app.unmount()
})
</script>