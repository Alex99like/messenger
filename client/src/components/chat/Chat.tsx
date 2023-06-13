import React from 'react'
import styles from './Chat.module.scss'
import { ChatHeader } from './ChatHeader/ChatHeader'
import { ChatContainer } from './ChatContainer/ChatContainer'
import { MessageBar } from './MessageBar/MessageBar'

export const Chat = () => {
  return (
    <div className={styles.wrapper}>
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  )
}
