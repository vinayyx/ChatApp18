import React from 'react'
import { BrowserRouter , Route, Router , Routes} from "react-router-dom"
import Home from './assets/Pages/Home'
import Login from './assets/Pages/Login'
import ChatWindow from './assets/Pages/ChatWindow'
import ProtectedRoute from './ProtectedRoute'
import ChatBox from './assets/AiChat/ChatBox'
import ReportInput from './assets/ui/ReportInput'

function App() {
  return (



    <div>


      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Chat' element={ <ProtectedRoute> <ChatWindow/> </ProtectedRoute> } />
        <Route path='/paid' element={ <ProtectedRoute> <ChatBox/> </ProtectedRoute> } />
         <Route path='/report' element={ <ProtectedRoute> <ReportInput/> </ProtectedRoute> } />





      </Routes>

      

      
      
    </div>

  )
}

export default App
