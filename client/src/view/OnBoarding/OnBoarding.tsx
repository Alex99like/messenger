import { useStateProvider } from '@/context/StateContext'
import React, { useEffect, useState } from 'react'
import styles from './OnBoarding.module.scss'
import { Input } from '@/components/common/Input/Input'
import AvatarDefault from '@/assets/default_avatar.png'
import { Avatar } from '@/components/common/Avatar/Avatar'
import axios from 'axios'
import { ONBOARD_USER_ROUTE } from '@/utils/ApiRoutes'
import { REDUCER_CASES } from '@/context/constants'
import { useRouter } from 'next/router'

export const OnBoarding = () => {
  const [{ userInfo, newUser }, dispatch] = useStateProvider()
  const [name, setName] = useState(userInfo?.name || '')
  const [about, setAbout] = useState('')
  const [image, setImage] = useState(userInfo?.profileImage || AvatarDefault)
  const router = useRouter()

  useEffect(() => {
    if (!newUser && !userInfo?.email) router.push('/login')
    else if (!newUser && userInfo?.email) router.push('/')
  }, [newUser, userInfo, router])

  const onBoardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo?.email
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image
        });
        if (data.status) {
          dispatch({ type: REDUCER_CASES.SET_NEW_USER, newUser: false })
          dispatch({
            type: REDUCER_CASES.SET_USER_INFO,
            userInfo: { 
              id: data.id,
              name, 
              email, 
              profileImage: image, 
              status: about,
            }
          })
        }
        router.push('/')
      } catch(err) {
        console.log(err)
      }
    }
  }

  const validateDetails = () => {
    if (name.length < 3) {
      return false
    } 
    return true
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Create Your Profile</h2>
      <div className={styles.form}>
        <Avatar 
          type='xl'
          image={image}
          setImage={setImage}
        />
        <Input 
          name='Display Name' 
          state={name} 
          setState={setName} 
          label 
        />
        <Input 
          name='About' 
          state={about} 
          setState={setAbout} 
          label 
        />
        <button
          onClick={onBoardUserHandler}
          className={styles.btn}
        >Create Profile</button>
      </div>
    </section>
  )
}
