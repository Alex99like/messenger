import React, { useEffect, useRef, useState } from 'react'
import { FaTrash, FaPlay, FaStop, FaMicrophone, FaPauseCircle } from 'react-icons/fa'
import styles from './CaptureAudio.module.scss'
import { useStateProvider } from '@/context/StateContext'
import { MdSend } from 'react-icons/md'
import WaveSurfer from 'wavesurfer.js'
import { REDUCER_CASES } from '@/context/constants'
import { ADD_AUDIO_MESSAGE_ROUTE, ADD_IMAGE_MESSAGE_ROUTE } from '@/utils/ApiRoutes'
import axios from 'axios'

type PropsCaptureAudio = {
  hide: (val: boolean) => void
}

const CaptureAudio = ({ hide }: PropsCaptureAudio) => {

  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider()

  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<null | HTMLAudioElement>(null)
  const [waveform, setWaveform] = useState<WaveSurfer | null>(null)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [renderedAudio, setRenderedAudio] = useState<File | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecordedRed = useRef<MediaRecorder>(null)
  const waveFormRef = useRef(null)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => {
          setTotalDuration(prevDuration + 1)
          return prevDuration + 1
        })
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isRecording])

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveFormRef.current!,
      waveColor: '#ccc',
      progressColor: '#4a9eff',
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true
    })
    setWaveform(wavesurfer)

    wavesurfer.on('finish', () => {
      setIsPlaying(false)
    })

    return () => {
      wavesurfer.destroy()
    }
  }, [])

  useEffect(() => {
    if (waveform) handleStartRecording()
  }, [waveform])

  const handleStartRecording = () => {
    setRecordingDuration(0)
    setCurrentPlaybackTime(0)
    setTotalDuration(0)
    setIsRecording(true)
    setRecordedAudio(null)
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream)
        //@ts-ignore
        mediaRecordedRed.current = mediaRecorder
        audioRef.current!.srcObject = stream

        const chunks: Blob[] = []
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
          const audioURL = URL.createObjectURL(blob)
          const audio = new Audio(audioURL)
          setRecordedAudio(audio)

          waveform?.load(audioURL)
        }

        mediaRecorder.start()

      }).catch(error => {
        console.log(error)
      })
  }

  const handleStopRecording = () => {
    if (mediaRecordedRed.current && isRecording) {
      mediaRecordedRed.current.stop()
      setIsRecording(false)
      waveform?.stop()

      const audioChunks: Blob[] = []
      mediaRecordedRed.current.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data)
      })

      mediaRecordedRed.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' })
        const audioFile = new File([audioBlob], 'recording.mp3')
        setRenderedAudio(audioFile)
      })
    }
  }

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
       setCurrentPlaybackTime(recordedAudio.currentTime)
      }
      recordedAudio.addEventListener('timeupdate', updatePlaybackTime)
      return () => {
       recordedAudio.removeEventListener('timeupdate', updatePlaybackTime)
      }
    }
  }, [recordedAudio])

  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveform?.stop()
      waveform?.play()
      recordedAudio.play()
      setIsPlaying(true)
    }  
  }

  const handlePauseRecording = () => {
    waveform?.stop()
    recordedAudio?.pause()
    setIsPlaying(false)
  }
  
  const sendRecording = async (e: any) => {
    try {
        const formData = new FormData()
        formData.append('audio', renderedAudio!)
        const { data, status } = await axios.post(ADD_AUDIO_MESSAGE_ROUTE, formData, {
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

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <FaTrash className={styles.icon} onClick={() => hide(false)} />
      </div>
      <div className={styles.voice}>
        {isRecording ? (
            <div className={styles.recording}>
              Recording <span>{formatTime(recordingDuration)}</span>
            </div>
          ) : (
            <div>
              {recordedAudio && (
                <>
                  {!isPlaying ? (
                    <FaPlay className={styles.icon} onClick={handlePlayRecording} />
                  ) : (
                    <FaStop className={styles.icon} onClick={handlePauseRecording} />
                  )}
                </>
              )}
            </div>
          )}
          <div className={styles.wive} ref={waveFormRef} hidden={isRecording} />
          {recordedAudio && isPlaying && (
            <span className={styles.playback}>{formatTime(currentPlaybackTime)}</span>
          )}
          {recordedAudio && !isPlaying && (
            <span className={styles['total-duration']}>{formatTime(totalDuration)}</span>
          )}
          <audio ref={audioRef} hidden />
          </div>
          <div>
            {!isRecording ? (
              <FaMicrophone 
                className={styles.record} 
                onClick={handleStartRecording} 
              />
            ) : (
              <FaPauseCircle 
                className={styles.record} 
                onClick={handleStopRecording} 
              />
            )}
          </div>
          <div>
            <MdSend 
              onClick={sendRecording}
              className={styles.send}
            />
          </div>
      
    </div>
  )
}


export default CaptureAudio