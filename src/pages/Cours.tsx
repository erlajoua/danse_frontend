import { useEffect, useState, useContext } from 'react';
import { CoursCardProps } from '../shared/interfaces';
import CoursCard from '../components/CoursCard';
import { api } from '../services/api'
import './Cours.css';
import { Context } from '../contexts/store'
import { useNavigate } from 'react-router-dom';

const Cours = () => {
  const [cours, setCours] = useState<Array<CoursCardProps>>([]);
  const { socket, token, admin } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token)
      navigate('/')
  })

  const fetchCours = async () => {
    try {
      const response = await api.get(`/cours`, token);
      const data = response.data;
      setCours(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
    }
  };

  useEffect(() => {
    fetchCours();

    socket.on('updateCoursList', () => {
      fetchCours();
    })
  }, []);

  return (
    <div className="body w-full flex flex-col items-center">
      <div className="flex flex-wrap justify-center w-full gap-6 p-4">
        {cours.map((cour, index) => (
            <CoursCard
              key={index}
              id={cour._id}
              style={cour.style}
              date={cour.date}
              duree={cour.duree}
              niveau={cour.niveau}
              prix={cour.prix}
              restplace={cour.restplace}
              isEnrolled={cour.isEnrolled}
              isDisabled={cour.isDisabled}
            />
        ))}
      </div>
    </div>
  );
};

export default Cours;
