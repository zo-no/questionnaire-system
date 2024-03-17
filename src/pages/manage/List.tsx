/**
 * @Date        2024/03/17 16:59:42
 * @Author      zono
 * @Description 我的问卷页
 * */
import React, { FC, useEffect, useState, useRef, useMemo } from 'react'

import QuestionCard from '../../components/QuestionCard'
import { useSearchParams } from 'react-router-dom'
import { Typography, Spin, Empty } from 'antd'
import { getQuestionListService } from '../../services/question'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant/index'
import styles from './common.module.scss'

const { Title } = Typography

const List: FC = () => {
  useTitle('zono-我的问卷')

  const [started, setStarted] = useState(false) // 是否已经开始加载（防抖，有延迟时间）
  const [page, setPage] = useState(1) // List 内部的数据，不在 url 参数中体现
  const [List, setList] = useState([]) // 全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0)
  const haveMoreData = total > List.length // 判断是否有未加载的数据

  const [searchParams] = useSearchParams() // url 参数，虽然没有 page pageSize ，但有 keyword

  // keyword 变化时，重置信息
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  /**
   * @description  加载数据的函数
   * @param {type}
   * @returns {run:Function} run: 加载数据的触发器
   * */
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE, //每次加载数量：默认10
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { List: l = [], total = 0 } = result
        setList(List.concat(l)) // 累计
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  const containerRef = useRef<HTMLDivElement>(null)

  /**
   * 滑动就执行刷新函数，满足条件就触发加载函数
   * @see https://ahooks.js.org/zh-CN/hooks/use-debounce-fn
   * @returns {run: Function} run: 防抖函数的触发器
   * */
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current // 获取当前元素
      if (elem == null) return
      const domRect = elem.getBoundingClientRect() // 获取元素的大小及其相对于视口的位置
      if (domRect == null) return // 如果没有获取到元素的大小及其相对于视口的位置，直接返回
      const { bottom } = domRect // 获取元素的底部
      // 如果元素的底部小于等于视口的高度，就加载数据
      if (bottom <= document.body.clientHeight) {
        load() // 加载数据
        setStarted(true)
      }
    },
    {
      wait: 1000, // 防抖时间
    }
  )

  // -----------------------------------------------------------------------数据加载-----------------------------------------------------------------------
  // 检测 url 参数变化，触发加载
  // 1. 当页面加载，或者 url 参数（keyword）变化时，触发加载
  useEffect(() => {
    tryLoadMore() // 加载第一页，初始化
  }, [searchParams, tryLoadMore])

  // 2. 当页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore) // 防抖
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore) // 解绑事件，重要！！！
    }
  }, [searchParams, haveMoreData, tryLoadMore])

  // LoadMore 显示组件
  const LoadMoreContentElem = useMemo(() => {
    // 1. 未加载、正在加载，显示 Spin
    if (!started || loading) return <Spin />
    // 2. 加载完成，无数据，显示 Empty
    if (total === 0) return <Empty description="暂无数据" />
    // 3. 拉到底部
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData, total])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {List.length > 0 &&
          List.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>

      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
