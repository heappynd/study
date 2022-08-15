<template>
  <div class="media">
    <div class="media__img">img</div>
    <div class="media__content">content</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@include b(media) {
  color: red;
  @include e(img) {
    color: #000;
    // @include m() {
    // }
  }
  @include e(content) {
    color: aqua;
  }
}
</style>
