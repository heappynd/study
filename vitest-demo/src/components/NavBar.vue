<template>
  <nav>
    <a id="profile" href="/profile">My Profile</a>
    <a v-if="admin" id="admin" href="/admin">Admin</a>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      admin: false,
    };
  },
});
</script>
