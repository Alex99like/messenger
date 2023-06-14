
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
})