// pages/Home.tsx
import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api'
import { Context  } from '../contexts/store'

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();
  const { setToken, setAdmin, token } = useContext(Context);

  useEffect(() => {
  if (token)
      navigate('/cours');
  }, [])

  const fakeAPICall = async (email: string): Promise<boolean> => {
    // Simule un appel d'API avec une réponse aléatoire (succès ou échec)
    return new Promise((resolve) => setTimeout(() => resolve(Math.random() > 0), 1000));
  };

  const HandleSubmitSignin = () => {

    api.post('/users/signin', token, {email, password}).then((res) => {
      console.log("res.data = ", res.data);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      if (res.data.admin === 1)
        setAdmin(true);
      navigate('/cours');
    }).catch(err => {
      alert('Email or password incorrect');
    })
  }

  const handleSubmitEmail = async () => {
    const success = await fakeAPICall(email);
    setStep(success ? 1 : 2);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {step === 0 && (
          <>
            <Typography variant="h4">Entrez votre email</Typography>
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mt: 3, minWidth: 280 }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmitEmail} sx={{ mt: 3 }}>
              Suivant
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <ArrowBackIcon sx={{ alignSelf: 'flex-start', mt: 2 }} onClick={handleReset} />
            <Typography variant="h4">Entrez votre mot de passe</Typography>
            <TextField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mt: 3, minWidth: 280 }}
            />
            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={HandleSubmitSignin}>
              Se connecter
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <ArrowBackIcon sx={{ alignSelf: 'flex-start', mt: 2 }} onClick={handleReset} />
            <Typography variant="h4">Inscription</Typography>
			<TextField
				label="Prénom"
				type="text"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				sx={{ mt: 3, minWidth: 280 }}
			  />
			  <TextField
				label="Nom"
				type="text"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				sx={{ mt: 3, minWidth: 280 }}
			  />
            <TextField
              label="Numéro de téléphone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ mt: 3, minWidth: 280 }}
            />
            <TextField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mt: 3, minWidth: 280 }}
            />
            <TextField
              label="Confirmez le mot de passe"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
			  sx={{ mt: 3, minWidth: 280 }}
			  />
			  <Button variant="contained" color="primary" sx={{ mt: 3 }}>
				S'inscrire
			  </Button>
			</>
		  )}
		</Box>
	  </Container>
	);
  };
  
  export default Home;
  