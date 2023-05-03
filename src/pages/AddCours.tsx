import AdminHeader from "../components/AdminHeader";
import { IAdminOptions, IUserOptions } from "../shared/interfaces";
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
	dateToDayOfWeek,
	dateToMonth,
	extractTimeFromDate
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
  };

  const [cours, setCours] = useState<any>([defaultCours]);
  const navigate = useNavigate();
  const { token, admin } = useContext(Context);

  useEffect(() => {
	if (!token)
		navigate('/');
	if (admin === false)
		navigate('/cours');
  }, [])

  const adminOptions: IAdminOptions = {
    cours: true,
	account: true,
    addCours: true,
    disconnect: true
  };

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
		  await api.post('/cours', token , {
			'jour': dateToDayOfMonth(cour.date),
			'mois': dateToMonth(cour.date),
			'heure': extractTimeFromDate(cour.heure),
			'style': cour.style,
			'jsemaine': dateToDayOfWeek(cour.date),
			'duree': cour.duree,
			'niveau': cour.niveau,
			'prix': cour.prix,
			'nbplace': cour.nbPlaces
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
        <span className="mr-2">Ajouter un autre cours</span>
        <AddIcon
          onClick={() => {
            setCours((prev: any) => [...prev, defaultCours]);
          }}
        />
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
