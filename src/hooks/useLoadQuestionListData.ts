/**
 * @Date        2024/02/25 19:34:20
 * @Author      zono
 * @Description 请求列表数据的hook
 * */
import { useSearchParams } from 'react-router-dom'

import { getQuestionListService } from '../services/question'
import { useRequest } from 'ahooks'
import { LIST_SEARCH_PARAM_KEY } from '../constant/index'

/**
 * 单个列表的详情数据的hook
 * @param {type}
 * @returns
 * */
function useLoadQuestionListData() {
  const [searchParams] = useSearchParams()

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

      const data = await getQuestionListService({ keyword })
      return data
    },
    {
      refreshDeps: [searchParams], // 当searchParams变化时重新请求
    }
  )
  return { data, loading, error }
}

export default useLoadQuestionListData
