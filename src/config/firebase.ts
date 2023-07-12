import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBZNk52LpZLbPYIPcdgL9E52KvcLuH9nqw",
  authDomain: "react-firebase-tutorial-52e9e.firebaseapp.com",
  projectId: "react-firebase-tutorial-52e9e",
  storageBucket: "react-firebase-tutorial-52e9e.appspot.com",
  messagingSenderId: "684065566329",
  appId: "1:684065566329:web:18febddef0618cbe892ea8",
  measurementId: "G-JM4Z4LRL5F",
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// login system
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// for querying data
export const db = getFirestore(app)
export const storage = getStorage(app)
