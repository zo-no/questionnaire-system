/**
 * @Date        2024/03/17 16:57:59
 * @Author      zono
 * @Description 星标问卷管理页
 * */
import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'

const { Title } = Typography

const Star: FC = () => {
  useTitle('zono问卷 - 星标问卷')

  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { List = [], total = 0 } = data
  console.log(data)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
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
        {List.length > 0 &&
          List.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Star
