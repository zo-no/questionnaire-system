import React, { FC, useMemo, useRef } from 'react'
import { Space, Button, Typography, Input, Tooltip, message, Popover } from 'antd'
import type { InputRef } from 'antd'
import { CopyOutlined, QrcodeOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import QRCode from 'qrcode.react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import styles from './StatHeader.module.scss'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { title, isPublished } = useGetPageInfo()

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select() // 选中 input 的内容
    document.execCommand('copy') // 拷贝选中内容 （富文本编辑器的操作）
    message.success('拷贝成功')
  }

  // 生成链接和二维码组件
  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null
    // 拼接 url ，需要参考 C 端的规则
    const url = `http://localhost:3000/question/${id}`
    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        {/* 根据url生成二维码 */}
        <QRCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />

        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>

        {/* 弹出二维码 */}
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }, [id, isPublished, title])

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRCodeElem}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
