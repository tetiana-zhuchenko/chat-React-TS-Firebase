import { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import DefaultImg from '../img/img.png'

const NavBar = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      <div className="user">
        <img src={currentUser?.photoURL ?? DefaultImg} alt="avatar" />
        <span>{currentUser?.displayName}</span>
        <button type="button" onClick={() => signOut(auth)}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default NavBar
