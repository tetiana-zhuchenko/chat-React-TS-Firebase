import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await signInWithEmailAndPassword(auth, email, password)

      navigate('/')
    } catch (err) {
      setErr(true)
      console.error('first', err)
      // setLoading(false);
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="email" />
          <input name="password" type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
