import React, { useState, MouseEvent } from 'react'
import styles from './Avatar.module.scss'
import Image, { StaticImageData } from 'next/image'
import { FaCamera } from 'react-icons/fa'
import cn from 'clsx'

type PropsAvatar = {
  type: 'sm' | 'lg' | 'xl'
  image: string | StaticImageData
  setImage: (val: string | StaticImageData) => void
}

export const Avatar = ({ type, image, setImage }: PropsAvatar) => {
  const [hover, setHover] = useState(false)
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0
  })

  const showContextMenu = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY })
    setIsContextMenuVisible(true)
  }

  return (
    <div className={styles.wrapper}>
      {type === 'sm' && (
        <div className={styles['container-img']}>
          <Image 
            src={image}
            alt='avatar'
            className={styles.image}
            fill
          />
        </div>
      )}
      {type === 'lg' && (
        <div className={styles['container-img']}>
          <Image 
            src={image}
            alt='avatar'
            className={styles.image}
            fill
          />
        </div>
      )}
      {type === 'xl' && (
        <div 
          className={styles['container-img']}
          onMouseEnter={() => setHover(true)}  
          onMouseLeave={() => setHover(false)}
        >
          {hover && (
            <div 
              className={styles['container-icon']}
              onClick={showContextMenu}
              id='context-opener' 
            >
              <FaCamera 
                className={styles.icon}
                //onClick={showContextMenu} 
                id='context-opener' 
              />
              <span
                id='context-opener' 
                onClick={showContextMenu}
              >Change Photo</span>
            </div>
          )}
          <Image 
            src={image}
            alt='avatar'
            className={styles.image}
            fill
          />
        </div>
      )}
    </div>
  )
}
