/**
 * @Date        2024/03/05 15:36:37
 * @Author      zono
 * @Description 问卷信息组件
 * 结合title和paragraph组件的写法，将问卷信息组件的配置写在index.ts中
 * */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export * from './interface'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}
