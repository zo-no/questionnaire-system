import axios, { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

/**
 * 获取单个接口
 * @returns
 * */
export async function getQuestionService(id?: string): Promise<ResDataType> {
  const data = (await axios.get(`/api/question/${id}`)) as ResDataType
  return data
}

/**
 * 创建问卷
 * */
export async function createQuestionService(): Promise<ResDataType> {
  const data = (await axios.post(`/api/question`)) as ResDataType
  return data
}

// 获取（查询）问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOption> = {} // Partial<SearchOption>表示SearchOption的所有属性都是可选的
): Promise<ResDataType> {
  const data = (await axios.get('/api/question', { params: opt })) as ResDataType
  // console.log(opt)
  return data
}
