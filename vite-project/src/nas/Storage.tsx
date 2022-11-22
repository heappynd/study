import React, { FC, useMemo, useState } from 'react'
import { useRequest } from 'ahooks'
import * as api from './api'
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons'
import { Progress } from 'antd'
import { IGetDetail } from './types'
import { covertStorageUnit } from './utils'
import styled from 'styled-components'

const Wrap = styled.div`
  .info {
    font-size: 12px;
  }
  .tips {
    font-size: 12px;
    color: #ff4d4f;
  }
  .process-text {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .nodata {
    text-align: center;
    padding: 20px 0;
  }
  .list {
    margin: 0;
    margin-top: 20px;
    list-style: none;
    padding: 0;
    max-height: 400px;
    overflow: auto;
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 28px;
      padding: 6px 10px;
      margin-bottom: 16px;
      position: relative;
      &-process {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(42, 96, 230, 0.08);
      }
    }
  }
`

const Storage: FC<{ threshold: number }> = ({ threshold }) => {
  const [totalSpace, setTotalSpace] = useState(0)
  const [totalUsed, setTotalUsed] = useState(0)
  const [subSpaceJson, setSubSpaceJson] = useState<IGetDetail['subSpaceJson']>(
    []
  )

  const [stateMsg, setStateMsg] = useState('')

  const { data, cancel, refresh } = useRequest(api.getState, {
    defaultParams: ['project_id', 'user'],
    pollingInterval: 2000,
    async onSuccess(data) {
      setStateMsg(['', '统计中', '统计完成', ''][data.state])
      if (data.state > 1) {
        cancel()
        const detail = await api.getDetail('project_id')
        if (detail === null) {
          setTotalSpace(0)
          setTotalSpace(0)
          setSubSpaceJson([])
          setStateMsg('')
        } else {
          setTotalSpace(detail.totalSpace)
          setTotalUsed(detail.totalUsed)
          setSubSpaceJson(detail.subSpaceJson)
        }
      }
    },
  })

  const percent = useMemo(() => {
    if (totalSpace === 0) return 0
    if (totalUsed > totalSpace) return 100
    return (totalUsed / totalSpace) * 100
  }, [totalSpace, totalUsed])

  const remaining = totalSpace - totalUsed

  const beforeRefresh = async () => {
    const expectedToOperateTime = data?.expectedToOperateTime
    if (
      !expectedToOperateTime ||
      Date.now() > new Date(expectedToOperateTime).getTime()
    ) {
      await api.start('pro', 'user')
      refresh()
    } else {
      let expectedToFormatOperateTime
      if (!expectedToOperateTime) expectedToFormatOperateTime = ''
      expectedToFormatOperateTime = new Date(
        expectedToOperateTime
      ).toLocaleString()
      setStateMsg(`统计太频繁，请${expectedToFormatOperateTime}后再试`)
    }
  }

  return (
    <Wrap>
      <div className="tips">{stateMsg}</div>
      <div className="process-text">
        <span>
          {remaining.toFixed(2)}GB可用(共{totalSpace.toFixed(2)}GB)
        </span>

        {data?.state === 1 ? (
          <LoadingOutlined
            style={{ marginLeft: 'auto', color: '#2a60e6' }}
            onClick={beforeRefresh}
          />
        ) : (
          <ReloadOutlined
            style={{ marginLeft: 'auto', color: '#2a60e6' }}
            onClick={beforeRefresh}
          />
        )}
      </div>

      <Progress
        percent={percent}
        showInfo={false}
        strokeLinecap="square"
        status={percent > threshold * 100 ? 'exception' : 'active'}
      />

      {subSpaceJson.length ? (
        <ul className="list">
          {subSpaceJson.map((item) => (
            <li key={item.name} className="list-item">
              <span>{item.name}</span>
              <span>{covertStorageUnit(item.used, 'GB')}</span>
              <div
                className="list-item-process"
                style={{ right: `${100 - (item.used / totalUsed) * 100}%` }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="nodata">暂无数据</div>
      )}
    </Wrap>
  )
}

export default Storage
