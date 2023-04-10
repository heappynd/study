<style lang="scss" module src="./tips.module.scss" />

<template>
  <ElDialog v-model="state.visible" :width="480" title="提示">
    <div :class="$style.message">
      <ElIcon :size="20" color="#E5A23C">
        <WarningFilled />
      </ElIcon>
      <span>{{ message }}</span>
    </div>

    <template v-if="content">
      <div :class="$style.content">
        <span>{{ content }}</span>
        <span v-show="validatedText">{{ validatedText }}</span>
      </div>

      <div v-show="validatedText" :class="$style.input">
        <ElInput
          v-model="state.userText"
          clearable
          :placeholder="placeholder"
        />
      </div>

      <div v-show="state.userText && !isPass" :class="$style.errorMsg">
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
import { computed, reactive } from "vue";

export interface IProps {
  message: string;
  content?: string;
  validatedText?: string;
  placeholder?: string;
  errorMsg?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  errorMsg: "校验失败",
});

const state = reactive({
  visible: false,
  type: "",
  userText: "",
});
// 是否通过验证
const isPass = computed(() => {
  return props.validatedText === state.userText;
});

const ok = () => {
  if (!props.validatedText || isPass.value) {
    state.type = "ok";
    state.visible = false;
  } else {
    state.type = "cancel";
    ElMessage.error(props.errorMsg);
  }
};
const cancel = () => {
  state.type = "cancel";
  state.visible = false;
};

defineExpose({
  state,
});
</script>
