/**
 * @Date        2024/03/03 22:47:38
 * @Author      zono
 * @Description 从后端获取用户信息
 * */
import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'

/**
 * @description 从后端获取用户信息,并存储到redux store,如果正在加载中就返回true
 * @returns true：正在加载用户信息
 * @returns false：加载用户信息完成
 * */
function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true) // 是否等待用户信息加载完成

  //设置 ajax 加载用户信息方法
  const { run } = useRequest(getUserInfoService, {
    manual: true, // 是否手动触发
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname })) // 存储到 redux store
    },
    onFinally() {
      setWaitingUserData(false) //false就渲染页面
    },
  })

  // 判断当前 redux store 是否已经存在用户信息
  const { username } = useGetUserInfo() // redux store
  useEffect(() => {
    if (username) {
      setWaitingUserData(false) // 如果 redux store 已经存在用户信息，就不用重新加载了
      return
    }
    run() // 如果 redux store 中没有用户信息，则进行加载
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
