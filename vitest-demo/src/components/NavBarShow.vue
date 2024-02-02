<template>
  <nav>
    <a id="user" href="/profile">My Profile</a>
    <ul v-show="shouldShowDropdown" id="user-dropdown">
      <!-- dropdown content -->
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      shouldShowDropdown: false,
    };
  },
});
</script>
