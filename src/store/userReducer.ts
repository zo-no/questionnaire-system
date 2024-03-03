/**
 * @Date        2024/03/03 22:07:03
 * @Author      zono
 * @Description 用户信息管理
 * payloadAction:是一个包含了action的payload的对象
 * action:是一个包含了type和payload的对象
 * type:是一个字符串，用来描述action的类型
 * payload:是一个任意类型的值，用来描述action的有效负载
 * 有效负载是一个包含了action的数据的对象
 * reducer:是一个函数，用来处理action的状态
 * 一个reducer是一个纯函数，它接收旧的state和action，返回新的state
 * reducer被初始化后，存储在store中，使用action.type来调用
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
      return action.payload // 设置 username nickname 到 redux store
      // 用不到 immer
    },
    logoutReducer: () => INIT_STATE,
  },
})

// 导出actions中的方法
export const { loginReducer, logoutReducer } = userSlice.actions
export default userSlice.reducer
