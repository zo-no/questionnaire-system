/**
 * @Date        2024/03/03 22:06:18
 * @Author      zono
 * @Description 配置store
 * */

import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
/**
 * @description store的数据结构
 * */
export type StateType = {
  user: UserStateType
  // components: ComponentsStateType
  components: StateWithHistory<ComponentsStateType> // 增加了 undo
  pageInfo: PageInfoType
}

const store = configureStore({
  reducer: {
    user: userReducer,
    // // 没有 undo
    // components: componentsReducer,

    // 增加了 undo
    components: undoable(componentsReducer, {
      limit: 20, // 限制 undo 20 步
      // 屏蔽不重要的 action
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})

export default store
