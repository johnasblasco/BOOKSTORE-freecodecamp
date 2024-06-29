import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import ShowBooks from './pages/ShowBooks'
import EditBooks from './pages/EditBooks'
import DeleteBooks from './pages/DeleteBooks'
import Spinner from './components/Spinner'

function App() {
      return (
            <>
                  <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/books/create' element={<CreateBooks />}></Route>
                        <Route path='/books/details/:id' element={<ShowBooks />}></Route>
                        <Route path='/books/edit/:id' element={<EditBooks />}></Route>
                        <Route path='/books/delete/:id' element={<DeleteBooks />}></Route>
                  </Routes>
            </>
      )
}

export default App