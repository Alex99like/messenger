import { NextFunction, Request, Response } from "express";
import getPrismaInstance from "../utils/PrismaClient.js";
import { Messages } from "@prisma/client";

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

