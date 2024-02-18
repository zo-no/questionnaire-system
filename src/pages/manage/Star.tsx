import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import { Typography } from 'antd'
// import QuestionCard from '../../components/QuestionCard'
// import ListSearch from '../../components/ListSearch'
// import ListPage from '../../components/ListPage'
// import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'

const { Title } = Typography

const Star: FC = () => {
  useTitle('zono问卷 - 星标问卷')

  // const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  // const { list = [], total = 0 } = data

  const rawQuestionList = [
    {
      _id: 'q1',
      title: '问卷1',
      isPublished: false,
      isStar: false,
      answerCount: 5,
      createAt: '3月10日 13:23',
    },
    {
      _id: 'q2',
      title: '问卷2',
      isPublished: true,
      isStar: false,
      answerCount: 0,
      createAt: '3月10日 13:23',
    },
  ]

  const list = rawQuestionList
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          ListSearch
          {/* <ListSearch /> */}
        </div>
      </div>
      <div className={styles.content}>
        {/* {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )} */}
        loading
        {/* {!loading && list.length === 0 && <Empty description="暂无数据" />} */}
        {list.length > 0 &&
          list.map(q => {
            const { _id } = q
            return <div key={_id}>123</div>
          })}
      </div>
      <div className={styles.footer}>{/* <ListPage total={total} /> */}</div>
    </>
  )
}

export default Star
