/**
 * @Date        2024/03/04 21:50:20
 * @Author      zono
 * @Description 存储组件列表
 * */
import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft
  // 找到选中的组件
  const index = componentList.findIndex(c => c.fe_id === selectedId)

  if (index < 0) draft.componentList.push(newComponent) // 未选中任何组件
  else draft.componentList.splice(index + 1, 0, newComponent) // 选中了组件，插入到 index 后面
  draft.selectedId = newComponent.fe_id
}

/**
 * 传入当前的 id，返回下一个选中的 id
 * @param fe_id 当前的 id
 * @param componentList 组件列表
 * @returns 下一个选中的 id
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(c => !c.isHidden) // 过滤掉隐藏的组件
  // 找到当前要删除或隐藏的这个组件
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return '' //未找到，就返回空

  // 重新计算 selectedId
  let newSelectedId = ''
  if (visibleComponentList.length <= 1) newSelectedId = ''
  // 组件长度就一个，被删除了，就没有组件
  else {
    // 如果是第一个，就选中下一个，否则选中上一个（在会显示的前提下）
    if (index === 0) newSelectedId = visibleComponentList[index + 1].fe_id
    // 要删除最后一个，就要选中上一个
    else newSelectedId = visibleComponentList[index - 1].fe_id
  }

  return newSelectedId
}
