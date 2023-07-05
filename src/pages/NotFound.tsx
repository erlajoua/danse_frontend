import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../contexts/store';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useContext(Context);


  useEffect(() => {
    if (token)
      navigate('/cours');
    else
      navigate('/');
  }, []);
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default NotFound;