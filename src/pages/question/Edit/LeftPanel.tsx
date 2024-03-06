/**
 * @Date        2024/03/04 21:16:00
 * @Author      zono
 * @Description 左侧面板
 * */

import React, { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

/**
 * @description tabs的配置
 * */
const tabsItems = [
  {
    key: 'componentLib',
    icon: <AppstoreOutlined />,
    label: '组件库',
    children: <ComponentLib />,
  },
  {
    key: 'layers',
    icon: <BarsOutlined />,
    label: '图层',
    children: <Layers />,
  },
]

const LeftPanel: FC = () => {
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />
}

export default LeftPanel
