/**
 * @Date        2024/03/04 14:49:27
 * @Author      zono
 * @Description 画布页面
 * */
import React, { FC } from 'react'
import { Spin } from 'antd'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

import { useDispatch } from 'react-redux'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'

import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents/index'

import classNames from 'classnames'
import styles from './EditCanvas.module.scss'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

type PropsType = {
  loading: boolean
}

/**
 * @description 通过组件类型获取组件配置
 * */
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo // 每个组件的信息，是从 redux store 获取的（服务端获取）

  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null

  const { Component } = componentConf //取出组件配置中的组件主要显示代码
  return <Component {...props} /> //传入后端获取的props
}

/**
 * @description 编辑页画布
 * */
const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo() // 每次组件列表发生变化，都会重新获取组件列表
  const dispatch = useDispatch() // 获取 dispatch 方法
  useBindCanvasKeyPress() // 绑定画布快捷键
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c

            // 拼接 class name
            // todo响应式
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected // 被选中的组件的样式
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            })

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={e => {
                    e.stopPropagation() // 阻止冒泡
                    dispatch(changeSelectedId(fe_id))
                  }}
                >
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
