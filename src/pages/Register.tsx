import { useNavigate, Link } from 'react-router-dom'
import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { auth, db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

const Register = () => {
  const [err, setErr] = useState(false)
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const displayName = formData.get('displayName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const file = formData.get('file') as File
    console.log(file)
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res)
      //Create a unique image name
      // const date = new Date().getTime()
      const storageRef = ref(storage, displayName)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          setErr(true)
          console.error(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('file available at', downloadURL)
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, 'userChats', res.user.uid), {})
            navigate('/')
          })
        }
      )
    } catch (err) {
      setErr(true)
      console.error('first', err)
      // setLoading(false);
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo"> Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            name="displayName"
            required
            type="text"
            placeholder="display name"
          />
          <input name="email" required type="email" placeholder="email" />
          <input
            name="password"
            required
            type="password"
            placeholder="password"
          />
          <input
            name="file"
            style={{ display: 'none' }}
            type="file"
            id="file"
            accept="image/png, image/jpeg"
          />
          <label htmlFor="file">
            <img src={Add} alt="logo" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {/* {loading && "Uploading and compressing the image please wait..."} */}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
