// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { io, Socket } from 'socket.io-client';
import { Context } from './contexts/store'

// Importez vos composants de pages ici
import Home from './pages/Home';
import Cours from './pages/Cours';
import AddCours from './pages/AddCours';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f46ef6',
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    const socket: Socket = io(`${process.env.REACT_APP_API_URL}`, {
      transports: ['websocket'],
      upgrade: false
    });

    return (() => {
      socket.disconnect();
    })
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Context.Provider value={{token: localStorage.getItem('token'), socket: io(`${process.env.REACT_APP_API_URL}`)}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addCours" element={<AddCours />} />
          <Route path="/cours" element={<Cours />} />
        </Routes>
        </Context.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
