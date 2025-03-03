import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './components/layout/Layout.jsx'

createRoot(document.getElementById('root')).render(
  <App />
)
