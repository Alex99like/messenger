import React, { useEffect } from 'react'
import styles from './ChatContainer.module.scss'
import { useStateProvider } from '@/context/StateContext'
import cn from 'clsx'
import { calculateTime } from '@/utils/CalculateTime'
import { MessageStatus } from '../MessageStatus/MessageStatus'
import Image from 'next/image'

export const ChatContainer = () => {
  const [{ messages, currentChatUser, userInfo }, dispatch] = useStateProvider()
  
  useEffect(() => {
    console.log(messages)
  }, [messages]) 

  return (
    <div className={styles.wrapper}>
      <div className={styles.bg}/>
      <div className={styles.list}>
        
        {messages.map((msg) => (
          <div
           className={cn(styles.message, {
             [styles.from]: msg.senderId === currentChatUser?.id,
             [styles.to]: msg.recieverId === currentChatUser?.id
           })}
          >
            {msg.senderId === currentChatUser?.id && (
              <Image className={styles.avatar} src={currentChatUser.profilePicture} width={40} height={40} alt='' />
            )}
             {msg.recieverId === currentChatUser?.id && (
              <Image className={styles.avatar} src={userInfo?.profileImage || ''} width={40} height={40} alt='' />
            )}
            <div className={styles.container}>
              <span className={styles.msg}>
                {msg.message}
              </span>
              <div className={styles.date}>
                <span className={styles.time}>
                  {calculateTime(msg.createdAt)}
                </span>
                <MessageStatus messageStatus={msg.messageStatus} />
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}
