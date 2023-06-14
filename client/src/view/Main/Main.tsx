import React, { useEffect } from 'react'
import styles from './Main.module.scss'
import { ChatList } from '@/components/ChatList/ChatList'
import { Empty } from '@/components/Empty/Empty'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '@/utils/FirebaseConfig'
import { useState } from 'react'
import axios from 'axios'
import { CHECK_USER_ROUTE } from '@/utils/ApiRoutes'
import { useRouter } from 'next/router'
import { useStateProvider } from '@/context/StateContext'
import { REDUCER_CASES } from '@/context/constants'
import { Chat } from '@/components/chat/Chat'

export const Main = () => {
  const [redirectLogin, setRedirectLogin] = useState(false)
  const router = useRouter()
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider()

  useEffect(() => {
    if (redirectLogin) router.push('/login')
  }, [redirectLogin])

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true)
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, { email: currentUser.email })
      console.log(data)
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

  return (
    <section className={styles.wrapper}>
      <ChatList />
      {
        currentChatUser ? <Chat /> : <Empty />
      }
      {/* <Empty /> */}
    </section>
  )
}
