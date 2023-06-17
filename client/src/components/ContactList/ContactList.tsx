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
  const [searchTerm, setSearchTerm] = useState('')
  const [searchContact, setSearchContact] = useState<Record<string, IUserContact[]>>({})
  const [{}, dispatch] = useStateProvider()

  useEffect(() => {
    if (searchTerm.length) {
      const filteredData: Record<string, IUserContact[]> = {}
      Object.keys(allContacts).forEach((key) => {
        filteredData[key] = allContacts[key].filter((obj) => obj.name.toLowerCase().includes(searchTerm.toLowerCase()))
      })
      setSearchContact(filteredData)
    } else {
      setSearchContact(allContacts)
    }
  }, [searchTerm])

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data: { users } } = await axios.get(GET_ALL_CONTACTS)
        setAllContacts(users)
        setSearchContact(users)
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
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <BiFilter className={styles['filter-icon']} />
      </div>
      <div className={styles.list}>
        {Object.entries(searchContact).map(([initialLetter, userList]) => {
          return (
            <div key={Date.now() + initialLetter}>
              {userList.length > 0 && (
                <span className={styles['init-letter']}>
                  {initialLetter}
                </span>
              )}
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
