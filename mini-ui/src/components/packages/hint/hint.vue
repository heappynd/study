<style lang="scss" module src="./hint.module.scss"></style>

<template>
  <ElDialog v-model="visible" :width="480" title="提示" @close="remove">
    <div :class="$style.message">
      <ElIcon :size="20" color="#E5A23C">
        <WarningFilled />
      </ElIcon>
      <span>{{ message }}</span>
    </div>

    <template v-if="content">
      <div :class="$style.content">
        <span>{{ content }}</span>
        <span v-show="validatedText">：{{ validatedText }}</span>
      </div>

      <div v-show="validatedText" :class="$style.input">
        <ElInput v-model="userText" clearable :placeholder="placeholder" />
      </div>

      <div v-show="userText && !isPass" :class="$style.errorMsg">
        {{ errorMsg }}
      </div>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="cancel"> 取消 </ElButton>
        <ElButton type="primary" @click="ok"> 确定 </ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { WarningFilled } from "@element-plus/icons-vue";
import { ElButton, ElDialog, ElIcon, ElInput, ElMessage } from "element-plus";
import { computed, ref } from "vue";

export interface HintProps {
  message: string;
  content?: string;
  validatedText?: string;
  placeholder?: string;
  errorMsg?: string;
  remove?(): void;
}

const props = withDefaults(defineProps<HintProps>(), {
  errorMsg: "校验失败",
  remove: () => {},
});

const visible = ref(true);
const userText = ref("");
// 是否通过验证
const isPass = computed(() => {
  return props.validatedText === userText.value;
});

const ok = () => {
  if (isPass.value) {
    props.remove();
    visible.value = false;
  } else {
    ElMessage.error(props.errorMsg);
  }
};
const cancel = () => {
  props.remove();
  visible.value = false;
};
</script>
