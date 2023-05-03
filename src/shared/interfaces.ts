export type {
	CoursCardProps
}

export {
	STYLES,
	NIVEAUX,
	DUREES
}

interface CoursCardProps {
	id?: string;
	_id?: string;
	style: string;
	jsemaine: string;
	jour: string;
	mois: string;
	heure: string;
	duree: string;
	niveau: string;
	prix?: string;
	restplace: string;
	isEnrolled: boolean;
}

const STYLES: any = {
	classique: "Classique",
	jazz: "Jazz",
	munzfloor: "Munz Floor",
	eveil: "Eveil",
  };
  
  const NIVEAUX: any = {
	classique: [
	  "Initiation",
	  "Préparatoire",
	  "Elémentaire",
	  "Moyen",
	  "Supérieur",
	],
	jazz: ["Enfant 1", "Enfant 2", "Débutant", "Intermédiaire", "Avancé"],
	munzfloor: [],
	eveil: [],
  };
  
  const DUREES: any = [
	"45min",
	"1h00",
	"1h15",
	"1h30",
	"1h45",
	"2h00",
	"2h15",
	"2h30",
	"3h00",
	"3h30",
	"4h00",
	"4h30",
  ];