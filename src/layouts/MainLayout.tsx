/**
 * @Date        2024/02/17 14:45:04
 * @Author      zono
 * @Description 主布局
 * */

import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const MainLayout: FC = () => {
  return (
    <Layout>
      <Layout.Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
        </div>
      </Layout.Header>
      <Layout.Content className={styles.main}>
        <Outlet />
      </Layout.Content>
      <Layout.Footer className={styles.footer}>
        zono问卷项目&copy;2023 - present. Created by zono
      </Layout.Footer>
    </Layout>
  )
}

export default MainLayout
