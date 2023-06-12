import { useStateProvider } from '@/context/StateContext'
import React, { useState } from 'react'
import styles from './OnBoarding.module.scss'
import { Input } from '@/components/common/Input/Input'
import AvatarDefault from '@/assets/default_avatar.png'
import { Avatar } from '@/components/common/Avatar/Avatar'

export const OnBoarding = () => {
  const [{ userInfo }, dispatch] = useStateProvider()
  const [name, setName] = useState(userInfo?.name || '')
  const [about, setAbout] = useState('')
  const [image, setImage] = useState(userInfo?.profileImage || AvatarDefault)
  
  return (
    <section className={styles.wrapper}>
      <form className={styles.form}>
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
      </form>
    </section>
  )
}
