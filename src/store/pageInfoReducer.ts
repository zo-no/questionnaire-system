/**
 * @Date        2024/03/05 19:18:08
 * @Author      zono
 * @Description 页面信息管理
 * */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
export interface PageInfoType {
  title: string
  desc?: string // 页面描述
  css?: string //样式
  js?: string //脚本
  isPublished?: boolean
}
const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  css: '',
  js: '',
  isPublished: undefined,
}

export const pageInfoReducer = createSlice({
  name: 'pageInfo', //模块名，用于区分slice
  initialState: INIT_STATE,
  reducers: {
    // 设置页面信息
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      state = action.payload
      return state
    },

    // 修改标题
    changePageTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
      draft.title = action.payload
    }),
  },
})
export const { resetPageInfo, changePageTitle } = pageInfoReducer.actions
export default pageInfoReducer.reducer
