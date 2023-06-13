import { StaticImageData } from 'next/image'
import React, { useEffect, useRef } from 'react'
import styles from './CapturePhoto.module.scss'
import { IoClose, IoCamera } from 'react-icons/io5'

type PropsCapturePhoto = {
  setImage: (val: string | StaticImageData) => void
  hide: (val: boolean) => void
}

export const CapturePhoto = ({ setImage, hide }: PropsCapturePhoto) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    let stream: MediaStream;
    const startCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
      videoRef.current!.srcObject = stream
    }
    startCamera()
    return () => {
      stream?.getTracks().forEach(track => track.stop())
    }
  }, [])

  const capturePhoto = () => {
    const canvas = document.createElement('canvas')
    canvas.getContext('2d')?.drawImage(videoRef.current!, 0, 0, 300, 150)
    setImage(canvas.toDataURL('image/jpeg'))
    hide(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles['video-container']}>
          <video 
            id='video' 
            width={300} 
            height={300}
            autoPlay 
            ref={videoRef}
            className={styles.video} 
          />
        </div>
        <button
          onClick={capturePhoto}
          className={styles.button}
        >
          Take Photo
          <IoCamera className={styles.icon} />
        </button>
      </div>
    </div>
  )
}
