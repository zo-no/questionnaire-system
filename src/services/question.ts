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
/**
 * 获取问卷列表
 * @param {SearchOption} opt - 查询条件
 * @returns
 * */
export async function getQuestionListService(
  opt: Partial<SearchOption> = {} // Partial<SearchOption>表示SearchOption的所有属性都是可选的
): Promise<ResDataType> {
  const data = (await axios.get('/api/question', { params: opt })) as ResDataType
  // console.log(opt)
  return data
}

/**
 * @description 更新单个问卷
 * @param {type}
 * @returns
 * */
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const res = (await axios.patch(`/api/question/${id}`, opt)) as ResDataType
  return res
}

/**
 * @description 复制
 * @param {type}
 * @returns
 * */
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const res = (await axios.post(`/api/question/duplicate/${id}`)) as ResDataType
  return res
}

/**
 * @description 彻底删除问卷
 * @param {type}
 * @returns
 * */
export async function deleteQuestionsService(ids: string[]): Promise<ResDataType> {
  const res = (await axios.delete(`/api/question`, { data: { ids } })) as ResDataType
  return res
}
