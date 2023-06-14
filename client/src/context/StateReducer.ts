import { StaticImageData } from "next/image"
import { REDUCER_CASES } from "./constants"
import { IUserContact } from "@/types/contact.types"

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
}

export const initialState: IInitialState = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
  currentChatUser: undefined
}

export type ActionReducer =
 | { type: REDUCER_CASES.SET_USER_INFO, userInfo: undefined | IUserInfo }
 | { type: REDUCER_CASES.SET_NEW_USER, newUser: boolean }
 | { type: REDUCER_CASES.SET_ALL_CONTACTS_PAGE }
 | { type: REDUCER_CASES.CHANGE_CURRENT_CHAT_USER, user: IUserContact }


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
      console.log(action)
      return {
        ...state,
        currentChatUser: action.user,
      }
    }
    default: {
      return state
    }
  }
}