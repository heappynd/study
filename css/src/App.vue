<script setup lang="ts"></script>

<template>
  <div>
    <p class="part">part</p>

    <h1>h1</h1>

    <a href="">百度</a>

    <header>Title</header>
  </div>
</template>

<style lang="scss" scoped>
.part {
  color: $color-primary;
}

header {
  width: 200px;
  height: 200px;
  background: rgba($color: #000000, $alpha: 0.45);
  color: #fff;

  @include box-center(center, center);
}
// bem
@include b(block) {
  background: red;
  @include e(header) {
    font-size: 14px;

    @include m(css) {
      font-size: 18px;
    }
  }
}
</style>
