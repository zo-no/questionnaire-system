/**
 * @Date        2024/02/17 16:02:16
 * @Author      zono
 * @Description 编辑页
 * */
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  const { id = '' } = useParams()
  return (
    <div>
      <h2>Edit {id}</h2>
    </div>
  )
}

export default Edit
