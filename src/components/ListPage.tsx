/**
 * @Date        2024/02/26 22:26:44
 * @Author      zono
 * @Description 分页栏组件
 * @see https://ant.design/components/pagination-cn
 * */
import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant/index'

type PropsType = {
  total: number
}

/**
 * 分页栏组件
 * @param {number} total - 总条数
 * @returns
 * */
const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  // 从url中获取page、pageSize
  const [searchParams] = useSearchParams()
  // 更新数据，获取page、pageSize存入state
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setPageSize(pageSize)
  }, [searchParams])

  // 当 page pageSize 改变时，跳转页面（改变 url 参数）
  const nav = useNavigate()

  const { pathname } = useLocation()
  //每次点击后都修改url，并跳转页面
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())

    nav({
      pathname,
      search: searchParams.toString(), // 除了改变 page pageSize 之外，其他的 url 参数要带着
    })
  }

  return (
    <Pagination current={current} onChange={handlePageChange} pageSize={pageSize} total={total} />
  )
}

export default ListPage
