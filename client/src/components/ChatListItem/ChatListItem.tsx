import { IUserInfo } from '@/context/StateReducer'
import React from 'react'
import styles from './ChatListItem.module.scss'
import { Avatar } from '../common/Avatar/Avatar'
import Image from 'next/image'
import DefAv from '@/assets/default_avatar.png'
import { IUserContact } from '@/types/contact.types'
import { useStateProvider } from '@/context/StateContext'
import { REDUCER_CASES } from '@/context/constants'

type ChatListItemProps = {
  data: IUserContact
  isContractPage: boolean
}

export const ChatListItem = ({ data, isContractPage = false }: ChatListItemProps) => {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider()
  const handleContactClick = () => {
    dispatch({ type: REDUCER_CASES.CHANGE_CURRENT_CHAT_USER, user: {
      ...data
    } })
    dispatch({ type: REDUCER_CASES.SET_ALL_CONTACTS_PAGE })
    // if (currentChatUser?.id === data?.id) {
    //   dispatch({ type: REDUCER_CASES.CHANGE_CURRENT_CHAT_USER, user: {
    //     ...data
    //   } })
    //   dispatch({ type: REDUCER_CASES.SET_ALL_CONTACTS_PAGE })
    // }
  }

  return (
    <div className={styles.wrapper}
      onClick={handleContactClick}
    >
      <div>
        <Avatar 
          image={data.profilePicture || DefAv}
          type='lg'
        />
      </div>
      <div className={styles.data}>
        <span className={styles.name}>{data.name}</span>
        <span className={styles.about}>{data.about || '\u00A0'}</span>
      </div>
    </div>
  )
}
