/**
 * @Date        2024/02/17 14:48:59
 * @Author      zono
 * @Description 问卷管理布局
 * 可以添加新问卷，切换管理页
 * */
import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { createQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation() //获取当前路径

  const {
    loading,
    // error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true, //初始化时是否自动执行
    onSuccess(result) {
      nav(`/question/edit/${result.id}`)
      message.success('创建成功')
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p style={{ display: 'flex', justifyContent: 'center' }}>右边栏</p>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>

      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
