import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IHeaderOptions } from '../shared/interfaces'

const AdminHeader = ({options}: {options: IHeaderOptions}) => {
	const navigate = useNavigate();

	const addCours = () => {
		navigate('/addCours');
	}

	const list = () => {
		navigate('/cours');
	}

	return (
		<div style={{width: '100%'}}>
			<AppBar position="static" sx={{ marginBottom: 3 }}>
				<Toolbar>
					{ options.list && <Button onClick={list} color="inherit">Liste de cours</Button> }
					{ options.addCours && <Button onClick={addCours} color="inherit">Ajouter un cours</Button> }
				</Toolbar>
			</AppBar>
	  </div>
	)
}

export default AdminHeader;