import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import { CartProvider } from './context/CartContext'
import Footer from "./Components/Footer"

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen "> 
      <CartProvider>
        <Navbar />
        <div className="line h-1 w-full bg-gray-400" ></div>
        
        <div className="flex-grow"> 
          <Outlet />
        </div>
        
        <Footer />
      </CartProvider>
    </div>
    </>
  )
}

export default App
