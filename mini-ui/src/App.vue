<script setup lang="ts">
import tips from "./components/packages/tips";

function del() {
  tips({
    message: "删除后该工作空间将不可用！",
    content: "请确认并输入已选待删除的工作空间名称：",
    validatedText: "workspace1",
  })
    .then(() => {
      console.log("ok");
    })
    .catch(() => {
      console.log("cancel");
    });
}
</script>

<template>
  <div>
    <button @click="del">删除</button>
  </div>
</template>

<style scoped></style>
