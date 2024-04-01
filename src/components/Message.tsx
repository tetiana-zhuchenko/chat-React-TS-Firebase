import { useContext, useEffect, useRef } from 'react'
import { MessageType } from './Messages'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import formateDate from '../utils/formateDate'

const Message = ({ message }: { message: MessageType }) => {
  console.log(message)

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser?.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser?.uid && currentUser?.photoURL
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="avatar"
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="image" />}
        <span className="date">{formateDate(message)}</span>
      </div>
    </div>
  )
}

export default Message
