import React from 'react'
import styles from './PhotoLibrary.module.scss'
import AvatarOne from '@/assets/avatars/1.png'
import AvatarTwo from '@/assets/avatars/2.png'
import AvatarThree from '@/assets/avatars/3.png'
import AvatarFour from '@/assets/avatars/4.png'
import AvatarFive from '@/assets/avatars/5.png'
import AvatarSix from '@/assets/avatars/6.png'
import AvatarSeven from '@/assets/avatars/7.png'
import AvatarEight from '@/assets/avatars/8.png'
import AvatarNine from '@/assets/avatars/9.png'

import { IoClose } from 'react-icons/io5'
import Image, { StaticImageData } from 'next/image'

type PropsPhotoLibrary = {
  setImage: (val: string | StaticImageData) => void
  hidePhotoLibrary: (val: boolean) => void
}

export const PhotoLibrary = ({ setImage, hidePhotoLibrary }: PropsPhotoLibrary) => {
  

  const images = [
    AvatarOne,
    AvatarTwo,
    AvatarThree,
    AvatarFour,
    AvatarFive,
    AvatarSix,
    AvatarSeven,
    AvatarEight,
    AvatarNine
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div onClick={() => hidePhotoLibrary(false)}>
          <IoClose className={styles.icon} />
        </div>
        <div className={styles.container}>
          {images.map((item) => (
            <div 
              key={item.src}
              className={styles.item}
              onClick={() => {
                setImage(item)
                hidePhotoLibrary(false)
              }}
            >
              <Image 
                src={item.src}
                alt='avatar'
                width={60}
                height={60}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
