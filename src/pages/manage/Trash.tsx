/**
 * @Date        2024/03/17 16:59:16
 * @Author      zono
 * @Description 回收站问卷列表
 * */
import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Table, Tag, Button, Space, Modal, Empty, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { updateQuestionService, deleteQuestionsService } from '../../services/question'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('zono问卷 - 回收站')

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { List = [], total = 0 } = data

  // 记录选中的 id
  const [selectedIds, setSelectedIds] = useState<string[]>([]) // 选中的问卷 id

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        refresh() // 定义于useRequest的refresh，刷新数据
        setSelectedIds([])
        message.success('恢复成功')
      },
    }
  )

  // const recover = () => {
  //   confirm({
  //     title: '确认恢复该问卷？',
  //     icon: <ExclamationCircleOutlined />,
  //     content: '恢复后可以在我的问卷中查看',
  //     onOk: recover,
  //   })
  // }

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        refresh() // 定义于useRequest的refresh，刷新数据
        setSelectedIds([])
      },
    }
  )

  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: deleteQuestion,
    })
  }

  // 表格列
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  // 内容
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: '1px solid #e8e8e8' }}>
        <Table
          dataSource={List}
          columns={tableColumns}
          pagination={false}
          rowKey={q => q._id}
          rowSelection={{
            type: 'checkbox',
            //选中项发生变化时的回调
            onChange: selectedRowKeys => {
              setSelectedIds(selectedRowKeys as string[])
            },
          }}
        />
      </div>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && List.length === 0 && <Empty description="暂无数据" />}
        {List.length > 0 && TableElem}
      </div>

      <div className={styles.footer}>{List.length > 0 && <ListPage total={total} />}</div>
    </>
  )
}

export default Trash
