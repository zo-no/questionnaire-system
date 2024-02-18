import React, { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
// import { produce } from 'immer'
import { useTitle } from 'ahooks'
import ListSearch from '../../components/ListSearch'

const rawQuestionList = [
  {
    id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '3月10日 13:23',
  },
  {
    id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 0,
    createAt: '3月10日 13:23',
  },
  {
    id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 0,
    createAt: '3月10日 13:23',
  },
  {
    id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: '3月10日 13:23',
  },
]

const List: FC = () => {
  useTitle('zono-我的问卷')
  const [searchParams] = useSearchParams()
  console.log('searchParams', searchParams.get('page'))
  //设置模拟数据
  // const [questionList, setQuestionList] = useState(rawQuestionList)
  const questionList = rawQuestionList
  // setQuestionList(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h2 style={{ display: 'float' }}>我的问卷</h2>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.map(question => {
          const { id, title, isPublished, isStar, answerCount, createAt } = question
          return (
            <QuestionCard
              key={id}
              _id={id}
              title={title}
              isPublished={isPublished}
              isStar={isStar}
              answerCount={answerCount}
              createdAt={createAt}
            />
          )
        })}
      </div>
      <div className={styles.footer}>list-footer</div>
    </>
  )
}

export default List
