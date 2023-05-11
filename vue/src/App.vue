<template>
  <div>
    <VButton size="large" v-model="val">
      <template #default="{ msg }"> {{ msg }}</template>
      <template v-slot:item="{ id }">
        {{ id }}
      </template>
    </VButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import VButton from './components/VButton/index.vue'

const val = ref('xxx')

console.log(VButton)
</script>

<style scoped></style>
