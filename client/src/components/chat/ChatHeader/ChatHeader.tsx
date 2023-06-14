import { Avatar } from '@/components/common/Avatar/Avatar'
import React from 'react'
import styles from './ChatHeader.module.scss'
import { MdCall } from 'react-icons/md'
import { IoVideocam } from 'react-icons/io5'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useStateProvider } from '@/context/StateContext'
import DefAv from '@/assets/default_avatar.png'

export const ChatHeader = () => {
  const [{ currentChatUser }] = useStateProvider()

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
       <Avatar image={currentChatUser?.profilePicture || DefAv} type='sm'/>
       <div className={styles.name}>
         <h3>{currentChatUser?.name}</h3>
         <span>{'online/offline'}</span>
       </div>
      </div>
      <div className={styles.icons}>
        <MdCall />
        <IoVideocam />
        <BiSearchAlt2 />
        <BsThreeDotsVertical />
      </div>
    </div>
  )
}
