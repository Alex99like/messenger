import React from 'react'
import styles from './ChatList.module.scss'
import { ChatListHeader } from '../chat/ChatListHeader/ChatListHeader'
import { SearchBar } from '../chat/SearchBar/SearchBar'
import { List } from '../chat/List/List'

export const ChatList = () => {
  return (
    <div className={styles.wrapper}>
      <ChatListHeader />
      <SearchBar />
      <List />
    </div>
  )
}
