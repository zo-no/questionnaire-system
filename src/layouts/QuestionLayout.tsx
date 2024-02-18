import React from 'react'
import { Outlet } from 'react-router-dom'

export default function QuestionLayout() {
  return (
    <div>
      <h2>QuestionLayout</h2>
      <Outlet />
    </div>
  )
}
