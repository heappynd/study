<script setup lang="ts">
import { usePostsQuery } from "@/feature/posts/queries";
import { ref } from "vue";

const title = ref("");
const { data, status, fetchStatus } = usePostsQuery(title);
</script>

<template>
  <div>
    <input v-model="title" type="text" />
    <h2>status: {{ status }}</h2>
    <h2>fetchStatus: {{ fetchStatus }}</h2>
    <ol>
      <li v-for="item in data" :key="item.id">{{ item.title }}</li>
    </ol>
  </div>
</template>
