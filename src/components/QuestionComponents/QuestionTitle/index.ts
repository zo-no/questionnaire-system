/**
 * @Date        2024/03/04 14:46:46
 * @Author      zono
 * @Description 问卷标题组件
 * */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// Title 基础组件的配置（初始化时使用）
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
}
