import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
import { useContext } from 'react'

const Chat = () => {
  const { data } = useContext(ChatContext)

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="icon" />
          <img src={Add} alt="icon" />
          <img src={More} alt="icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
