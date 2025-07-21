import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// PrimeReact (TEMA: lara-light-blue)
import 'primereact/resources/themes/vela-blue/theme.css';

import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// Estilos globales (opcional)
import './assets/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);