import { StaticImageData } from "next/image"
import { REDUCER_CASES } from "./constants"
import { IMessage, IUserContact } from "@/types/contact.types"
import { Socket } from 'socket.io-client'

export interface IUserInfo {
   id?: number
   name: string | null
   email: string | undefined
   profileImage: string | null | undefined | StaticImageData
   status: string
}

export interface IInitialState {
  userInfo: undefined | IUserInfo
  newUser: boolean
  contactsPage: boolean
  currentChatUser: undefined | IUserContact
  messages: IMessage[]
  socket: Socket | undefined
  messagesSearch: boolean
}

export const initialState: IInitialState = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
  currentChatUser: undefined,
  messages: [],
  socket: undefined,
  messagesSearch: false
}

export type ActionReducer =
 | { type: REDUCER_CASES.SET_USER_INFO, userInfo: undefined | IUserInfo }
 | { type: REDUCER_CASES.SET_NEW_USER, newUser: boolean }
 | { type: REDUCER_CASES.SET_ALL_CONTACTS_PAGE }
 | { type: REDUCER_CASES.CHANGE_CURRENT_CHAT_USER, user: IUserContact }
 | { type: REDUCER_CASES.SET_MESSAGE, messages: IMessage[] }
 | { type: REDUCER_CASES.SET_SOCKET, socket: Socket }
 | { type: REDUCER_CASES.ADD_MESSAGE, newMessage: IMessage, fromSelf: boolean }
 | { type: REDUCER_CASES.SET_MESSAGE_SEARCH }


export const reducer = (state: IInitialState, action: ActionReducer): IInitialState => {
  switch (action.type) {
    case REDUCER_CASES.SET_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo
      }
    }
    case REDUCER_CASES.SET_NEW_USER: {
      return {
        ...state,
        newUser: action.newUser
      }
    }
    case REDUCER_CASES.SET_ALL_CONTACTS_PAGE: {
      return {
        ...state,
        contactsPage: !state.contactsPage
      }
    }
    case REDUCER_CASES.CHANGE_CURRENT_CHAT_USER: {
      return {
        ...state,
        currentChatUser: action.user,
      }
    }
    case REDUCER_CASES.SET_MESSAGE: {
      return {
        ...state,
        messages: action.messages
      }
    }
    case REDUCER_CASES.SET_SOCKET: {
      return {
        ...state,
        socket: action.socket,
      }
    }
    case REDUCER_CASES.ADD_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.newMessage]
      }
    }
    case REDUCER_CASES.SET_MESSAGE_SEARCH: {
      return {
        ...state,
        messagesSearch: !state.messagesSearch
      }
    }
    default: {
      return state
    }
  }
}