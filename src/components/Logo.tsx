/**
 * @Date        2024/02/18 11:14:26
 * @Author      zono
 * @Description 左上角Logo组件
 * */
import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router/index'
import styles from './Logo.module.scss'

const { Title } = Typography

const Logo: FC = () => {
  const { username } = useGetUserInfo()

  const [pathname, setPathname] = useState(HOME_PATHNAME)
  useEffect(() => {
    // 如果登录了，就跳转到管理页面
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined id="logo" />
          </Title>
          <Title>zono问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
