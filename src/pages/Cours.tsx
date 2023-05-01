import { useEffect, useState, useContext } from 'react';
import { CoursCardProps, IAdminOptions } from '../shared/interfaces';
import CoursCard from '../components/CoursCard';
import { api } from '../services/api'
import './Cours.css';
import AdminHeader from '../components/AdminHeader'
import { Context } from '../contexts/store'
import UserHeader from '../components/UserHeader';
import { IUserOptions } from '../shared/interfaces';

const Cours = () => {
  const [cours, setCours] = useState<Array<CoursCardProps>>([]);
  const { socket, token, admin } = useContext(Context);


  const userOptions: IUserOptions = {
    cours: false,
    account: true,
    disconnect: true
  };

  const fetchCours = async () => {
    try {
      const response = await api.get(`/cours`, token);
      const data = response.data;
      console.log("Liste des cours = ", response.data);
      setCours(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
    }
  };

	const adminOptions: IAdminOptions = {
		cours: false,
    account: true,
		addCours: true,
    disconnect: true
	}

  useEffect(() => {
    fetchCours();

    socket.on('updateCoursList', () => {
      fetchCours();
    })
  }, []);

  return (
    <div className="body w-full flex flex-col items-center">
      {admin ? (
        <AdminHeader options={adminOptions} />
      ) : (<UserHeader  options={userOptions} />)}
      <div className="flex flex-wrap justify-center w-full gap-4">
        {cours.map((cour, index) => (
            <CoursCard
              key={index}
              id={cour._id}
              style={cour.style}
              jsemaine={cour.jsemaine}
              jour={cour.jour}
              mois={cour.mois}
              heure={cour.heure}
              duree={cour.duree}
              niveau={cour.niveau}
              prix={cour.prix}
              restplace={cour.restplace}
              isEnrolled={cour.isEnrolled}
            />
        ))}
      </div>
    </div>
  );
};

export default Cours;
