import { GET_ALL_CONTACTS } from '@/utils/ApiRoutes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './ContactList.module.scss'
import { BiArrowBack, BiFilter, BiSearchAlt2 } from 'react-icons/bi'
import { useStateProvider } from '@/context/StateContext'
import { REDUCER_CASES } from '@/context/constants'
import { ChatListItem } from '../ChatListItem/ChatListItem'
import { IUserInfo } from '@/context/StateReducer'
import { IUserContact } from '@/types/contact.types'

export const ContactList = () => {
  const [allContacts, setAllContacts] = useState<Record<string, IUserContact[]>>({})

  const [{}, dispatch] = useStateProvider()

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data: { users } } = await axios.get(GET_ALL_CONTACTS)
        setAllContacts(users)
      } catch(err) {
        console.log(err)
      }    
    }
    getContacts()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <BiArrowBack 
          className={styles.back}
          onClick={() => dispatch({ type: REDUCER_CASES.SET_ALL_CONTACTS_PAGE })}
        />
        <span>New Chat</span>
      </div>
      <div className={styles.search}>
        <BiSearchAlt2 className={styles['search-icon']} />
        <input  
          type='text'
          placeholder='Search or start a new chat...'
        />
        <BiFilter className={styles['filter-icon']} />
      </div>
      <div className={styles.list}>
        {Object.entries(allContacts).map(([initialLetter, userList]) => {
          return (
            <div key={Date.now() + initialLetter}>
              <span className={styles['init-letter']}>{initialLetter}</span>
              {userList.map(contact => (
                <ChatListItem 
                  data={contact}
                  key={contact.id}
                  isContractPage={true} 
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
