export interface IUserContact {
  name: string
  profilePicture: string
  about: string
  id: number
}

export interface IMessage {
  id: number
  message: string
  messageStatus: 'sent' | 'delivered' | 'read'
  recieverId: number
  senderId: number
  createdAt: string
  type: 'text' | 'image' | 'audio'
}

export interface IFullUserContact extends IUserContact {
  createdAt: string
  email: string
  id: number
  message: string
  messageId: number
  messageStatus: "sent" | "delivered" | "read"
  recieverId: number
  senderId: number
  totalUnreadMessages: number
  type: 'text' | 'image' | 'audio'
}