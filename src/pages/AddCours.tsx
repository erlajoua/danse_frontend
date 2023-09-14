import AddCoursCard from "../components/AddCoursCard";
import { useState, useContext, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import {Button} from '@mui/material'
import { api } from '../services/api'
import { useNavigate } from "react-router-dom";
import { NIVEAUX } from '../shared/interfaces'
import { Context } from '../contexts/store'
import {
	dateToDayOfMonth,
	dateToMonth,
	monthToNumber
} from '../services/utils'

const AddCours = () => {
  const defaultCours = {
    style: "",
    niveau: "",
    date: null,
    heure: null,
    duree: "",
    nbPlaces: 1,
    prix: 0,
	zoomLink: ''
  };

  const [cours, setCours] = useState<any>([defaultCours]);
  const navigate = useNavigate();
  const { token, admin } = useContext(Context);

  useEffect(() => {
	if (!token)
		navigate('/');
	if (!admin)
		navigate('/cours');
  }, [])

  const submitAll = async () => {
	const mandatoryFields = ['date', 'heure', 'style', 'duree', 'nbPlaces'];
	try {
		for (let j = 0; j < cours.length; j++) {

			const newMandatoryFields = [...mandatoryFields];
			if (cours[j]?.style === '' || cours[j]?.style === null) {
				alert('Tous les champs ne sont pas remplis');
				return;
			}
			if (NIVEAUX[cours[j].style].length > 0)
				newMandatoryFields.push('niveau');

		  const allFieldsValid = newMandatoryFields.every((field) => {
			return cours[j][field] !== undefined && cours[j][field] !== null && cours[j][field] !== '';
		  });

		  if (!allFieldsValid) {
			alert('Tous les champs ne sont pas remplis');
			return;
		  }
	}
	  await Promise.all(
		cours.map(async (cour: any) => {

		const dateObject = new Date(cour.date);
		const heureObject = new Date(cour.heure);

		const hours = heureObject.getUTCHours();
		const minutes = heureObject.getUTCMinutes();

		dateObject.setUTCHours(hours, minutes);
		dateObject.setDate(dateToDayOfMonth(cour.date));
		dateObject.setMonth(monthToNumber(dateToMonth(cour.date)));

		  await api.post('/cours', token , {
			'style': cour.style,
			'duree': cour.duree,
			'niveau': cour.niveau,
			'prix': cour.prix,
			'nbplace': cour.nbPlaces,
			'zoomLink': cour.zoomLink,
		  	'date': dateObject
		  });
		})
	  );
	  navigate('/cours');
	} catch (error) {
	  console.error(error);
	}
  };



  return (
    <div className="body flex items-center flex-col">
      <div className="flex mb-4 items-center cursor-pointer">
        <Button variant="outlined" className="mr-2"           onClick={() => {
            setCours((prev: any) => [...prev, defaultCours]);
          }}>Ajouter un autre cours</Button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {cours?.map((cour: any, index: number) => {
          return (
            <AddCoursCard
              cours={cours}
              index={index}
              key={index}
              setCours={setCours}
            />
          );
        })}
      </div>

		<Button
			variant="contained"
			color="primary"
			sx={{mt: 2}}
			onClick={submitAll}
		>
			Créer
		</Button>
    </div>
  );
};

export default AddCours;
