import Auth from "./components/Auth"
import Movies from "./components/Movies"

export default function App() {
  return (
    <main className="min-h-screen bg-white w-[90%] max-w-[450px] mx-auto py-16 text-center">
      <Auth />
      <Movies />
    </main>
  )
}
