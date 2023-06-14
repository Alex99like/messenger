
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoutes from './routes/AuthRoutes.js'
import MessagesRoutes from './routes/MessageRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', AuthRoutes)
app.use('/api/messages', MessagesRoutes)

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})

//@ts-ignore
globalThis.onlineUsers = new Map()