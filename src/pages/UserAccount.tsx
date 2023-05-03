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

	return (
		<div className="body">
			<span>User account</span>
		</div>
	)
}

export default UserAccount;