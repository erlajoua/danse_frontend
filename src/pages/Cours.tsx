import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CoursCardProps } from '../shared/interfaces';
import CoursCard from '../components/CoursCard';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { api } from '../services/api'
import './Cours.css';

const Cours = () => {
  const [cours, setCours] = useState<Array<CoursCardProps>>([]);
  const [admin, setAdmin] = useState(true);

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

  useEffect(() => {
    console.log('process = ', process.env.REACT_APP_API_URL);
    fetchCours();
  }, []);

  return (
    <div className="body w-full flex flex-col items-center justify-center">
      {admin && (
        <AppBar position="static" sx={{ marginBottom: 3 }}>
          <Toolbar>
            <Button color="inherit">Ajouter un cours</Button>
          </Toolbar>
        </AppBar>
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cours;
