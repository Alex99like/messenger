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
  type: 'text'
}