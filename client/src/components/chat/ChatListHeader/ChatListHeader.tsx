import React from 'react'
import styles from './ChatListHeader.module.scss'
import { Avatar } from '@/components/common/Avatar/Avatar'
import { useStateProvider } from '@/context/StateContext'
import DefAv from '@/assets/default_avatar.png'
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from 'react-icons/bs'
import { REDUCER_CASES } from '@/context/constants'

export const ChatListHeader = () => {
  const [{ userInfo }, dispatch] = useStateProvider()

  const handleAllContactsPage = () => {
    dispatch({ type: REDUCER_CASES.SET_ALL_CONTACTS_PAGE })
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <Avatar 
          type='sm' 
          image={userInfo?.profileImage || DefAv} 
          setImage={() => {}} 
        />
      </div>
      <div className={styles.icons}>
        <BsFillChatLeftTextFill 
          onClick={handleAllContactsPage}
        />
        <BsThreeDotsVertical />
      </div>
    </div>
  )
}
