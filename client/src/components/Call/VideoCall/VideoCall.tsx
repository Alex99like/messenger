import { useStateProvider } from '@/context/StateContext'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

const Container = dynamic(() => import("../Container"), { ssr: false })

export const VideoCall = () => {
  const [{ videoCall, socket, userInfo }] = useStateProvider()

  useEffect(() => {
    if (videoCall?.type === 'out-going') {
      socket?.emit('outgoing-video-call', {
        to: videoCall.id,
        from: {
          id: userInfo?.id,
          profilePicture: userInfo?.profileImage,
          name: userInfo?.name
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId
      })
    }
  }, [videoCall])

  return (
    <Container data={videoCall} />
  )
}
