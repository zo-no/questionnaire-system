/**
 * @Date        2024/02/19 17:43:15
 * @Author      zono
 * @Description 统计页
 * */
import { FC } from 'react'

import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const [loading, data] = useLoadQuestionData()
  return (
    <div>
      <h2>Stat</h2>
      {loading ? '正在加载中' : `${JSON.stringify(data)}`}
    </div>
  )
}

export default Stat
