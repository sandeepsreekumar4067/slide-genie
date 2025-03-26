import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Home from './Frontend/components/home'
import NavBar from './Frontend/components/navbar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar/>
    <Home />
  </StrictMode>,
)
