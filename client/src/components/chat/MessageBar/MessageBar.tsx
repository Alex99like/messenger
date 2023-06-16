import React, { useEffect, useRef, useState, MouseEvent } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { ImAttachment } from 'react-icons/im'
import styles from './Message.module.scss'
import { MdSend } from 'react-icons/md'
import { FaMicrophone } from 'react-icons/fa'
import { useStateProvider } from '@/context/StateContext'
import axios from 'axios'
import { ADD_IMAGE_MESSAGE_ROUTE, ADD_MESSAGE_ROUTE } from '@/utils/ApiRoutes'
import { REDUCER_CASES } from '@/context/constants'
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react'
import { PhotoPicker } from '@/components/common/PhotoPicker/PhotoPicker'
import dynamic from 'next/dynamic'

const CaptureAudio = dynamic(() => import('@/components/common/CaptureAudio/CaptureAudio'), { ssr: false })

export const MessageBar = () => {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider()
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const [grabPhoto, setGrabPhoto] = useState(false)
  const [showAudioRecorder, setShowAudioRecorder] = useState(false)


  const photoPickerChange = async (e: any) => {
    try {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      const { data, status } = await axios.post(ADD_IMAGE_MESSAGE_ROUTE, formData, {
        params: {
          from: userInfo?.id,
          to: currentChatUser?.id
        },
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
      
      if (status === 201) {
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
          fromSelf: true
        })
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      //@ts-ignore
      if (event.target.id !== 'emoji-open') {
        //@ts-ignore
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
          setShowEmojiPicker(false)
        }
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  const handleEmojiModal = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiCLick = (emoji: EmojiClickData) => {
    setMessage((prev) => (prev += emoji.emoji))
  }

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
        fromSelf: true
      })
      setMessage('')
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById('photo-picker')
      data?.click();
      document.body.onfocus = () => {
        setTimeout(() => {
            setGrabPhoto(false)
        }, 1000)
        
      }
    }
  }, [grabPhoto])

  return (
    <div className={styles.wrapper}>
      {!showAudioRecorder && (
        <>
          <div className={styles.emoji}>
            {showEmojiPicker && 
              (<div ref={emojiPickerRef} className={styles['emoji-container']}>
                <EmojiPicker 
                  theme={Theme.DARK} 
                  onEmojiClick={handleEmojiCLick}
                />
              </div>)}
            <BsEmojiSmile 
              className={styles.icon}
              id="emoji-open"
              onClick={handleEmojiModal}
            />
            
          </div>
          <div>
            <ImAttachment 
              className={styles.icon}
              onClick={() => setGrabPhoto(true)} 
            />
          </div>
          <input
            className={styles.message}
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='message...'
          />
          <button className={styles.send}>
            <FaMicrophone 
              onClick={() => setShowAudioRecorder(true)}
            />
          </button>
          <button 
            className={styles.send}
            onClick={sendMessage}
          >
            <MdSend />
          </button>
        </>
      )}
      
      {grabPhoto && (
        <PhotoPicker  
          onChange={photoPickerChange}
        />
      )}
      {showAudioRecorder && (
        <CaptureAudio 
          hide={setShowAudioRecorder}
        />
      )}
    </div>
  )
}
