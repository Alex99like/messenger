import React, { useEffect, useState } from 'react'
import styles from './ChatList.module.scss'
import { ChatListHeader } from '../chat/ChatListHeader/ChatListHeader'
import { SearchBar } from '../chat/SearchBar/SearchBar'
import { List } from '../chat/List/List'
import { useStateProvider } from '@/context/StateContext'
import { ContactList } from '../ContactList/ContactList'

export const ChatList = () => {
  const [{ contactsPage }] = useStateProvider()
  const [pageType, setPageType] = useState<'all-contacts' | 'default'>("default")

  useEffect(() => {
    if (contactsPage) {
      setPageType('all-contacts')
    } else {
      setPageType('default')
    }
  }, [contactsPage])

  return (
    <div className={styles.wrapper}>
      {pageType === 'default' && (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}
      {pageType === 'all-contacts' && (
        <>
          <ContactList />
        </>
      )}
    </div>
  )
}
