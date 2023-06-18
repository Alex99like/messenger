import React, { useEffect } from 'react'
import styles from './MessageSearch.module.scss'
import { IoClose } from 'react-icons/io5'
import { useStateProvider } from '@/context/StateContext'
import { REDUCER_CASES } from '@/context/constants'
import { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { IMessage } from '@/types/contact.types'
import { calculateTime } from '@/utils/CalculateTime'
import { MessageStatus } from '../chat/MessageStatus/MessageStatus'

export const MessageSearch = () => {
  const [{ currentChatUser, messages }, dispatch] = useStateProvider() 
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedMessages, setSearchedMessages] = useState<IMessage[]>([])

  useEffect(() => {
    if (searchTerm) {
      setSearchedMessages(
        messages.filter(
          (msg) => msg.type === 'text' && msg.message.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
      )
    } else {
      setSearchedMessages([])
    }
  }, [searchTerm])

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.header}>
        <IoClose 
          onClick={() => dispatch({ type: REDUCER_CASES.SET_MESSAGE_SEARCH })}
        />

      </div> */}
      <div className={styles.search}>
        <input 
          type='text'
          placeholder='Search Messages...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BiSearchAlt2 className={styles.icon} />
      </div>
      {!searchTerm.length && (
        <span className={styles['name-user']}>
          Search for messages with <strong>{currentChatUser?.name}</strong>
        </span>
      )}
      <div>
        {searchTerm.length > 0 && !searchedMessages.length && (
          <span className={styles['no-message']}>
            No messages found
          </span>
        )}
      </div>
      <div className={styles.list}>
        {searchedMessages.map((msg) => (
          <div className={styles.item}>
            <span>{msg.message}</span>
            <div className={styles.data}>
              <span className={styles.time}>
                {calculateTime(msg.createdAt)}
              </span>
              <MessageStatus messageStatus={msg.messageStatus} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
