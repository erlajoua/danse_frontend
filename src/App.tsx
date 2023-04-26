// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Importez vos composants de pages ici
import Home from './pages/Home';
import Cours from './pages/Cours';
import About from './pages/About';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f46ef6', 
    },
  },
});


const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cours" element={<Cours />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
