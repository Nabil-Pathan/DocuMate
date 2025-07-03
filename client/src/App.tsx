import { Routes , Route } from "react-router-dom"
import Signup from "./screens/Signup"
import Login from "./screens/Login"
import Home from "./screens/Home"
import Header from "./components/Header"
import { Toaster } from "react-hot-toast"
import Document from "./screens/Document"
import Profile from "./screens/Profile"
import PrivateRoutes from "./components/routes/PrivateRoutes"

function App() {

  return (
    <>
    <Toaster
        position="top-center"
        toastOptions={{
          success: {
            iconTheme: {
              primary: '#4aed88',
              secondary: '',
            },
          },
        }}
      ></Toaster>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={  <PrivateRoutes children={<Profile/>} />} />
        <Route path="/document/:id" element={<PrivateRoutes children={<Document/>}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
