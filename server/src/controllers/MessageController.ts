import { NextFunction, Request, Response } from "express";
import getPrismaInstance from "../utils/PrismaClient.js";
import { Messages } from "@prisma/client";
import { renameSync } from 'fs'

export const addMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prisma = getPrismaInstance()
    const { message, from, to } = req.body
    //@ts-ignore
    const getUser = onlineUsers.get(to)
    if (message && from && to) {
      const newMessage = await prisma.messages.create({
        data: {
          message,
          sender: { connect: { id: parseInt(from) } },
          reciever: { connect: { id: parseInt(to) } },
          messageStatus: getUser ? "delivered" : "sent"
        },
        include: { sender: true, reciever: true }
      })
      return res.status(201).send({ message: newMessage })
    }
    return res.status(400).send('From, to and Message is required')
  } catch(err) {
    next(err)
  }
}

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prisma = getPrismaInstance()
    const { from, to } = req.params

    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          {
            senderId: parseInt(from),
            recieverId: parseInt(to)
          },
          {
            senderId: parseInt(to),
            recieverId: parseInt(from)
          },
        ]
      },
      orderBy: {
        id: 'asc'
      }
    })

    const unreadMessages: number[] = []

    messages.forEach((msg, idx) => {
      if (msg.messageStatus !== 'read' && 
          msg.senderId === parseInt(to)
        ) {
          messages[idx].messageStatus = 'read'
          unreadMessages.push(msg.id)
        }
    })

    await prisma.messages.updateMany({
        where: {
          id: { in: unreadMessages }
        },
        data: {
          messageStatus: 'read'
        }
    })

    res.status(200).json({ messages })

  } catch(err) {
    next(err)
  }
}

export const addImageMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      const date = Date.now()
      let fileName = "uploads/images/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      const prisma = getPrismaInstance()
      const { from, to } = req.query

      if (from && to) {
        const message = await prisma.messages.create({
          data: {
            message: fileName,
            sender: { connect: { id: parseInt(from as string) } },
            reciever: { connect: { id: parseInt(to as string) } },
            type: 'image',
          }
        })
        return res.status(201).json({ message })
      }
      return res.status(400).send('From, to is required')
    }
    return res.status(400).send('Image is required')
  } catch(err) {
    next(err)
  }
}

export const addAudioMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      const date = Date.now()
      let fileName = "uploads/recordings/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      const prisma = getPrismaInstance()
      const { from, to } = req.query

      if (from && to) {
        const message = await prisma.messages.create({
          data: {
            message: fileName,
            sender: { connect: { id: parseInt(from as string) } },
            reciever: { connect: { id: parseInt(to as string) } },
            type: 'audio',
          }
        })
        return res.status(201).json({ message })
      }
      return res.status(400).send('From, to is required')
    }
    return res.status(400).send('Audio is required')
  } catch(err) {
    next(err)
  }
}

export const getInitialContactWithMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.from)
    const prisma = getPrismaInstance()
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        sentMessages: {
          include: {
            reciever: true, 
            sender: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        recievedMessages: {
          include: {
            reciever: true, 
            sender: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    
    const messages = [...user!.sentMessages, ...user!.recievedMessages]
    messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    const users = new Map()
    const messageStatusChange: number[] = []

    messages.forEach((msg) => {
      const isSender = msg.senderId === userId;
      const calculatedId = isSender ? msg.recieverId : msg.senderId;
      if (msg.messageStatus === 'sent') {
        messageStatusChange.push(msg.id)
      }

      const {
        id,
        type,
        message,
        messageStatus,
        createdAt,
        senderId,
        recieverId
      } = msg;

      if (!users.get(calculatedId)) {
        
        let user = {
          messageId: id,
          type,
          message,
          messageStatus,
          createdAt,
          senderId,
          recieverId,
          totalUnreadMessages: 0
        }
        if (isSender) {
          user = {
            ...user, 
            ...msg.reciever,
            totalUnreadMessages: 0
          }
        } else {
          user = {
            ...user,
            ...msg.sender,
            totalUnreadMessages: messageStatus !== 'read' ? 1 : 0,
          }
        }
        users.set(calculatedId, { ...user })
      } else if (messageStatus !== 'read' && !isSender) {
        const user = users.get(calculatedId)
        users.set(calculatedId, {
          ...user,
          totalUnreadMessages: user.totalUnreadMessages + 1
        })
      }
    })

    if (messageStatusChange.length) {
      await prisma.messages.updateMany({
        where: {
          id: { in: messageStatusChange }
        },
        data: {
          messageStatus: 'delivered'
        }
      })
    } 

    return res.status(200).json({
      users: Array.from(users.values()),
      //@ts-ignore
      onlineUsers: Array.from(onlineUsers.keys())
    })
  } catch(err) {
    next(err)
  }
}