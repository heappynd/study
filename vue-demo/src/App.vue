<script setup lang="ts">
import 'echarts'
import type { EChartsOption } from 'echarts'
import { reactive } from 'vue'
import VChart from 'vue-echarts'

const option: EChartsOption = reactive({
  dataset: {
    // dimensions: ['product', '2015', '2016', '2017'],
    // source: [
    //   { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
    //   { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
    //   { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
    //   { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 },
    // ],

    // sourceHeader: false,
    // dimensions: [{ name: 'product' }, { name: '2015' }, { name: '2016' }, '2017'],

    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1],
    ],
    // X 坐标轴声明为类目轴
    // 默认 第一列为x轴 其他列为y轴
    // 设置seriesLayoutBy为row 第一行为x轴 其他行为y轴
  },
  tooltip: {},
  legend: {},
  xAxis: {
    type: 'category',
  },
  yAxis: {},
  series: [
    {
      type: 'pie',
      // encode: {
      //   x: ['product'],
      //   y: ['2016'],
      //   // tooltip: ['2015', '2016'],
      //   seriesName: [0, 2],
      // },
    },
    // {
    //   type: 'bar',
    // },
    // {
    //   type: 'bar',
    // },
  ],
})
</script>

<template>
  <div>
    <v-chart :option="option" style="height: 400px" autoresize />
  </div>
</template>

<style scoped></style>
