<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  data(vm) {
    return {
      count: 0
    }
  },
  methods: {
    handleClick() {
      this.count += 1
      this.$emit("increment", {
        count: this.count,
        isEven: this.count % 2 === 0
      })
    }
  }
})
</script>

<template>
  <button @click="handleClick">Increment</button>
</template>

<style scoped>

</style>