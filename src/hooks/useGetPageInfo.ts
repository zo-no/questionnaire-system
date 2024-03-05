/**
 * @Date        2024/03/05 19:25:05
 * @Author      zono
 * @Description 获取页面信息
 * */
import { useSelector } from 'react-redux'
import { PageInfoType } from '../store/pageInfoReducer'
import { StateType } from '../store'

export default function useGetPageInfo() {
  return useSelector<StateType, PageInfoType>(state => state.pageInfo)
}
