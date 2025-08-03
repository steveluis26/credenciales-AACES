import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import type { InputStyleType } from 'primereact/api';

import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// 1. Precarga AMBOS temas CSS
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Tema claro
import 'primereact/resources/themes/arya-blue/theme.css'; // Tema oscuro
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './assets/styles/global.css';

// 2. Configuración inicial del tema desde localStorage
const storedTheme = localStorage.getItem('darkMode') === 'true' ? 'arya-blue' : 'lara-light-indigo';
document.documentElement.setAttribute('data-theme', storedTheme);

const primereactConfig = {
  ripple: true,
  inputStyle: 'outlined' as InputStyleType,
  theme: {
    name: storedTheme // Sincroniza PrimeReact con el tema inicial
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider value={primereactConfig}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);