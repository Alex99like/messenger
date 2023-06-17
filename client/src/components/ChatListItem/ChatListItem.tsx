import { IUserInfo } from '@/context/StateReducer'
import React from 'react'
import styles from './ChatListItem.module.scss'
import { Avatar } from '../common/Avatar/Avatar'
import Image from 'next/image'
import DefAv from '@/assets/default_avatar.png'
import { IFullUserContact, IUserContact } from '@/types/contact.types'
import { useStateProvider } from '@/context/StateContext'
import { REDUCER_CASES } from '@/context/constants'
import cn from 'clsx'
import { calculateTime } from '@/utils/CalculateTime'
import { MessageStatus } from '../chat/MessageStatus/MessageStatus'
import { FaCamera, FaImage, FaMicrophone } from 'react-icons/fa'

type ChatListItemProps = {
  data: IFullUserContact | IUserContact
  isContractPage?: boolean
}

function isFull(user: IFullUserContact | IUserContact): user is IFullUserContact {
  return (user as IFullUserContact).email !== undefined;
}

export const ChatListItem = ({ data, isContractPage = false }: ChatListItemProps) => {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider()
  const dataMessage = isFull(data)
  const handleContactClick = () => {
    if (!isContractPage) {
      dispatch({
        type: REDUCER_CASES.CHANGE_CURRENT_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePicture: data.profilePicture,
          //@ts-ignore
          email: data.email,
          //@ts-ignore
          id: userInfo?.id === data.senderId ? data.recieverId : data.senderId
        }
      })
    } else {
      dispatch({ type: REDUCER_CASES.CHANGE_CURRENT_CHAT_USER, user: {
        ...data
      } })
      dispatch({ type: REDUCER_CASES.SET_ALL_CONTACTS_PAGE })
    }
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
        <span className={styles.name}>
          {data.name}
          {isFull(data) && data.totalUnreadMessages > 0 && <span className={styles.total}>{data.totalUnreadMessages}</span>}
        </span>
        
        {isContractPage ? (
          <span className={styles.about}>{data.about || '\u00A0'}</span>
        ) : (
          <div className={styles.status}>
            {isFull(data) && (
              <>
                {data.senderId === userInfo?.id && (
                <MessageStatus messageStatus={data.messageStatus} />
                )}
                {data.type === 'text' && (
                  <span className={styles.msg}>{
                    data.message.length > 15 ? `${data.message.slice(0, 15)}...` : data.message
                  }</span>
                )}
                {data.type === 'image' && (
                  <span className={styles.msg}><FaCamera className={styles.icon} /> Image </span>
                )}
                {data.type === 'audio' && (
                  <span className={styles.msg}><FaMicrophone className={styles.icon} /> Audio </span>
                )}
              </>
            )}
            
            {!isContractPage && isFull(data) && (
              <span
                className={
                  `${styles.time} ${data.totalUnreadMessages > 0 ? styles.secondary : styles.green}`
                }
              >
                {calculateTime(data.createdAt)}
              </span>
            )}
          </div>
        )}
        
      </div>
    </div>
  )
}
