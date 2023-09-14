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
import Users from './pages/Users';
import { api } from './services/api';
import UserAccount from './pages/UserAccount';
import Header from './components/Header';
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

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
  const [tokens, setTokens] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const socketInstance: Socket = io(`${process.env.REACT_APP_API_URL}`, {
      transports: ['websocket'],
      upgrade: false
    });


    console.log("socketInstance = ", socketInstance);

    setSocket(socketInstance);

    if (token) {
      api.get('/users/admin', token).then(res => {
        if (res.data.admin === 1)
          setAdmin(true);
        setTokens(res.data.tokens);
        setLoading(false);
      }).catch(err => {
        if (err.response.data.error === 'TOKEN') {
          setToken(null);
        }
        setLoading(false);
      })
    } else {
      setLoading(false);
    }

    return (() => {
      socketInstance.disconnect();
    });
  }, []);

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
      <Elements stripe={stripePromise}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>

        {!loading && (
        <Context.Provider value={{token, socket, admin, setAdmin, setToken, tokens, setTokens}}>
        { token && <Header />}
        <div style={{ minHeight: "calc(100vh - 62px)", overflow: "auto", marginTop: "62px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addCours" element={<AddCours />} />
            <Route path="/cours" element={<Cours />} />
            <Route path="/editCours" element={<EditCours />} />
            <Route path="/infos" element={<InfosPratiques />} />
            <Route path="/account" element={<UserAccount />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </Context.Provider>
        )}
      </BrowserRouter>
    </ThemeProvider>
      </Elements>
  );
};

export default App;
