/**
 * @Date        2024/03/04 16:09:10
 * @Author      zono
 * @Description 存储组件列表
 * */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { produce } from 'immer'
import { cloneDeep } from 'lodash'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
import { getNextSelectedId, insertNewComponent } from './utils'

/**
 * @description 每个组件都有的组件type
 * */
export type ComponentInfoType = {
  fe_id: string //后面解释： 前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

/**
 * @description 管理当前 数据列表 数据结构的type
 * */
export type ComponentsStateType = {
  selectedId: string //记录选中的组件id
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

//默认
const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      state = action.payload
      return state
    },
    // 修改 selectedId
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload //immer
    }),

    //添加组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        insertNewComponent(draft, newComponent)
      }
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        // 从action中获取参数
        const { fe_id, newProps } = action.payload

        // 找到当前要修改属性的这个组件
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)

        if (curComp)
          curComp.props = {
            ...curComp.props, //保留原来的属性
            ...newProps, //覆盖新的属性
          }
      }
    ),

    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      // 从draft中获取参数
      const { componentList = [], selectedId: removedId } = draft

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removedId, componentList)
      draft.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id === removedId)
      componentList.splice(index, 1)
    }),

    // 隐藏选中的组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft

        const { fe_id, isHidden } = action.payload

        // 重新计算 selectedId
        let newSelectedId = ''
        if (isHidden) newSelectedId = getNextSelectedId(fe_id, componentList)
        else newSelectedId = fe_id // 要显示

        draft.selectedId = newSelectedId

        // 找到当前要修改属性的这个组件
        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) curComp.isHidden = isHidden
      }
    ),

    // 锁定/解锁 组件（修改locked值）
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload

        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),

    //copy组件
    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft
      // 找到当前选中的组件
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponent == null) return
      // 把内容拷贝到copiedComponent
      draft.copiedComponent = cloneDeep(selectedComponent) // 深拷贝
    }),

    //粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return

      // 修改 fe_id ，重要！！
      copiedComponent.fe_id = nanoid()

      // 插入 copiedComponent
      insertNewComponent(draft, copiedComponent)
    }),

    //选上一个组件、下一个组件
    selectComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ direction: string }>) => {
        const { selectedId, componentList } = draft
        const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

        const direction = action.payload.direction
        if (direction === 'up') {
          //上一个组件
          if (selectedIndex < 0 || selectedIndex <= 0) return // 未选中组件 或者 已经选中了第一个，无法在向上选中
          draft.selectedId = componentList[selectedIndex - 1].fe_id
        } else if (direction === 'down') {
          //下一个组件
          if (selectedIndex < 0) return // 未选中组件
          if (selectedIndex + 1 === componentList.length) return // 已经选中了最后一个，无法再向下选中
          draft.selectedId = componentList[selectedIndex + 1].fe_id
        }
      }
    ),
    changeComponentTitle: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { fe_id, title } = action.payload
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) curComp.title = title
      }
    ),
    // 移动组件位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curComponentList } = draft
        const { oldIndex, newIndex } = action.payload

        //移动componentList列表元素的位置
        draft.componentList = arrayMove(curComponentList, oldIndex, newIndex)
      }
    ),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  moveComponent,
} = componentsSlice.actions

//上部工具栏
export const {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectComponent,
} = componentsSlice.actions

//左边layout
export const { changeComponentTitle } = componentsSlice.actions
export default componentsSlice.reducer
