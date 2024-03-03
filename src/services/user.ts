/**
 * @Date        2024/03/03 15:55:59
 * @Author      zono
 * @Description 用户接口,登录注册等
 * */
import axios, { ResDataType } from './ajax'

/**
 * @description 获取用户信息,用token获取，故不需要参数
 * @param {type}
 * @returns
 * */
export async function getUserInfoService(): Promise<ResDataType> {
  const data = (await axios.get('/api/user/info')) as ResDataType
  return data
}

/**
 * @description 登录
 * @param {type}
 * @returns
 * */
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const data = (await axios.post('/api/user/login', { username, password })) as ResDataType
  return data
}

/**
 * @description 注册
 * @param {type}
 * @returns {string}token
 * */
export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const data = (await axios.post('/api/user/register', {
    username,
    password,
    nickname: nickname || undefined,
  })) as ResDataType
  return data
}
