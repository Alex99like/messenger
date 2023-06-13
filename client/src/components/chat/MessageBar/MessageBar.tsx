import React from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { ImAttachment } from 'react-icons/im'
import styles from './Message.module.scss'
import { MdSend } from 'react-icons/md'
import { FaMicrophone } from 'react-icons/fa'

export const MessageBar = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <BsEmojiSmile className={styles.icon} />
      </div>
      <div>
        <ImAttachment className={styles.icon} />
      </div>
      <input
        className={styles.message}
        type='text'
        placeholder='message...'
      />
      {/* <button className={styles.send}>
        <FaMicrophone />
      </button> */}
      <button className={styles.send}>
        <MdSend />
      </button>
      
    </div>
  )
}
