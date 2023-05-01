import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../contexts/store'
import { IUserOptions } from '../shared/interfaces';

const UserHeader = ({ options }: {options: IUserOptions}) => {
	const { setToken } = useContext(Context);
	const navigate = useNavigate();

	const disconnect = () => {
		setToken(null);
		navigate('/');
	}

	const userAccount = () => {
		navigate('/account');
	}

	const cours = () => {
		navigate('/cours');
	}

	return (
		<div style={{width: '100%'}}>
			<AppBar position="static" sx={{ marginBottom: 3 }}>
				<Toolbar>
					{ options.cours && <Button onClick={cours} color="inherit">Cours</Button> }
					{ options.account && <Button onClick={userAccount} color="inherit">Mon compte</Button> }
					{ options.disconnect && <Button onClick={disconnect} color="inherit">Déconnexion</Button> }
				</Toolbar>
			</AppBar>
	  </div>
	)
}

export default UserHeader;