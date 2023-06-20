import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { io, Socket } from 'socket.io-client';
import { Context } from './contexts/store'

import Home from './pages/Home';
import Cours from './pages/Cours';
import AddCours from './pages/AddCours';
import NotFound from './pages/NotFound';
import InfosPratiques from './pages/InfosPratiques';
import ForgotPassword from './pages/ForgotPassword';
import EditCours from './pages/EditCours';
import { api } from './services/api';
import UserAccount from './pages/UserAccount';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f46ef6',
    },
  },
});

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const socketInstance: Socket = io(`${process.env.REACT_APP_API_URL}`, {
      transports: ['websocket'],
      upgrade: false
    });

    setSocket(socketInstance);

    if (token) {
      api.get('/users/admin', token).then(res => {
        console.log("res = ", res);
        if (res.data.admin === 1)
          setAdmin(true);
      })
    }

    return (() => {
      socketInstance.disconnect();
    });
  }, []);

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Context.Provider value={{token, socket, admin, setAdmin, setToken}}>
        { token && <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addCours" element={<AddCours />} />
            <Route path="/cours" element={<Cours />} />
            <Route path="/editCours" element={<EditCours />} />
            <Route path="/infos" element={<InfosPratiques />} />
            <Route path="/account" element={<UserAccount />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
