import { ConfigProvider, Button, notification } from 'antd'
import { FC, useState, useMemo } from 'react'
import ModelModal from './components/ModelModal'
import ReactDOM from 'react-dom'
import { CloseOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import NasStorage from './nas/Storage'

function createModal() {
  const wrap = document.createElement('div')

  wrap.className = 'reg-model-dialog'

  const close = () => {
    // ReactDOM.unmountComponentAtNode(wrap)
    // document.body.removeChild(wrap)
  }

  ReactDOM.render(<ModelModal onClose={close} />, wrap)

  document.body.appendChild(wrap)
}

const Desc: FC<{ threshold: number; diskUsedRatio: number }> = ({
  threshold,
  diskUsedRatio,
}) => {
  const tips = useMemo(() => {
    const percent = Math.trunc(100 - threshold * 100)
    return [
      `项目硬盘剩余空间不足 ${percent}%，请及时清理，使用率超过 100% 后将影响使用。`,
      '项目硬盘空间使用率超过 100%，为确保正常使用，请立即清理。',
    ]
  }, [threshold])

  const [isExpand, { toggle: toggleExpand }] = useBoolean(false)

  return (
    <div>
      <div className="nas-notification__desc">
        {diskUsedRatio >= 1 ? tips[1] : tips[0]}
      </div>
      <Button
        style={{ padding: 0 }}
        type="link"
        className="nas-notification__more"
        onClick={toggleExpand}
      >
        查看存储详情
        {isExpand ? <UpOutlined /> : <DownOutlined />}
      </Button>

      {isExpand && <NasStorage threshold={0.8} />}
    </div>
  )
}

function createNotification() {
  notification.open({
    message: '提示',
    description: <Desc threshold={0.8} diskUsedRatio={2} />,
    duration: null,
  })
}

function App() {
  return (
    <div className="App">
      <ConfigProvider
      // theme={{ token: { colorPrimary: '#2a60e6', borderRadius: 2 } }}
      >
        <Button
          type="primary"
          onClick={() => {
            createModal()
            // createNotification()
          }}
        >
          Open Modal
        </Button>
        {/* <ModelModal /> */}
      </ConfigProvider>
    </div>
  )
}

export default App
