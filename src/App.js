import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Detail from './Detail'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
