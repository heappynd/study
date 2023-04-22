import React, { useState } from 'react'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('栏目 1', '/page1', <PieChartOutlined />),
  getItem('栏目 2', '/page2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
]

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const navigate = useNavigate()
  const localtion = useLocation()

  const menuClick: MenuProps['onClick'] = (e) => {
    console.log(e)
    navigate(e.key)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sider */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={[localtion.pathname]}
          mode="inline"
          items={items}
          onClick={menuClick}
        />
      </Sider>
      {/* 右侧 */}
      <Layout className="site-layout">
        {/* 右侧头部 */}
        <Header style={{ paddingLeft: 16, background: colorBgContainer }}>
          <Breadcrumb style={{ lineHeight: '64px' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        {/* 内容 */}
        <Content
          style={{
            margin: '16px 16px 0',
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}
        >
          {/* 我的内容 */}
          <Outlet />
        </Content>
        {/* 底部 */}
        <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Home
