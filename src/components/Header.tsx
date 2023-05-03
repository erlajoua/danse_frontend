import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../contexts/store'
import './Header.css'

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setToken, admin} = useContext(Context);

	const options = {
		addCours: admin
	}

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
		localStorage.removeItem('token');
		navigate('/');
	}

	const infos = () => {
		navigate('/infos');
	}

	return (
		<div className="w-full mb-4">
			<div className="h-[50px] mb-3 flex justify-around shadow-lg">
				<div style={{display: 'flex', gap: 20, justifyContent: 'flex-end'}}>
					<div className="header-item"  style={{ borderBottom: location.pathname === '/cours' ? '4px solid #f46ef6' : '', marginTop: location.pathname === '/cours' ? '4px' : '', borderRadius: 0}} onClick={list} color="inherit">Liste de cours</div>
					{ options.addCours === true && <div className="header-item" style={{ borderBottom: location.pathname === '/addCours' ? '4px solid #f46ef6' : '', marginTop: location.pathname === '/addCours' ? '4px' : '', borderRadius: 0}} onClick={addCours} color="inherit">Ajouter un cours</div> }
					<div className="header-item" style={{ borderBottom: location.pathname === '/infos' ? '4px solid #f46ef6' : '', marginTop: location.pathname === '/infos' ? '4px' : '', borderRadius: 0}} onClick={infos} color="inherit">Infos pratiques</div>
					<div className="header-item" style={{ borderBottom: location.pathname === '/account' ? '4px solid #f46ef6' : '', marginTop: location.pathname === '/account' ? '4px' : '', borderRadius: 0}} onClick={account} color="inherit">Mon compte</div>
					<div className="header-item"  style={{ borderBottom: location.pathname === '/disconnect' ? '4px solid #f46ef6' : '', marginTop: location.pathname === '/disconnect' ? '4px' : '', borderRadius: 0}} onClick={disconnect} color="inherit">Déconnexion</div>
			
				</div>
			</div>
	  </div>
	)
}

export default Header;