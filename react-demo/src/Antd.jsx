import React from 'react'
import { Button, Modal, notification } from 'antd'
import { useState } from 'react'

export function Antd() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    notification.open({
      message: 'message',
      description: 'description',
      onClick: () => {
        alert(1)
      },
    })
    // setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}
