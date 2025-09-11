import './App.css'
import NavBar from './routes/Navbar'
import { RouterProvider } from 'react-router-dom'

function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  }
])
  return (
    <>

    </>
  )

}

export default App
