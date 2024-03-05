/**
 * @Date        2024/03/04 19:32:02
 * @Author      zono
 * @Description 从redux中获取组件信息的hook
 * */
import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

/**
 * 从redux中获取所有组件信息的hook
 * useSelector是react-redux提供的一个hook，用于从redux中获取数据
 * */
function useGetComponentInfo() {
  const {
    componentList = [],
    selectedId,
    copiedComponent,
  } = useSelector<StateType>(state => state.components.present) as ComponentsStateType

  // 根据selectedId获取选中的组件信息
  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent, copiedComponent }
}

export default useGetComponentInfo
