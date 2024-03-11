/**
 * @Date        2024/02/17 14:45:04
 * @Author      zono
 * @Description 主布局
 * */

import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'

import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import styles from './MainLayout.module.scss'

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData() //判断是否登录
  useNavPage(waitingUserData)

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
        {/* 若在加载中，就不渲染 */}
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Layout.Content>
      <Layout.Footer className={styles.footer}>
        zono问卷项目&copy;2024.2 - present. Created by zono
      </Layout.Footer>
    </Layout>
  )
}

export default MainLayout
