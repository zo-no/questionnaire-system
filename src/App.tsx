// import React, { FC, useState, useEffect } from 'react'
import React, { useState } from 'react'
import './App.css'
import { produce } from 'immer'
import QuestionCard from './components/QuestionCard'

function App() {
  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true },
  ])
  function add() {
    const r = Math.random().toString().slice(-3)
    setQuestionList(
      produce(draft => {
        draft.push({
          id: 'q' + r,
          title: '问卷' + r,
          isPublished: false,
        })
      })
    )
  }
  function deleteQuestion(id: string) {
    setQuestionList(
      produce(draft => {
        const index = draft.findIndex(q => q.id === id)
        draft.splice(index, 1)
      })
    )
  }

  function publishQuestion(id: string) {
    setQuestionList(
      produce(draft => {
        const q = draft.find(item => item.id === id)
        if (q) q.isPublished = true
      })
    )
    console.log(id)
  }

  return (
    <>
      <ul>
        {questionList.map(question => {
          const { id, title, isPublished } = question
          return (
            <QuestionCard
              key={id}
              id={id}
              title={title}
              isPublished={isPublished}
              deleteQuestion={deleteQuestion}
              publishQuestion={publishQuestion}
            />
          )
        })}
      </ul>
      <div>
        <button onClick={add}>新增问卷</button>
      </div>
    </>
  )
}

export default App
