import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Home from '@/pages/public/Home';
import BuscarCredencial from '@/pages/public/BuscarCredencial';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/buscar-credencial" element={<BuscarCredencial />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;