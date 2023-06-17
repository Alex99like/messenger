import { useStateProvider } from '@/context/StateContext'
import { REDUCER_CASES } from '@/context/constants'
import { GET_INITIAL_CONTACTS_ROUTE } from '@/utils/ApiRoutes'
import axios from 'axios'
import styles from './List.module.scss'
import React, { useEffect } from 'react'
import { ChatListItem } from '@/components/ChatListItem/ChatListItem'

export const List = () => {
  const [{ userInfo, userContacts, filteredContacts }, dispatch] = useStateProvider()

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { 
          data: { users, onlineUsers } 
        } = await axios(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo?.id}`)

        dispatch({ type: REDUCER_CASES.SET_ONLINE_USERS, onlineUsers })
        dispatch({ type: REDUCER_CASES.SET_USER_CONTACTS, userContacts: users })
        
      } catch(err) {
        console.log(err)
      }
    }
    userInfo && getContacts()
  }, [userInfo])

  return (
    <div className={styles.wrapper}>
      {
        filteredContacts && filteredContacts.length > 0 ? (
          <>
            {filteredContacts.map((contact) => (
              <ChatListItem data={contact} />
            ))}
          </>
        ) : (
          <>
            {userContacts.map((contact) => (
              <ChatListItem data={contact} />
            ))}
          </>          
        )
      }
      
    </div>
  )
}
