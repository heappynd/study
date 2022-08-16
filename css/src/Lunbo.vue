<template>
  <div class="box">
    <div class="box__item box__item--bg1"></div>
    <div class="box__item box__item--bg2"></div>
    <div class="box__item box__item--bg3"></div>
    <div class="box__item box__item--bg4"></div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.box {
  scroll-snap-type: x mandatory;
  overflow: auto;
  white-space: nowrap;

  &__item {
    scroll-snap-align: center;
    scroll-snap-stop: always;
    display: inline-block;
    width: 100%;
    height: 100px;

    &--bg1 {
      background: pink;
    }
    &--bg2 {
      background: orange;
    }
    &--bg3 {
      background: greenyellow;
    }
    &--bg4 {
      background: blueviolet;
    }
  }
}
</style>
