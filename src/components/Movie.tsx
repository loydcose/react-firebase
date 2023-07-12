/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Movie as MovieType } from "../types"
import { db } from "../config/firebase"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"

type PropTypes = {
  movie: MovieType
  getMovies: () => Promise<void>
}

export default function Movie({ movie, getMovies }: PropTypes) {
  const [newTitle, setNewTitle] = useState("")

  const deleteMovie = async (id: string) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc)
      getMovies()
    } catch (error) {
      console.error(error)
    }
  }

  const updateMovie = async (id: string) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await updateDoc(movieDoc, { title: newTitle })
      getMovies()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div key={movie.id} className="border border-slate-400">
      <p>Title: {movie.title}</p>
      <p>Release: {movie.releaseDate}</p>
      <p>Available: {movie.isAvailable ? "Yes" : "No"}</p>
      <button
        onClick={() => deleteMovie(movie.id)}
        type="button"
        className="text-red-600 underline"
      >
        Delete Movie
      </button>
      <div className="grid grid-cols-1 gap-2 p-2 m-2">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          type="text"
          id="updateTitle"
          placeholder="Update title"
          className="border border-slate-400 p-2"
        />
        <button
          onClick={() => updateMovie(movie.id)}
          type="button"
          className="text-blue-600 underline"
        >
          Update title
        </button>
      </div>
    </div>
  )
}
