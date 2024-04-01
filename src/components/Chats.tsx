import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import 'firebase/compat/auth'
import { ChatContext } from '../context/ChatContext'

const Chats = () => {
  const [chats, setChats] = useState<{ [key: string]: any }>({})

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    if (!currentUser) return
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        const data = doc.data()
        if (data) {
          console.log('chats data', data)
          setChats(data)
        } else {
          setChats({})
        }
      })

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser?.uid])

  const handleSelect = (u: any) => {
    dispatch({ type: 'CHANGE_USER', payload: u })
  }

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1]?.userInfo?.photoURL} alt="avatar" />
            <div className="userChatInfo">
              <span>{chat[1]?.userInfo.displayName}</span>
              <p>{chat[1]?.lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Chats
