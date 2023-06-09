import { StaticImageData } from "next/image"
import { REDUCER_CASES } from "./constants"
import { IFullUserContact, IMessage, IUserContact, TypeCall } from "@/types/contact.types"
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
  userContacts: IFullUserContact[]
  onlineUsers: []
  contactSearch: string
  filteredContacts: IFullUserContact[],
  videoCall: undefined | TypeCall
  voiceCall: undefined | TypeCall
  incomingVoiceCall: undefined | any
  incomingVideoCall: undefined | any
}

export const initialState: IInitialState = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
  currentChatUser: undefined,
  messages: [],
  socket: undefined,
  messagesSearch: false,
  userContacts: [],
  onlineUsers: [],
  contactSearch: '',
  filteredContacts: [],
  videoCall: undefined,
  voiceCall: undefined,
  incomingVideoCall: undefined,
  incomingVoiceCall: undefined
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
 | { type: REDUCER_CASES.SET_USER_CONTACTS, userContacts: IFullUserContact[] }
 | { type: REDUCER_CASES.SET_ONLINE_USERS, onlineUsers: any }
 | { type: REDUCER_CASES.SET_CONTACT_SEARCH, contactSearch: string }
 | { type: REDUCER_CASES.SET_VIDEO_CALL, videoCall: TypeCall }
 | { type: REDUCER_CASES.SET_VOICE_CALL, voiceCall: TypeCall }
 | { type: REDUCER_CASES.SET_INCOMING_VOICE_CALL, incomingVoiceCall: any }
 | { type: REDUCER_CASES.SET_INCOMING_VIDEO_CALL, incomingVideoCall: any }
 | { type: REDUCER_CASES.END_CALL }


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
    case REDUCER_CASES.SET_USER_CONTACTS: {
      return {
        ...state,
        userContacts: action.userContacts
      }
    }
    case REDUCER_CASES.SET_ONLINE_USERS: {
      return {
        ...state,
        onlineUsers: action.onlineUsers
      }
    }
    case REDUCER_CASES.SET_CONTACT_SEARCH: {
      const filteredContacts = state.userContacts.filter((contact) => 
        contact.name.toLowerCase().includes(action.contactSearch.toLowerCase())
      )
      return {
        ...state,
        contactSearch: action.contactSearch,
        filteredContacts
      }
    }
    case REDUCER_CASES.SET_VIDEO_CALL: {
      return {
        ...state,
        videoCall: action.videoCall,
      }
    }
    case REDUCER_CASES.SET_VOICE_CALL: {
      return {
        ...state,
        voiceCall: action.voiceCall,
      }
    }
    case REDUCER_CASES.SET_INCOMING_VOICE_CALL: {
      return {
        ...state,
        incomingVoiceCall: action.incomingVoiceCall,
      }
    }
    case REDUCER_CASES.SET_INCOMING_VIDEO_CALL: {
      return {
        ...state,
        incomingVideoCall: action.incomingVideoCall
      }
    }
    case REDUCER_CASES.END_CALL: {
      return {
        ...state,
        voiceCall: undefined,
        videoCall: undefined,
        incomingVideoCall: undefined,
        incomingVoiceCall: undefined
      }
    }
    default: {
      return state
    }
  }
}