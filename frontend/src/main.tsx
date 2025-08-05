import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

// Importa los temas desde assets (ruta correcta)
import './assets/styles/theme/lara-light-blue/theme.css' // Tema por defecto

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)