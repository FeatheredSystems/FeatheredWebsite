import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router, Route } from "react-router-dom"
import './index.css'
import TytoDBPage from './tytodb/tytodb'

createRoot(document.getElementById('root')).render(
  <Router>
    <Route path='/'></Route>
    <Route element={<TytoDBPage/>} path='/TytoDB/:content'></Route>
  </Router>
)
