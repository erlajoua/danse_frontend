import { useEffect, useState, useContext } from 'react';
import { CoursCardProps, IHeaderOptions } from '../shared/interfaces';
import CoursCard from '../components/CoursCard';
import { api } from '../services/api'
import './Cours.css';
import AdminHeader from '../components/AdminHeader'
import { Context } from '../contexts/store'

const Cours = () => {
  const [cours, setCours] = useState<Array<CoursCardProps>>([]);
  const [admin, setAdmin] = useState(true);
  const context = useContext(Context);
  const { socket }  = context;

  const fetchCours = async () => {
    try {
      const response = await api.get(`/cours`);
      const data = response.data;
      console.log('data = ', data);
      setCours(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
    }
  };

	const options: IHeaderOptions = {
		'list': false,
		'addCours': true
	}

  useEffect(() => {
    fetchCours();

    socket.on('updateCoursList', () => {
      console.log("okkk");
      fetchCours();
    })
  }, []);

  return (
    <div className="body w-full flex flex-col items-center justify-center">
      {admin && (
        <AdminHeader options={options} />
      )}
      <div className="flex flex-wrap gap-4">
        {cours.map((cour, index) => (
          <div key={index}>
            <CoursCard
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cours;
