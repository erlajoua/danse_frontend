import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Context } from '../contexts/store'
import Header from "../components/Header";
import { api } from '../services/api'
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
	extractTimeFromDate
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
		  await api.put(`/cours/${id}`, token , {
			'jour': dateToDayOfMonth(cours.date),
			'mois': dateToMonth(cours.date),
			'heure': extractTimeFromDate(cours.heure),
			'style': cours.style,
			'jsemaine': dateToDayOfWeek(cours.date),
			'duree': cours.duree,
			'niveau': cours.niveau,
			'prix': cours.prix,
			'nbplace': cours.nbplace,
      'zoomLink': cours.zoomLink
		  }).then(() => {
			console.log("success");
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

	function createDateFromInfo(
		dayOfMonth: number,
		month: string,
		time: string
	  ): Date | null {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const monthNames = [
		  "Janvier",
		  "Février",
		  "Mars",
		  "Avril",
		  "Mai",
		  "Juin",
		  "Juillet",
		  "Août",
		  "Septembre",
		  "Octobre",
		  "Novembre",
		  "Décembre",
		];
	  
		const monthIndex = monthNames.indexOf(month);
	  
		if (monthIndex === -1) {
		  return null;
		}
	  
		const dateCandidateThisYear = new Date(currentYear, monthIndex, dayOfMonth);
		const dateCandidateNextYear = new Date(
		  currentYear + 1,
		  monthIndex,
		  dayOfMonth
		);
		const timeArray = time.split("h");
	  
		if (timeArray.length === 2) {
		  const hours = parseInt(timeArray[0], 10);
		  const minutes = parseInt(timeArray[1], 10);

		  if (!isNaN(hours) && !isNaN(minutes)) {
			dateCandidateThisYear.setHours(hours, minutes);
			dateCandidateNextYear.setHours(hours, minutes);
		  }
		}
	  
		if (dateCandidateThisYear >= currentDate) {
		  return dateCandidateThisYear;
		} else if (dateCandidateNextYear >= currentDate) {
		  return dateCandidateNextYear;
		}
	  
		return null;
	  }	  

	  
	useEffect(() => {
		api.get(`/cours/${id}`, token).then((response) => {
			const dateheure: Date | null = createDateFromInfo(response.data.jour, response.data.mois, response.data.heure);
			setCours({
				...response.data,
				date: dateheure,
				heure: dateheure
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
        <InputLabel className="mb-2">Lien Zoom Visio (optionnel)</InputLabel>
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