/**
 * @Date        2024/03/03 22:32:52
 * @Author      zono
 * @Description 从redux中获取用户信息
 * */

import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'

export const useGetUserInfo = () => {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
  return { username, nickname }
}
export default useGetUserInfo
