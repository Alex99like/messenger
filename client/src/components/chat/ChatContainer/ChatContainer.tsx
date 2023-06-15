import React, { useEffect } from 'react'
import styles from './ChatContainer.module.scss'
import { useStateProvider } from '@/context/StateContext'
import cn from 'clsx'
import { calculateTime } from '@/utils/CalculateTime'
import { MessageStatus } from '../MessageStatus/MessageStatus'
import Image from 'next/image'
import { HOST } from '@/utils/ApiRoutes'

export const ChatContainer = () => {
  const [{ messages, currentChatUser, userInfo }, dispatch] = useStateProvider()
  
  useEffect(() => {
    
  }, [messages]) 

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.bg}> </div> */}
      <div className={styles.list}>
        
        {messages.map((msg) => (
          <div
           key={msg.id}
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
              {msg.type === 'text' && (
                <span className={styles.msg}>
                  {msg.message}
                </span>
              )}
              {msg.type === 'image' && (
                <div className={styles['image-container']}>
                  <Image 
                    src={`${HOST}/${msg.message}`} 
                    alt='' 
                    className={styles.image}
                    //fill
                    width={300}
                    height={200}
                  />
                </div>
                
              )}
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
