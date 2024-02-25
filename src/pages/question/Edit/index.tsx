/**
 * @Date        2024/02/17 16:02:16
 * @Author      zono
 * @Description 编辑页
 * */
import { FC } from 'react'

import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const [loading, data] = useLoadQuestionData()
  return (
    <div>
      <h2>Edit</h2>
      {loading ? '正在加载中' : `${JSON.stringify(data)}`}
    </div>
  )
}

export default Edit
