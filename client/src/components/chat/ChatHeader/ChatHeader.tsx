import { Avatar } from '@/components/common/Avatar/Avatar'
import React from 'react'
import styles from './ChatHeader.module.scss'
import { MdCall } from 'react-icons/md'
import { IoVideocam } from 'react-icons/io5'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useStateProvider } from '@/context/StateContext'
import DefAv from '@/assets/default_avatar.png'
import { REDUCER_CASES } from '@/context/constants'

export const ChatHeader = () => {
  const [{ currentChatUser }, dispatch] = useStateProvider()

  const handleVoiceCall = () => {
    dispatch({ 
      type: REDUCER_CASES.SET_VOICE_CALL,
      voiceCall: {
        ...currentChatUser!,
        type: "out-going",
        callType: 'voice',
        roomId: Date.now()
      }
    })
  }


  const handleVideoCall = () => {
    dispatch({
      type: REDUCER_CASES.SET_VIDEO_CALL,
      videoCall: {
        ...currentChatUser!,
        type: 'out-going',
        callType: 'video',
        roomId: Date.now()
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
       <Avatar image={currentChatUser?.profilePicture || DefAv} type='sm'/>
       <div className={styles.name}>
         <h3>{currentChatUser?.name}</h3>
         <span>{'online/offline'}</span>
       </div>
      </div>
      <div className={styles.icons}>
        <MdCall 
          onClick={handleVoiceCall}
        />
        <IoVideocam 
          onClick={handleVideoCall}
        />
        <BiSearchAlt2 
          onClick={() => dispatch({ type: REDUCER_CASES.SET_MESSAGE_SEARCH })}
        />
        <BsThreeDotsVertical />
      </div>
    </div>
  )
}
