import React, { useState, MouseEvent, useEffect } from 'react'
import styles from './Avatar.module.scss'
import DefaultAvatar from '@/assets/default_avatar.png'
import Image, { StaticImageData } from 'next/image'
import { FaCamera } from 'react-icons/fa'
import cn from 'clsx'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import { PhotoPicker } from '../PhotoPicker/PhotoPicker'
import { PhotoLibrary } from '../PhotoLibrary/PhotoLibrary'
import { CapturePhoto } from '../CapturePhoto/CapturePhoto'

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

  const [grabPhoto, setGrabPhoto] = useState(false)
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false)
  const [showCapturePhoto, setShowCapturePhoto] = useState(false)

  const showContextMenu = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY })
    setIsContextMenuVisible(true)
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

  const contextMenuOptions = [
    { name: 'Take Photo', callback: () => {
      setShowCapturePhoto(true)
    } },
    { name: 'Choose From Library', callback: () => {
      setShowPhotoLibrary(true)
    } },
    { name: 'Updated Photo', callback: () => {
      setGrabPhoto(true)
    } },
    { name: 'Remove Photo', callback: () => {
      setImage(DefaultAvatar)
    } },
  ]

  const photoPickerChange = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader()
    const data = document.createElement('img')
    reader.onload = function(event) {
      data.src = event.target!.result as string
      data.setAttribute('data-src', event.target!.result as string)
    }
    reader.readAsDataURL(file)
    setTimeout(() => {
        console.log(data.src)
      setImage(data.src)
    }, 100)
  }

  return (
    <>
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
      {
        isContextMenuVisible && (
          <ContextMenu 
            options={contextMenuOptions}
            coordinates={contextMenuCoordinates}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible }
          />
        )
      }
      {showPhotoLibrary && (
        <PhotoLibrary 
          setImage={setImage}
          hidePhotoLibrary={setShowPhotoLibrary}
        />
      )}
      {showCapturePhoto && (
        <CapturePhoto 
          setImage={setImage}
          hide={setShowCapturePhoto}
        />
      )}
      {grabPhoto && (
        <PhotoPicker  
          onChange={photoPickerChange}
        />
      )}
    </>
  )
}
