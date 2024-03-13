/**
 * @Date        2024/03/13 08:26:04
 * @Author      zono
 * @Description 问卷信息卡片组件
 * */
import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { updateQuestionService, duplicateQuestionService } from '../services/question'

const { confirm } = Modal
// ts 自定义类型
type PropsType = {
  _id: string // 服务端 mongodb ，自动，_id 不重复
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

// FC - functional component
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props

  // 标星有关
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState }) // 更新标星状态(标记和取消)
    },
    {
      manual: true, // 手动触发
      onSuccess() {
        setIsStarState(!isStarState) // 更新 state
        message.success('已更新')
      },
    }
  )

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        nav(`/question/edit/${result._id}`)
      },
    }
  )

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null
  return (
    <div className={styles.container}>
      {/* 标题 */}
      <div className={styles.title}>
        {/* 星标 */}
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        {/* 是否发布 */}
        <div className={styles.right}>
          <Space>
            {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
            <span>答卷：{answerCount}</span>
            <span>创建时间：{createdAt}</span>
          </Space>
        </div>
      </div>

      {/* 操作 */}
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>

        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>

            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate} // 点击确定时的回调
            >
              <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => {
                confirm({
                  title: '确定删除该问卷？',
                  icon: <ExclamationCircleOutlined />,
                  onOk: deleteQuestion, // 点击确定时的回调
                })
              }}
              disabled={deleteLoading} // 删除中
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
