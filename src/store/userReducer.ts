/**
 * @Date        2024/03/03 22:07:03
 * @Author      zono
 * @Description 用户信息管理
 * */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserStateType {
  username: string
  nickname: string
}

const INIT_STATE: UserStateType = {
  username: '',
  nickname: '',
}

export const userSlice = createSlice({
  name: 'user', //模块名，用于区分slice
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      state = action.payload
      return state // 设置 username nickname 到 redux store
    },

    logoutReducer: () => INIT_STATE,
  },
})

// 导出actions中的方法
export const { loginReducer, logoutReducer } = userSlice.actions
export default userSlice.reducer
