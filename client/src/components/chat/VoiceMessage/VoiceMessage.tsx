import { useStateProvider } from '@/context/StateContext'
import { IMessage } from '@/types/contact.types'
import { HOST } from '@/utils/ApiRoutes'
import { calculateTime } from '@/utils/CalculateTime'
import React, { useEffect, useRef, useState } from 'react'
import { FaPlay, FaStop } from 'react-icons/fa'
import WaveSurfer from 'wavesurfer.js'
import styles from './VoiceMessage.module.scss'
import { MessageStatus } from '../MessageStatus/MessageStatus'

const VoiceMessage = ({ message }: { message: IMessage }) => {
  const [{ currentChatUser, userInfo }] = useStateProvider()
  const [audioMessage, setAudioMessage] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  const waveFormRef = useRef(null)
  const waveform = useRef<WaveSurfer | null>(null)

  useEffect(() => {
    if (waveform.current === null) {
      waveform.current = WaveSurfer.create({
        container: waveFormRef.current!,
        waveColor: '#ccc',
        progressColor: '#4a9eff',
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true
      })

      waveform.current?.on('finish', () => {
        setIsPlaying(false)
      })
    }

    return () => {
      //waveform.current?.destroy()
    }
  }, [])

  useEffect(() => {
    const audioURL = `${HOST}/${message.message}`
    const audio = new Audio(audioURL)
    setAudioMessage(audio)
    
    waveform.current?.load(audioURL)
    waveform.current?.on('ready', () => {
      setTotalDuration(waveform.current!.getDuration())
    })
  }, [message.message])
 
  useEffect(() => {
    if (audioMessage) {
      const updatePlaybackTime = () => {
       setCurrentPlaybackTime(audioMessage.currentTime)
      }
      audioMessage.addEventListener('timeupdate', updatePlaybackTime)
      return () => {
        audioMessage.removeEventListener('timeupdate', updatePlaybackTime)
      }
    }
  }, [audioMessage])

  const handlePlayAudio = () => {
    if (audioMessage) {
      waveform.current?.stop()
      waveform.current?.play()
      audioMessage?.play()
      setIsPlaying(true)
    }  
  }
  
  const handlePauseAudio = () => {
    waveform.current?.stop()
    audioMessage?.pause()
    setIsPlaying(false)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={styles.wrapper}>
      <div>
        {
          !isPlaying ? (
            <FaPlay className={styles.icon} onClick={handlePlayAudio} />
          ) : (
            <FaStop className={styles.icon} onClick={handlePauseAudio} />
          )
        }
      </div>
      <div className={styles.container}>
         <div  ref={waveFormRef} />
      </div>
      <div>
         <span>{formatTime(isPlaying ? currentPlaybackTime : totalDuration)}</span>
      </div>
    </div>
  )
}

export default VoiceMessage