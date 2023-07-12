/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState, FormEventHandler } from "react"
import { db, auth, storage } from "../config/firebase"
import { getDocs, collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import Movie from "./Movie"
import { Movie as MovieType } from "../types"

export default function Movies() {
  const [movies, setMovies] = useState<MovieType[]>([])
  const [title, setTitle] = useState("")
  const [releaseDate, setReleaseDate] = useState<number>()
  const [isAvailable, setIsAvailable] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const getMovies = async () => {
    try {
      // getDocs for many documents, getDoc for one
      const data = await getDocs(collection(db, "movies"))

      // get the actual collection
      const filteredData: any[] = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      setMovies(filteredData)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUploadFile = async () => {
    try {
      if (!file) return

      const fileRef = ref(storage, `file-folder/${file.name}`)
      await uploadBytes(fileRef, file)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  const handleAddMovies: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const addMovies = async () => {
      try {
        await addDoc(collection(db, "movies"), {
          title,
          releaseDate,
          isAvailable,
          userId: auth?.currentUser?.uid,
        })
        getMovies()
      } catch (error) {
        console.error(error)
      }
    }
    addMovies()
  }

  return (
    <section className="border border-slate-400 p-12 my-12">
      <h1 className="font-bold mb-6">Add Movies</h1>
      <form onSubmit={handleAddMovies} className="grid grid-cols-1 gap-4">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="border border-slate-400 p-2"
        />
        <input
          onChange={(e) => setReleaseDate(parseInt(e.target.value))}
          type="text"
          placeholder="Release date"
          className="border border-slate-400 p-2"
        />
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isAvailable"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          <label htmlFor="isAvailable">Is Available</label>
        </div>
        <button
          type="submit"
          className="border border-slate-400 p-2 hover:bg-slate-200"
        >
          Submit
        </button>
      </form>
      <hr className="my-6" />
      <h1 className="font-bold mb-6">Movies Collections</h1>
      <div className="grid grid-cols-1 gap-4">
        {movies?.map((movie) => (
          <Movie key={movie.id} movie={movie} getMovies={getMovies} />
        ))}
      </div>
      <hr className="my-6" />
      <h1 className="font-bold mb-6">Uploading media files</h1>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0])
            }
          }}
          className="border border-slate-400 p-2"
        />
        <button
          onClick={handleUploadFile}
          type="button"
          className="text-green-600 underline"
        >
          Upload file
        </button>
      </div>
    </section>
  )
}
