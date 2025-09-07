import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import TytoDBPage from './tytodb/tytodb';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/TytoDB/:content" element={<TytoDBPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
