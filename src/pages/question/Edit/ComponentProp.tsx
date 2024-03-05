/**
 * @Date        2024/03/04 22:41:51
 * @Author      zono
 * @Description 点击组件后，显示的组件属性面板
 * */
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'

/**
 * @description 未选中组件时的显示
 * */
const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()

  //未选中
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />

  // 获取选中组件的 设置属性的组件
  const { type, props, isLocked } = selectedComponent
  const componentConf = getComponentConfByType(type)

  // 如果没有配置文件
  if (componentConf == null) return <NoProp />

  // 改变属性时，修改redux
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  //取出属性修改组件渲染
  const { PropComponent } = componentConf
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked} />
}

export default ComponentProp
