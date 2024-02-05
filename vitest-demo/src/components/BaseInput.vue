<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "BaseInput",
  data(vm) {
    return {
      email: ""
    }
  },
  methods: {
    submit() {
      this.$emit("submit", this.email)
    }
  }
})
</script>

<template>
  <div>
    <input type="email" v-model="email" />

    <button @click="submit">Submit</button>
  </div>
</template>

<style scoped>

</style>