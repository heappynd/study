<script setup lang="ts">
import { ref, computed, getCurrentInstance } from "vue";
import message from "./components/packages/message";
import Hint from "./components/packages/hint/hint.vue";

import hint from "./components/packages/hint";

const { proxy } = getCurrentInstance();
const showErrorMessage = () => {
  message.error("error");
};
const showSuccessMessage = () => {
  proxy.$message.success("this is a success message");
};
const showWarningMessage = () => {
  proxy.$message.warning("this is a warning message");
};

function hit() {
  // hint({
  //   message: "删除后该工作空间将不可用！",
  //   content: "请确认并输入已选待删除的工作空间名称：",
  //   validatedText: "workspace1",
  // });

  hint({
    message: "确定要该成员移除工作空间吗",
    content: "该成员在本工作空间内的所有数据将被清除",
  });
}
</script>

<template>
  <div>
    <button @click="showSuccessMessage">click me to show success</button>
    <button @click="showWarningMessage">click me to show warning</button>
    <button @click="hit">hint</button>
  </div>
</template>

<style scoped></style>
