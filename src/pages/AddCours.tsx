import AdminHeader from "../components/AdminHeader";
import { IHeaderOptions } from '../shared/interfaces'

const AddCours = () => {
	const options: IHeaderOptions = {
		'list': true,
		'addCours': false
	}

	return (
		<div className="body">
			<AdminHeader options={options} />
		</div>
	)
}

export default AddCours;