import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Context } from '../contexts/store'
import Header from "../components/Header";
import { api } from '../services/api'
import { parseISO } from 'date-fns';
import {
	InputLabel,
	Grid,
	Select,
	MenuItem,
	TextField,
	Chip,
	Button
  } from "@mui/material";
import { STYLES, NIVEAUX, DUREES } from "../shared/interfaces";
import {
	DatePicker,
	TimePicker,
	LocalizationProvider,
  } from "@mui/x-date-pickers";
  import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
  import {
	dateToDayOfMonth,
	dateToDayOfWeek,
	dateToMonth,
	extractTimeFromDate, monthToNumber
  } from '../services/utils'

const EditCours = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [cours, setCours] = useState<any>();
	const { token, admin } = useContext(Context);

	const id = location?.state?.id;

  useEffect(() => {
    if (!token)
      navigate('/');
    if (!id || !admin)
		  navigate('/cours');
  }, [])

	const handleUpdate = async () => {
		const mandatoryFields = ['date', 'heure', 'style', 'duree', 'nbplace'];

			const newMandatoryFields = [...mandatoryFields];
			if (cours?.style === '' || cours?.style === null) {
				alert('Tous les champs ne sont pas remplisY');
				return;
			}

			if (NIVEAUX[cours.style].length > 0)
				newMandatoryFields.push('niveau');
	  
		  const allFieldsValid = newMandatoryFields.every((field) => {
			return cours[field] !== undefined && cours[field] !== null && cours[field] !== '';
		  });
	  
		  if (!allFieldsValid) {
			alert('Tous les champs ne sont pas remplisX');
			return;
		  }

		const dateObject = new Date(cours.date);
		const heureObject = new Date(cours.heure);

		const hours = heureObject.getUTCHours();
		const minutes = heureObject.getUTCMinutes();

		dateObject.setUTCHours(hours, minutes);
		dateObject.setDate(dateToDayOfMonth(cours.date));
		dateObject.setMonth(monthToNumber(dateToMonth(cours.date)));

		  await api.put(`/cours/${id}`, token , {
			'style': cours.style,
			'duree': cours.duree,
			'niveau': cours.niveau,
			'prix': cours.prix,
			'nbplace': cours.nbplace,
			'zoomLink': cours.zoomLink,
		  	'date': dateObject
		  }).then(() => {
			navigate('/cours');
		  }).catch(err => {
			console.error(err);
		  })
	}

	const handleChange = (event: any, value: string) => {
		if (value === 'style')
			setCours({ ...cours, [value]: event, niveau: '' });
		else
			setCours({ ...cours, [value]: event });
	};

	useEffect(() => {
		api.get(`/cours/${id}`, token).then((response) => {
			const date = parseISO(response.data.date);

			setCours({
				...response.data,
				date,
				heure: new Date(date.toUTCString().slice(0, -4)).getTime()
			});
		}).catch((error) => {
			console.error(error);
		});
	}, []);



	if (!cours)
		return <span>Loading...</span>

	return (
		<div className="body flex items-center flex-col">
<div className=" flex items-center justify-center flex-col gap-4 bg-white rounded-lg p-8 w-[400px] relative shadow-lg">
			<div className="flex gap-2">
        <div>
          <InputLabel id="style-label">Style</InputLabel>
          <Select
            labelId="style-label"
            id="style"
            value={cours.style}
            onChange={(event) => {
              handleChange(event.target.value, "style");
            }}
            label="Style"
            displayEmpty
          >
            {Object.keys(STYLES).map((elem: any, index: number) => {
              return (
                <MenuItem value={elem} key={index}>
                  {STYLES[elem]}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        {cours.style !== "" &&
          NIVEAUX[cours.style]?.length > 0 && (
            <div>
              <InputLabel id="niveau-label">Niveau</InputLabel>
              <Select
                labelId="niveau-label"
                id="niveau"
                value={cours.niveau}
                onChange={(event) => {
                  handleChange(event.target.value, "niveau");
                }}
                label="Niveau"
              >
                {cours.style !== "" &&
                  NIVEAUX[cours.style]?.map(
                    (elem: any, index: number) => {
                      return (
                        <MenuItem value={elem} key={index}>
                          {elem}
                        </MenuItem>
                      );
                    }
                  )}
              </Select>
            </div>
          )}
      </div>

      <div className="flex gap-2">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date "
            value={cours.date}
            onChange={(event: any) => {
              {
                handleChange(event, "date");
              }
            }}
            format="dd/MM/yyyy"
            sx={{ width: 125 }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Heure"
            value={cours.heure}
            onChange={(event) => {
              {
                handleChange(event, "heure");
              }
            }}
            ampm={false}
            openTo="hours"
            views={["hours", "minutes"]}
            sx={{ width: 100 }}
          />
        </LocalizationProvider>
      </div>
      <div>
        <InputLabel id="duree-label" className="mb-2">
          Durée
        </InputLabel>
        <Grid container spacing={1}>
          {DUREES.map((elem: any, index2: number) => {
            return (
              <Grid
                item
                xs={3}
                key={index2}
                sx={{
                  width: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Chip
                  label={elem}
                  clickable
                  color={
                    cours?.duree === DUREES[index2]
                      ? "primary"
                      : "default"
                  }
                  onClick={() => {
                    handleChange(elem, "duree");
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2 flex-col">
          <InputLabel className="mb-2">Nombre de places</InputLabel>
          <TextField
            type="number"
            value={cours.nbplace}
            onChange={(event) => {
              {
                handleChange(parseInt(event.target.value), "nbplace");
              }
            }}
            variant="outlined"
            inputProps={{
              min: 1,
              max: 300,
            }}
          />
        </div>

        <div className="flex items-center gap-2 flex-col">
          <InputLabel className="mb-2">Prix (optionnel)</InputLabel>
          <div className="flex items-center">
            <TextField
              type="number"
              value={cours.prix}
              onChange={(event) => {
                handleChange(parseInt(event.target.value), "prix");
              }}
              variant="outlined"
              inputProps={{
                min: 0,
                max: 300,
              }}
            />
            <span className="ml-1">€</span>
          </div>
        </div>
      </div>

    <div className="flex items-center flex-col">
        <InputLabel className="mb-2">Lien Zoom Visioconférence (optionnel)</InputLabel>
        <TextField
          label="Lien Zoom"
          placeholder="https://zoom.us/......"
          type="text"
          value={cours.zoomLink}
          onChange={(event) => {
            handleChange(event.target.value, "zoomLink");
          }}
          sx={{ minWidth: 280 }}
        />
      </div>
		</div>
    <Button
			variant="contained"
			color="primary"
			sx={{mt: 2}}
			onClick={handleUpdate}
		>
			Editer
		</Button>
		</div>
	)
}

export default EditCours;