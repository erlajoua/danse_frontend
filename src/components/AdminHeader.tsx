import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { IAdminOptions } from '../shared/interfaces'
import { Context } from '../contexts/store'

const AdminHeader = ({options}: {options: IAdminOptions}) => {
	const navigate = useNavigate();
	const { setToken } = useContext(Context);

	const addCours = () => {
		navigate('/addCours');
	}

	const list = () => {
		navigate('/cours');
	}

	const account = () => {
		navigate('/account');
	}

	const disconnect = () => {
		setToken(null);
		navigate('/');
	}

	return (
		<div style={{width: '100%'}}>
			<AppBar position="static" sx={{ marginBottom: 3 }}>
				<Toolbar>
					{ options.cours && <Button onClick={list} color="inherit">Liste de cours</Button> }
					{ options.account && <Button onClick={account} color="inherit">Mon compte</Button> }
					{ options.addCours && <Button onClick={addCours} color="inherit">Ajouter un cours</Button> }
					{ options.disconnect && <Button onClick={disconnect} color="inherit">Déconnexion</Button> }
				</Toolbar>
			</AppBar>
	  </div>
	)
}

export default AdminHeader;