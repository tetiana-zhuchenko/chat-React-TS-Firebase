import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCo9X6KWUXZXe9y7XLF7ohDvUxLyYlyRiE',
  authDomain: 'chat-8b3bd.firebaseapp.com',
  projectId: 'chat-8b3bd',
  storageBucket: 'chat-8b3bd.appspot.com',
  messagingSenderId: '328512207403',
  appId: '1:328512207403:web:bd8fd3b5d5ccb31554486e',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore(app)
