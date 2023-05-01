import UserHeader from "../components/UserHeader";
import AdminHeader from "../components/AdminHeader";
import { IUserOptions, IAdminOptions } from "../shared/interfaces";
import { Context } from "../contexts/store";
import { useContext } from "react";

const UserAccount = () => {
	const { admin } = useContext(Context);
	const userOptions: IUserOptions = {
		cours: true,
		account: false,
		disconnect: true
	  };

	  const adminOptions: IAdminOptions = {
		cours: true,
		account: false,
		addCours: true,
		disconnect: true
	}

	return (
		<div className="body">
			{admin ? <AdminHeader options={adminOptions}/> : <UserHeader options={userOptions} />}
			<span>User account</span>
		</div>
	)
}

export default UserAccount;