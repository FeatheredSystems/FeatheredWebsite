import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router, Route } from "react-router-dom"
import './index.css'

createRoot(document.getElementById('root')).render(
  <Router>
    <Route path='/'></Route>
    <Route path='/TytoDB/:content'></Route>
  </Router>
)
