/**
 * @Date        2024/02/25 19:30:09
 * @Author      zono
 * @Description 请求单个列表的详情数据的hook
 * */
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'

/**
 * 单个列表的详情数据的hook
 * 编辑和统计页面都需要用到
 * @param {type}
 * @returns
 * */
function useLoadQuestionData() {
  const { id = '' } = useParams() // 获取路由参数id

  const { data, loading, error } = useRequest(async () => {
    const data = await getQuestionService(id)
    return data
  })
  return [loading, data, error]
}

export default useLoadQuestionData
