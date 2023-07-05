import { api } from "../services/api";
import { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../contexts/store";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, FormHelperText, Button, Typography } from "@mui/material";

const ForgotPassword = () => {
  const { token, setToken, setAdmin } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<string[]>(Array(7).fill(""));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [codeValid, setCodeValid] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSameError, setPasswordSameError] = useState(false);
  const email = location?.state?.email;

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (
        value === "" ||
        (value.charCodeAt(0) > 47 && value.charCodeAt(0) < 58)
      ) {
        const newValues = [
          ...inputValues.slice(0, index),
          value.slice(0, 1),
          ...inputValues.slice(index + 1),
        ];
        setInputValues(newValues);

        if (value !== "" && inputRefs.current[index + 1]) {
          inputRefs?.current[index + 1]?.focus();
        }

        if (newValues.join("").length === 7) {
          checkCode(newValues.join(''))
            .then(() => {
              setCodeValid(true);
              setInputValues(Array(7).fill(""));
            })
            .catch(() => {
              setErrorMessage("Le code saisi est invalide.");
              setTimeout(() => {
                setErrorMessage(null);
                setInputValues(Array(7).fill(""));
                inputRefs?.current[0]?.focus();
              }, 4000);
            });
        }
      } else if (value === "" && inputRefs.current[index - 1]) {
        inputRefs?.current[index - 1]?.focus();
      }
    };

  const handleKeyDown =
    (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key === "Backspace" &&
        inputValues[index] === "" &&
        inputRefs.current[index - 1]
      ) {
        inputRefs?.current[index - 1]?.focus();
      }
    };


	const checkCode = async (newCode: string) => {
		const response = await api.post('/users/checkCode', token, {email, code: newCode});
		return response;
	  };
	

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (pastedData && pastedData.length <= 7) {

		const newInputValues = [
			...pastedData.split(""),
			...Array(7 - pastedData.length).fill(""),
		  ]
      setInputValues(newInputValues);

	  if (newInputValues.join('').length === 7) {
		checkCode(newInputValues.join(''))
		.then(() => {
		  setCodeValid(true);
		  setInputValues(Array(7).fill(""));
		})
		.catch(() => {
		  setErrorMessage("Le code saisi est invalide.");
		  setTimeout(() => {
			setErrorMessage(null);
			setInputValues(Array(7).fill(""));
			inputRefs?.current[0]?.focus();
		  }, 2700);
		});
	}}
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

  const HandleSubmitChange = async () => {
    let isError = validatePassword();
    if (isError == false) {
		api.post('/users/update', token, {email, password}).then(res => {
			setErrorMessage(null);
			setToken(res.data.token);
			localStorage.setItem('token', res.data.token);
			setAdmin(res.data.admin === 1 ? true : false);
			navigate('/cours');
		}).catch(err => {
			setErrorMessage("Une erreur s'est produite, veuillez réessayer plus tard.")
		})
	}
	return isError;
  };


  useEffect(() => {
    if (!email) navigate("/");
    else {
      api
        .post("/users/forgot", token, {
          email: email,
        })
        .then((res) => {
          setIsSent(true);
        })
        .catch((err) => {
          setIsSent(false);
        });
    }

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="flex items-center flex-col justify-center h-[100vh]">
      {isSent === true &&
        (codeValid === false ? (
          <>
            <h3 className="text-2xl mb-2">
              Un code pour réinitialiser votre mot de passe vous a été envoyé
              sur
            </h3>
            <h4 className="font-bold text-xl text-[#f46ef6]">{email}</h4>
            <div className="mt-4">
              {inputValues.map((value, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  maxLength={1}
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "5px",
                    textAlign: "center",
                    border: "2px solid black",
                    borderRadius: "12px",
                    fontSize: "2rem",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.border = "3px solid black")}
                  onBlur={(e) => (e.target.style.border = "2px solid black")}
                  type="text"
                  value={value}
                  onChange={handleChange(index)}
                  onKeyDown={handleKeyDown(index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                />
              ))}
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </>
        ) : (
          <>
            <Typography variant="h4">Entrez un nouveau mot de passe</Typography>
            <TextField
              label="Nouveau mot de passe"
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
            {passwordSameError && (
              <FormHelperText error={true}>
                Les mots de passe ne correspondent pas
              </FormHelperText>
            )}
            {passwordError && (
              <FormHelperText error={true}>
                Le mot de passe doit avoir au moins 8 caractères, 1 maj, 1 min,
                1 chiffre, 1 caractère spécial)
              </FormHelperText>
            )}

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={HandleSubmitChange}
            >
              Valider
            </Button>
          </>
        ))}
    </div>
  );
};

export default ForgotPassword;
