<template>
  <div>
    <a-select
      v-if="!isOnly"
      v-model="currentIndex"
      :options="options"
      style="width: 100%; margin-bottom: 8px"
    />

    <a-card
      size="small"
      :title="title + '使用率'"
      :bordered="false"
      style="width: 100%; margin-bottom: 8px"
    >
      <template #extra>
        <span>{{ descRate }}</span>
      </template>
      <v-charts
        style="height: 160px; width: 100%"
        :options="ratioChart"
        autoresize
      />
    </a-card>
    <a-card
      size="small"
      :title="title + '显存(G)'"
      :bordered="false"
      style="width: 100%"
    >
      <template #extra>
        <span>{{ desc }}</span>
      </template>
      <v-charts
        style="height: 160px; width: 100%"
        :options="memChart"
        autoresize
      />
    </a-card>

    <a-tooltip
      v-if="!isOnly"
      overlayClassName="overlay-class"
      placement="topLeft"
    >
      <template #title>
        <div v-for="(item, index) in tips" :key="index">
          <span>GPU{{ index + 1 }} 使用率:{{ item.rate }}%</span>
          <span>显存:{{ item.latest }}/{{ item.total }}G</span>
          <span>({{ item.percent }}%)</span>
        </div>
      </template>
      Gpus
    </a-tooltip>

    <div v-else>
      <span>GPU 使用率:{{ tips[0].rate }}%</span>
      <span>显存:{{ tips[0].latest }}/{{ tips[0].total }}G</span>
      <span>({{ tips[0].percent }}%)</span>
    </div>
  </div>
</template>

<script>
import { gpus } from './monitor'
import VCharts from 'vue-echarts'
import 'echarts'
import moment from 'moment'

function fixed(input, digit = 2) {
  return parseFloat(input.toFixed(digit))
}
function byte2gb(b) {
  return b / 1024 / 1024 / 1024
}

export default {
  components: {
    VCharts,
  },
  data() {
    return {
      gpus,
      options: [],
      currentIndex: 0,
      descRate: '',
      desc: '',
      tips: [{ rate: 0, latest: 0, total: 0, percent: 0 }],
    }
  },
  computed: {
    isOnly() {
      return this.gpus.length === 1
    },
    title() {
      return this.isOnly ? 'GPU' : `GPU${this.currentIndex + 1}`
    },
    ratioChart() {
      const current = this.gpus[this.currentIndex][0]
      return this.generateOptions(current, true)
    },
    memChart() {
      const current = this.gpus[this.currentIndex][1]
      return this.generateOptions(current)
    },
  },
  watch: {
    gpus: {
      handler() {},
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.options = this.gpus.map((item, index) => ({
      label: `GPU${index + 1}`,
      value: index,
    }))
    this.tips = this.gpus.map((item) => {
      const curves0 = item[0].curves
      const keys0 = Object.keys(curves0)
      const rate = fixed(curves0[keys0[keys0.length - 1]])
      const curves1 = item[1].curves
      const keys1 = Object.keys(curves1)
      const latest = fixed(byte2gb(curves1[keys1[keys1.length - 1]]), 4)
      const total = fixed(byte2gb(item[1].total), 4)
      const percent = fixed((latest / total) * 100)
      return { rate, latest, total, percent }
    })
  },
  methods: {
    generateOptions(current, isRate = false) {
      const data = {
        x: [],
        y: [],
      }

      Object.keys(current.curves).forEach((key) => {
        let value = current.curves[key]
        value = isRate ? fixed(value) : fixed(byte2gb(value), 4)

        data.x.push(moment(+key).format('HH:mm:ss'))
        data.y.push(value)
      })

      const latest = data.y[data.y.length - 1]

      if (isRate) {
        this.descRate = latest + '%'
      } else {
        let total = current.total
        total = fixed(byte2gb(total), 4)
        const percent = fixed((latest / total) * 100)
        this.desc = `(${latest}/${total}G)${percent}%`
      }

      return {
        grid: {
          top: 10,
          left: 40,
          right: 20,
          bottom: 30,
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: (params) => {
            const { name, marker, value } = params[0]
            const seriesName = isRate ? '使用率' : '显存(G)'
            const unit = isRate ? '%' : ''
            return `${name}<br/>${marker}${seriesName} : ${value}${unit}`
          },
        },
        xAxis: {
          type: 'category',
          data: data.x,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data.y,
            type: 'line',
          },
        ],
      }
    },
  },
}
</script>

<style lang="less">
.overlay-class {
  .ant-tooltip-inner {
    width: 350px;
    text-align: center;
  }
}
</style>
