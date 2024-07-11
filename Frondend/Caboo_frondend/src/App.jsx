import React from 'react'
import LandingPage from './Pages/LandingPage'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App