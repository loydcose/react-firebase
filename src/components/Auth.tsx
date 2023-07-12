/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormEventHandler, useState } from "react"
import { auth, googleProvider, db } from "../config/firebase"

// this depends on which provided you'd choose
// signInWithPopup style are one of just many option, its just popular to use
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log({ isLoggedIn: auth?.currentUser?.email })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const handleGoogleSignIn = async () => {
    // if you face this kind of error: Firebase Auth/unauthorized
    // just add your base url on firebase > authentication > settings > authorized domains

    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="border border-slate-400 p-12 my-12">
      <h1 className="font-bold mb-6">Firebase Authentication</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="grid grid-cols-1 gap-4"
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Username"
          className="border border-slate-400 p-2"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border border-slate-400 p-2"
        />
        <button
          type="submit"
          className="border border-slate-400 p-2 hover:bg-slate-200"
        >
          Submit
        </button>
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="border border-slate-400 p-2 hover:bg-slate-200"
        >
          Google Sign In
        </button>
        <button
          onClick={handleLogOut}
          type="button"
          className="border border-slate-400 p-2 hover:bg-slate-200"
        >
          Log Out
        </button>
      </form>
    </section>
  )
}
