import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../contexts/store'
import { IUserOptions } from '../shared/interfaces';

const UserHeader = ({ options }: {options: IUserOptions}) => {
	const { setToken } = useContext(Context);
	const navigate = useNavigate();

	const disconnect = () => {
		localStorage.removeItem('token');
		setToken(null);
		navigate('/');
	}

	const userAccount = () => {
		navigate('/account');
	}

	const cours = () => {
		navigate('/cours');
	}

	const infos = () => {
		navigate('/infos');
	}


	return (
		<div style={{width: '100%'}}>
		  <AppBar position="static" sx={{marginBottom: 3 }}>
			<div style={{display: 'flex', gap: 6, justifyContent: 'flex-end', color: 'white'}}>
			  { options.cours && <Button sx={{ border: '4px solid #f46ef6'}} onClick={cours} color="inherit" className="header-item">Cours</Button> }
				<Button className="header-item" sx={{ border: '4px solid #f46ef6!important'}} onClick={infos} color="inherit">Infos pratiques</Button>
			  { options.account && <Button onClick={userAccount} color="inherit" className="header-item">Mon compte</Button> }
			  { options.disconnect && <Button onClick={disconnect} color="inherit" className="header-item">Déconnexion</Button> }
			</div>
		  </AppBar>
		</div>
	  );
}

export default UserHeader;