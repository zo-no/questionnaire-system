import React, { FC } from 'react'

import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { Typography, Spin } from 'antd'
// import { produce } from 'immer'
// import { getQuestionListService } from '../../services/question'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { useTitle } from 'ahooks'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography

const List: FC = () => {
  useTitle('zono-我的问卷')

  const { data = {}, loading } = useLoadQuestionListData()
  const { List = [], Total = 0 } = data
  //设置模拟数据
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
        {List.length > 0 &&
          List.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>合计 {Total} list-footer</div>
    </>
  )
}

export default List
