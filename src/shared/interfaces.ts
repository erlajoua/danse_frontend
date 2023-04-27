export type {
	CoursCardProps,
	IHeaderOptions
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
}

interface IHeaderOptions {
	list: boolean;
	addCours: boolean;
}