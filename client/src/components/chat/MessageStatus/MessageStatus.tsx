import React from 'react'
import { BsCheck, BsCheckAll } from 'react-icons/bs'
import styles from './MessageStatus.module.scss'
import cn from 'clsx'

export const MessageStatus = ({ messageStatus }: { messageStatus: 'sent' | 'delivered' | 'read' }) => {
  return (
    <>
      {messageStatus === 'sent' && <BsCheck className={cn(styles.status)} />}
      {messageStatus === 'delivered' && <BsCheckAll className={cn(styles.status)} />}
      {messageStatus === 'read' && <BsCheckAll className={cn(styles.status)} />}
    </>
  )
}
