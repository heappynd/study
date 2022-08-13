<template>
  <div v-show="visible" class="banana-message">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

type Props = {
  message: string
  duration?: number
}

const props = defineProps<Props>()

const visible = ref(false)

function startTimer() {
  if (!props.duration) return

  if (props.duration === 0) return
}

function close() {
  visible.value = false
}

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 3000)

  visible.value = true
})

defineExpose({
  visible,
  close,
})
</script>

<style scoped>
.banana-message {
  border: 1px solid #000;
  padding: 20px;
  background: #000;
  color: #fff;
}
</style>
