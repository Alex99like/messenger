import React, { useEffect, useRef } from 'react'
import styles from './Main.module.scss'
import { ChatList } from '@/components/ChatList/ChatList'
import { Empty } from '@/components/Empty/Empty'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '@/utils/FirebaseConfig'
import { useState } from 'react'
import axios from 'axios'
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from '@/utils/ApiRoutes'
import { useRouter } from 'next/router'
import { useStateProvider } from '@/context/StateContext'
import { REDUCER_CASES } from '@/context/constants'
import { Chat } from '@/components/chat/Chat'
import { io, Socket } from 'socket.io-client'
import { MessageSearch } from '@/components/MessageSearch/MessageSearch'

export const Main = () => {
  const [redirectLogin, setRedirectLogin] = useState(false)
  const router = useRouter()
  const [{ userInfo, currentChatUser, messagesSearch }, dispatch] = useStateProvider()
  const [socketEvent, setSocketEvent] = useState(false)
  const socket = useRef<Socket>()

  useEffect(() => {
    if (redirectLogin) router.push('/login')
  }, [redirectLogin])

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true)
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, { email: currentUser.email })
      if (!data.status) {
        router.push('/login')
      }

      const { id, name, email, profilePicture: profileImage, status } = data.data
      dispatch({
        type: REDUCER_CASES.SET_USER_INFO,
        userInfo: { 
          id,
          name,
          email, 
          profileImage, 
          status
        }
      })
    }
  })

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit('add-user', userInfo.id)
      dispatch({ type: REDUCER_CASES.SET_SOCKET, socket: socket.current })
    }
  }, [userInfo])

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on('msg-recieve', (data) => {
        dispatch({
          type: REDUCER_CASES.ADD_MESSAGE,
          newMessage: {
            ...data.message,
          },
          fromSelf: true
        })
      })
      setSocketEvent(true)
    }
  }, [socket.current])

  useEffect(() => {
    const getMessages = async () => {
      console.log(`${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`)
      const { data } = await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`)
      dispatch({ type: REDUCER_CASES.SET_MESSAGE, messages: data.messages })
    }
    
    if (userInfo?.id && currentChatUser?.id) {
      getMessages()
    }
  }, [currentChatUser])

  return (
    <section className={styles.wrapper}>
      <ChatList />
      {
        currentChatUser ? (
          <>
            <Chat />
            {messagesSearch && <MessageSearch />}
          </>
        ) : (
          <Empty />
        )
      }
      {/* <Empty /> */}
    </section>
  )
}
