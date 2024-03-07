import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import Signup  from './pages/Signup'
import  Signin from './pages/Signin'
import SendMoney  from './pages/SendMoney'
import Dashboard  from './pages/Dashboard'

function App() {
  console.log("we are here")
  const router = createBrowserRouter([
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/signin',
      element: <Signin />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/send',
      element: <SendMoney />
    },
  ])

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
