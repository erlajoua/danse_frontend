import AdminHeader from "../components/AdminHeader";
import { IHeaderOptions } from "../shared/interfaces";
import AddCoursCard from "../components/AddCoursCard";
import { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import {Button} from '@mui/material'
import { api } from '../services/api'
import { useNavigate } from "react-router-dom";
import { NIVEAUX } from '../shared/interfaces'
import { Context } from '../contexts/store'


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

  const options: IHeaderOptions = {
    list: true,
    addCours: false,
  };

  function dateToDayOfWeek(date: Date | null): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
    };

    if (date) {
      const dayOfWeek = date.toLocaleDateString("fr-FR", options);
      return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    }
    return "";
  }

  function dateToDayOfMonth(date: Date | null): number {
	if (date) {
	  return date.getDate();
	}
	return 0;
  }
  
  function dateToMonth(date: Date | null): string {
	const options: Intl.DateTimeFormatOptions = {
	  month: "long",
	};
  
	if (date) {
	  const month = date.toLocaleDateString("fr-FR", options);
	  return month.charAt(0).toUpperCase() + month.slice(1);
	}
	return "";
  }
  
  function extractTimeFromDate(date: Date | null): string {
	if (date) {
		const timeString = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
		return timeString.substring(0, 5);
	}
	return '';
  }
  
  
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
			'nbplace': cour.nbPlaces,
			'restplace': cour.nbPlaces
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
      {admin && <AdminHeader options={options} />}
      <div className="flex mb-4 items-center">
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
