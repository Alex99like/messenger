
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoutes from './routes/AuthRoutes.js'
import MessagesRoutes from './routes/MessageRoutes.js'
import { Server } from 'socket.io'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/uploads/recordings/', express.static('uploads/recordings'))
app.use('/uploads/images/', express.static('uploads/images'))

app.use('/api/auth', AuthRoutes)
app.use('/api/messages', MessagesRoutes)

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

// const onlineUsers = new Map()
//@ts-ignore
global.onlineUsers = new Map()
io.on("connection", (socket) => {
  //@ts-ignore
  global.chatSocket = socket
  socket.on('add-user', (userId) => {
    //@ts-ignore
    onlineUsers.set(userId, socket.id)
  })
  socket.on('send-msg', (data) => {
    //@ts-ignore
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', {
        from: data.from,
        message: data.message
      })
    }
  })

  socket.on('outgoing-voice-call', (data) => {
    //@ts-ignore
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('incoming-voice-call', {
        from: data.from,
        roomId: data.roomId,
        callType: data.callType
      })
    }
  })

  socket.on('outgoing-video-call', (data) => {
    //@ts-ignore
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('incoming-video-call', {
        from: data.from,
        roomId: data.roomId,
        callType: data.callType
      })
    }
  })

  socket.on('reject-voice-call', (data) => {
    //@ts-ignore
    const sendUserSocket = onlineUsers.get(data.from)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('voice-call-rejected')
    }
  })

  socket.on('reject-video-call', (data) => {
    //@ts-ignore
    const sendUserSocket = onlineUsers.get(data.from)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('video-call-rejected')
    }
  })

  socket.on('accept-incoming-call', ({ id }) => {
    //@ts-ignore
    const sendUserSocket = onlineUsers.get(id)
    socket.to(sendUserSocket).emit('accept-call')
  })

  
})

