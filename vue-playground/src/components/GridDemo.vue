<template>
  <div class="container">
    <div v-for="i in 9" :style="{ background: getColor() }">{{ i }}</div>
  </div>
</template>

<script lang="ts" setup>
function random(min: number, max: number) {
  const choices = max - min + 1
  return Math.floor(Math.random() * choices + min)
}

const getColor = () => {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: repeat(3, 100px);
  /* grid-template-columns: repeat(2, 100px 20px 80px); */
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-columns: 1fr 2fr;
  grid-template-columns: 150px 1fr 2fr;
  grid-template-columns: 1fr 1fr minmax(300px, 1fr);
  grid-template-columns: 100px auto 100px;
  /* 网格线的名称 */
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  /* 行与行的间隔（行间距） */
  row-gap: 20px;
  /* 列与列的间隔（列间距） */
  column-gap: 20px;
  /* grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式 */
  gap: 30px 30px;

  grid-template-areas:
    'header header header'
    'main main sidebar'
    'footer footer footer';
  /* 即"先行后列" */
  grid-auto-flow: column;

  justify-items: stretch;
  align-items: start;
  place-items: stretch;
}
.container > div {
  /* background: v-bind(getColor()); */
}
</style>
