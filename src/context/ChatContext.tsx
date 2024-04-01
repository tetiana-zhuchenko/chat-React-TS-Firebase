import { createContext, ReactNode, useContext, useReducer } from 'react'
import { AuthContext } from './AuthContext'

interface ChatContextType {
  data: any
  dispatch: React.Dispatch<any>
}
interface ChatContextProps {
  children: ReactNode
}

type ChatAction = { type: 'CHANGE_USER'; payload: any }

export const ChatContext = createContext({} as ChatContextType)

export const ChatContextProvider = ({ children }: ChatContextProps) => {
  const { currentUser } = useContext(AuthContext)
  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  }

  const chatReducer = (state: any, action: ChatAction) => {
    if (!currentUser) return
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
