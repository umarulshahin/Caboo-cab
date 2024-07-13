import React from 'react'
import LandingPage from './Pages/LandingPage'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Landing_Form from './Components/LandingPage_layer1'
import LandingPage_layer2 from './Components/LandingPage_layer2'
import Signin_selection from './Pages/Signin_selection'
import Signup from './Pages/Signup'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/first_layout' element={<Landing_Form />} />
        <Route path='/second_layout' element={<LandingPage_layer2 />} />
        <Route path='/signin_selection' element={<Signin_selection />} />
        <Route path='/signup' element={<Signup/>} />


      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App