import React, { useEffect, useState } from 'react'
import { Line, LineConfig } from '@ant-design/plots'
import { useRequest } from 'ahooks'

let data: any[] = []

function getData(): Promise<any> {
  return new Promise((resolve, reject) => {
    const value = Math.floor(Math.random() * 100 + 1)

    data = [...data, { time: Date.now(), value }]
    if (data.length >= 50) {
      data = data.slice(1)
    }
    console.log(data)

    resolve(data)
  })
}

const Chart = () => {
  const { data, loading } = useRequest(getData, {
    pollingInterval: 1000,
  })

  const config: LineConfig = {
    autoFit: true,
    data: data ? data : [],
    xField: 'time',
    yField: 'value',
    xAxis: {
      // type: 'timeCat',
      // tickCount: 5,
    },
    loading,
  }

  return (
    <div style={{ height: 300, border: '1px solid #f00' }}>
      <Line {...config} />
    </div>
  )
}

export default Chart
