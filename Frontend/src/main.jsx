import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import MyAccount from './pages/MyAccount.jsx'
import Login_signup from './pages/Login_Signup.jsx'
import OwnerPage from './pages/Owner_page.jsx'
import CreateProduct from './pages/Create_product.jsx'
import Createowner from './pages/Createowner.jsx'
import Productpage from './pages/Productpage.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home/>,
      },
      {
        path: 'login',
        element: <Login_signup/>,
      },
      {
        path: 'home',
        element: <Home/>,
      },
      {
        path: 'cart',
        element: <Cart/>,
      },
      {
        path: 'myaccount',
        element: <MyAccount isOwner={false}/>,
      },
      {
        path: '/owner/myaccount',
        element: <MyAccount isOwner={true}/>,
      },
      {
        path: 'owner',
        element: <OwnerPage/>,
        
      },
      {
        path: 'owner/addproduct',
        element: <CreateProduct/>,
      },
      {
        path: 'owner/create',
        element: <Createowner/>,
      },
      {
        path: '/products/:product_id',
        element: <Productpage/>,
      },
      
    ],
  },
  {
    path: '/Login_Signup',
    element: <Login_signup/>,
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router= {router}/>
  </StrictMode>,
)
