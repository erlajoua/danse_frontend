import { useNavigate, useLocation } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { Context } from '../contexts/store'
import TokensIcon from '../icons/TokensIcon';
import BuyModal from "./BuyModal/BuyModal";
import './Header.css'
import VisioModal from "./VisioModal";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setToken, admin, tokens } = useContext(Context);
	const [openBuyModal, setOpenBuyModal] = useState(false);

	const options = {
		addCours: admin,
		users: admin
	}

	const addCours = () => {
		navigate('/addCours');
	}

	const list = () => {
		navigate('/cours');
	}

	const users = () => {
		navigate('/users');
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
		<div className="w-full fixed top-0 left-0 z-50" style={{ backgroundColor: '#fff' }}>
			<div className="h-[50px] mb-3 flex justify-between items-center shadow-lg px-4 text-[10px] lg:text-lg">
				<div className="items-center flex gap-2 h-full" color="inherit">
					<span>{tokens}</span>
					<TokensIcon />
					<button
						type="button"
						className="flex items-center justify-center inline-flex justify-center rounded-md border border-transparent bg-[#f46ef6] px-4 py-2 text-sm font-medium h-1/2 text-white hover:bg-[#f4b8f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
						onClick={() => {setOpenBuyModal(true)}}
					>
						Acheter
					</button>
				</div>
				<div className="flex justify-center flex-grow h-full mr-[20px] sm:mr-0" style={{ gap: 20 }}>
					<div className="header-item " style={{ borderBottom: location.pathname === '/cours' ? '4px solid #f46ef6' : '', marginTop: location.pathname === '/cours' ? '4px' : '', borderRadius: 0 }} onClick={list} color="inherit">Liste de cours</div>
					{options.addCours && <div className="header-item " style={{ borderBottom: location.pathname === '/addCours' ? '4px solid #f46ef6' : '', marginTop: location.pathname === '/addCours' ? '4px' : '', borderRadius: 0 }} onClick={addCours} color="inherit">Ajouter un cours</div>}
					{options.users && <div className="header-item " style={{ borderBottom: location.pathname === '/users' ? '4px solid #f46ef6' : '', marginTop: location.pathname === '/users' ? '4px' : '', borderRadius: 0 }} onClick={users} color="inherit">Elèves</div>}
					<div className="header-item " style={{ borderBottom: location.pathname === '/infos' ? '4px solid #f46ef6' : '', marginTop: location.pathname === '/infos' ? '4px' : '', borderRadius: 0 }} onClick={infos} color="inherit">Infos pratiques</div>
				</div>
				<div className="header-item flex" style={{ borderBottom: location.pathname === '/disconnect' ? '4px solid #f46ef6' : '', marginTop: location.pathname === '/disconnect' ? '4px' : '', borderRadius: 0 }} onClick={disconnect} color="inherit">Déconnexion</div>
			</div>
			<BuyModal isOpen={openBuyModal} setIsOpen={setOpenBuyModal} />
		</div>
	)

}

export default Header;
