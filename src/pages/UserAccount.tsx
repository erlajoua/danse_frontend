import UserHeader from "../components/UserHeader";
import AdminHeader from "../components/AdminHeader";
import { IUserOptions, IAdminOptions } from "../shared/interfaces";
import { Context } from "../contexts/store";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
	const { admin, token } = useContext(Context);

	const navigate = useNavigate();

	useEffect(() => {
	  if (!token)
		navigate('/')
	})
	const userOptions: IUserOptions = {
		cours: true,
		account: true,
		disconnect: true
	  };

	  const adminOptions: IAdminOptions = {
		cours: true,
		account: true,
		addCours: true,
		disconnect: true
	}

	return (
		<div className="body">
			<span>User account</span>
		</div>
	)
}

export default UserAccount;