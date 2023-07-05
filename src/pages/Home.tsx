// pages/Home.tsx
import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Context } from "../contexts/store";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSameError, setPasswordSameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [otherError, setOtherError] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const navigate = useNavigate();
  const { setToken, setAdmin, token } = useContext(Context);

  const buttonEmail = useRef<HTMLButtonElement>(null);
  const buttonSignin = useRef<HTMLButtonElement>(null);
  const buttonSignup = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (token) {
      navigate("/cours");
    }

    const onKeyDown = (e: any) => {
      if (e.key === "Enter") {
        console.log("step = ", step);
        if (step === 0) buttonEmail?.current?.focus();
        if (step === 1) buttonSignin?.current?.focus();
        if (step === 2) buttonSignup?.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [step]);

  const checkEmailExists = async (email: string): Promise<void> => {
    console.log("will check");
    api
      .post("/users/email", token, { email })
      .then((res) => {
        setStep(1);
        return true;
      })
      .catch(() => {
        setStep(2);
        return false;
      });
  };

  const HandleSubmitSignup = async () => {
    let isError = false;
    isError = validatePhone();
    isError = validateFirstName();
    isError = validateLastName();
    isError = validatePassword();

    if (isError == false) {
      await api
        .post("/users/signup", token, {
          email,
          password,
          tel: phone,
          nom: lastName,
          prenom: firstName,
        })
        .then((res) => {
          setOtherError("");
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          setAdmin(res.data.admin === 1 ? true : false);
          navigate("/cours");
        })
        .catch((err) => {
          setOtherError(err.response.data);
        });
    }
    return isError;
  };

  const HandleSubmitSignin = () => {
    api
      .post("/users/signin", token, { email, password })
      .then((res) => {
        setOtherError('');
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setAdmin(res.data.admin === 1 ? true : false);
        navigate("/cours");
      })
      .catch((err) => {
        setOtherError('Mot de passe incorrect');
      });
  };

  const forgotPassword = () => {
    navigate("/forgot", { state: { email } });
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordSameError(true);
      return true;
    }
    setPasswordSameError(false);
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password.match(passwordRegex)) {
      setPasswordError(false);
      return false;
    } else {
      setPasswordError(true);
      return true;
    }
  };

  const validateEmail = (email: string) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  function validatePhone() {
    var phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{4,9}$/im;
    if (phone.match(phoneRegex) && phone.length === 10) {
      setPhoneError(false);
      return false;
    } else {
      setPhoneError(true);
      return true;
    }
  }

  function validateLastName() {
    var nameRegex = /^[a-z ,.'-]+$/i;
    if (lastName.match(nameRegex)) {
      setLastNameError(false);
      return false;
    } else {
      setLastNameError(true);
      return true;
    }
  }

  function validateFirstName() {
    var nameRegex = /^[a-z ,.'-]+$/i;
    if (firstName.match(nameRegex)) {
      setFirstNameError(false);
      return false;
    } else {
      setFirstNameError(true);
      return true;
    }
  }

  const handleSubmitEmail = async () => {
    if (validateEmail(email)) {
      setEmailError(false);
      await checkEmailExists(email);
    } else {
      setEmailError(true);
    }
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
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
            {emailError && (
              <FormHelperText error={true}>
                Le format de l'email est invalide.
              </FormHelperText>
            )}
            <Button
              variant="contained"
              color="primary"
              ref={buttonEmail}
              onClick={handleSubmitEmail}
              sx={{ mt: 3 }}
            >
              Suivant
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <ArrowBackIcon
              sx={{ alignSelf: "flex-start", mt: 2, cursor: "pointer" }}
              onClick={handleReset}
            />
            <Typography variant="h4">Entrez votre mot de passe</Typography>
            <TextField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mt: 3, minWidth: 280 }}
            />
            <span
              onClick={forgotPassword}
              className="cursor-pointer hover:text-[#f46ef6] hover:underline mt-1"
            >
              Mot de passe oublié?
            </span>
            <FormHelperText error={true}>{otherError}</FormHelperText>
            <Button
              ref={buttonSignin}
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={HandleSubmitSignin}
            >
              Se connecter
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <ArrowBackIcon
              sx={{ alignSelf: "flex-start", mt: 2, cursor: "pointer" }}
              onClick={handleReset}
            />
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
            {firstNameError && (
              <FormHelperText error={true}>
                Le format du prénom est invalide
              </FormHelperText>
            )}
            {lastNameError && (
              <FormHelperText error={true}>
                Le format du nom est invalide
              </FormHelperText>
            )}
            {phoneError && (
              <FormHelperText error={true}>
                Le format du téléphone est invalide
              </FormHelperText>
            )}
            {otherError !== "" && (
              <FormHelperText error={true}>{otherError}</FormHelperText>
            )}
            {passwordSameError && (
              <FormHelperText error={true}>
                Les mots de passe ne correspondent pas
              </FormHelperText>
            )}
            {passwordError && (
              <FormHelperText error={true}>
                Le mot de passe doit avoir au moins 8 caractères, 1 maj, 1 min,
                1 chiffre, 1 caractère spécial
              </FormHelperText>
            )}
            <Button
              variant="contained"
              ref={buttonSignup}
              color="primary"
              sx={{ mt: 3 }}
              onClick={HandleSubmitSignup}
            >
              S'inscrire
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Home;
