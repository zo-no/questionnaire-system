/**
 * @Date        2024/03/03 22:51:09
 * @Author      zono
 * @Description 判断是否登录，如果没有登录就跳转到登录页面
 * */
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  MANAGE_INDEX_PATHNAME,
  LOGIN_PATHNAME,
} from '../router/index'

/**
 * @description 判断是否登录，如果没有登录就跳转到登录页面
 * @param  {boolean}waitingUserData boolean ：是否正在加载用户信息
 * @returns void执行对应的跳转
 * */
function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo() //获取redux中的用户信息
  const { pathname } = useLocation() //获取当前页面的路径
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return // 如果正在加载用户信息，就不用进行跳转了

    // 已经登录了
    if (username) {
      // 如果是登录或者注册页面，就跳转到首页
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    // 未登录 跳转到登录页面
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
