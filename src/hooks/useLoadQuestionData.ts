/**
 * @Date        2024/02/25 19:30:09
 * @Author      zono
 * @Description 请求单个列表的详情数据的hook
 * */
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

/**
 * 单个列表的详情数据的hook
 * 编辑和统计页面都需要用到
 * @param {type}
 * @returns
 * */
function useLoadQuestionData() {
  const { id = '' } = useParams() // 获取路由参数id
  const dispatch = useDispatch()

  //ajax加载
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  // 请求到数据就执行一次，根据获取的 data 设置 redux store
  useEffect(() => {
    if (!data) return

    const { title = '', desc = '', js = '', css = '', isPublished = false, componentList } = data //解构

    // 设置默认的 selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id // 默认选中第一个组件
    }

    // 把 componentList 存储到 Redux store 中
    dispatch(resetComponents({ selectedId, componentList, copiedComponent: null }))

    // 把 pageInfo 存储到 redux store
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
    // eslint-disable-next-line
  }, [data])

  // 判断 id 变化，执行 ajax 加载问卷数据
  useEffect(() => {
    run(id)
    // eslint-disable-next-line
  }, [id])

  return [loading, error]
}

export default useLoadQuestionData
