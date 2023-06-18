import { useStateProvider } from '@/context/StateContext'
import { REDUCER_CASES } from '@/context/constants'
import Image from 'next/image'
import React from 'react'

export const IncomingVideoCall = () => {
  const [{ videoCall, incomingVideoCall, socket }, dispatch] = useStateProvider()

  const acceptCall = () => {
    const call = incomingVideoCall
    dispatch({ 
      type: REDUCER_CASES.SET_VIDEO_CALL,
      videoCall: { ...incomingVideoCall, type: 'in-coming' }
    })
    socket?.emit('accept-incoming-call', ({ id: incomingVideoCall.id }))
    dispatch({
      type: REDUCER_CASES.SET_INCOMING_VIDEO_CALL,
      incomingVideoCall: undefined
    })
  }

  const rejectCall = () => {
    dispatch({ type: REDUCER_CASES.END_CALL })
    socket?.emit('reject-video-call', { from: videoCall?.id })
  }

  return (
    <div>
      <div>
        <Image 
          src={incomingVideoCall.profilePicture}
          alt='avatar'
          width={70}
          height={70}
        />
      </div>

      <div>
        <div>{incomingVideoCall.name}</div>
        <div>Incoming Video Call</div>
        <div>
          <button
            onClick={acceptCall}
          >
            Reject
          </button>
          <button
            onClick={rejectCall}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
