import React, { FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'

import { addComponent } from '../../../store/componentsReducer'
import { ComponentConfType, componentConfGroup } from '../../../components/QuestionComponents'

import styles from './ComponentLib.module.scss'

const { Title } = Typography

/**
todo封装
 * @description 通过组件类型获取组件配置
 * */
function genComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c // 每个组件的信息，是从 redux store 获取的（服务端获取）
  // eslint-disable-next-line
  const dispatch = useDispatch()

  // eslint-disable-next-line
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(), // 前端生成的 id
        title,
        type,
        props: defaultProps,
      })
    )
    // eslint-disable-next-line
  }, [])

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default Lib
