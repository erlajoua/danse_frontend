// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importez vos composants de pages ici
import Home from './pages/Home';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
