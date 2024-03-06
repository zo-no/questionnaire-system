/**
 * @Date        2024/02/17 16:02:16
 * @Author      zono
 * @Description 编辑页
 * */
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import { useTitle } from 'ahooks'

import EditHeader from './EditHeader'
import LeftPanel from './LeftPanel'
import EditCanvas from './EditCanvas'
import RightPanel from './RightPanel'

const Edit: FC = () => {
  const dispatch = useDispatch()
  const [loading] = useLoadQuestionData()
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
  // TODO修改标题
  useTitle(`zono问卷——问卷编辑`)

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>

          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading as boolean} />
              {/* {loading ? '正在加载中' : `${JSON.stringify(data)}`} */}
            </div>
          </div>

          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
