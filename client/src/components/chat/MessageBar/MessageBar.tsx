import React, { useState } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { ImAttachment } from 'react-icons/im'
import styles from './Message.module.scss'
import { MdSend } from 'react-icons/md'
import { FaMicrophone } from 'react-icons/fa'
import { useStateProvider } from '@/context/StateContext'
import axios from 'axios'
import { ADD_MESSAGE_ROUTE } from '@/utils/ApiRoutes'
import { REDUCER_CASES } from '@/context/constants'

export const MessageBar = () => {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider()
  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message
      })
      socket?.emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message
      })
      dispatch({
        type: REDUCER_CASES.ADD_MESSAGE,
        newMessage: {
          ...data.message
        },
        // fromSelf: true
      })
      setMessage('')
    } catch(err) {
      console.log(err)
    }
  }

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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='message...'
      />
      {/* <button className={styles.send}>
        <FaMicrophone />
      </button> */}
      <button 
        className={styles.send}
        onClick={sendMessage}
      >
        <MdSend />
      </button>
      
    </div>
  )
}
