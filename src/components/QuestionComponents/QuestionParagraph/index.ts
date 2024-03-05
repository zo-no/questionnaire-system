/**
 * @Date        2024/03/05 15:31:39
 * @Author      zono
 * @Description 段落组件
 * */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'

export * from './interface'

// Paragraph 组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
