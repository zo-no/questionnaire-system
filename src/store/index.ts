/**
 * @Date        2024/03/03 22:06:18
 * @Author      zono
 * @Description 配置store
 * */

import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'

export type StateType = {
  user: UserStateType
  // components: ComponentsStateType
  // components: StateWithHistory<ComponentsStateType> // 增加了 undo
  // pageInfo: PageInfoType
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export default store
