import { REDUCER_CASES } from "./constants"

interface IUserInfo {
   name: string | null
   email: string
   profileImage: string | null
   status: string
}

export interface IInitialState {
  userInfo: undefined | IUserInfo
  newUser: boolean
}

export const initialState: IInitialState = {
  userInfo: undefined,
  newUser: false
}

export type ActionReducer =
 | { type: REDUCER_CASES.SET_USER_INFO, userInfo: undefined | IUserInfo }
 | { type: REDUCER_CASES.SET_NEW_USER, newUser: boolean }


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
    default: {
      return state
    }
  }
}