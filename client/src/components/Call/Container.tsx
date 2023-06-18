import { useStateProvider } from '@/context/StateContext'
import { TypeCall } from '@/types/contact.types'
import React, { PropsWithChildren, useState } from 'react'
import styles from './Container.module.scss'
import Image from 'next/image'
import { MdOutlineCallEnd } from 'react-icons/md'
import { REDUCER_CASES } from '@/context/constants'

const Container = ({ data }: { data: TypeCall | undefined }) => {
  const [{ socket, userInfo }, dispatch] = useStateProvider()
  const [callAccepted, setCallAccepted] = useState(false)
  
  const endCall = () => {
    dispatch({ type: REDUCER_CASES.END_CALL })
  }
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h4>{data?.name}</h4>
        <span>{callAccepted && data?.callType !== 'video' ? 'On going call' : 'Calling'}</span>
      </div>
      {callAccepted || data?.callType === 'voice' && (
        <div className={styles.image}>
          <Image 
            src={data.profilePicture}
            alt=''
            width={300}
            height={300}
          />
        </div>
      )}
      <div>
        <MdOutlineCallEnd 
          className={styles['out-call']}
          onClick={endCall}
        />
      </div>
    </div>
  )
}

export default Container