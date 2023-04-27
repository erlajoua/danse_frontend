import AdminHeader from "../components/AdminHeader";
import { IHeaderOptions } from '../shared/interfaces'
import { useState } from 'react'
import { InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import './AddCours.css'

const STYLES: any = {
	classique: 'Classique',
	jazz: 'Jazz',
	munzfloor: 'Munz Floor'
}

const NIVEAUX: any = {
	classique: [
		'classique1', 'classique2'
	],
	jazz: [
		'jazz1', 'jazz2', 'jazz3'
	],
	munzfloor: [
		'tous niveaux'
	]
}

const AddCours = () => {
	const [style, setStyle] = useState('');
	const [niveau, setNiveau] = useState('');
	const [date, setDate] = useState<Date | null>(null);
	const [heure, setHeure] = useState(null);

	const options: IHeaderOptions = {
		'list': true,
		'addCours': false
	}

	return (
		<div className="body">
			<AdminHeader options={options} />
<div className=" flex items-center justify-center flex-col gap-4">
	<div>
			<InputLabel id="style-label">Style</InputLabel>
			<Select
				labelId="style-label"
				id="style"
				value={style}
				onChange={(event) => setStyle(event.target.value)}
				label="Style"
			>
				{ Object.keys(STYLES).map((elem: any, index: number) => {
				    return (
				        <MenuItem value={elem} key={index}>{STYLES[elem]}</MenuItem>
				    )
				})}
			</Select>
			</div>
			{ style !== '' && (
				<div>
					<InputLabel id="niveau-label">Niveau</InputLabel>
					<Select
						labelId="niveau-label"
						id="niveau"
						value={niveau}
						onChange={(event) => setNiveau(event.target.value)}
						label="Niveau"
					>
						{ style !== '' && NIVEAUX[style]?.map((elem: any, index: number) => {
							return (
								<MenuItem value={elem} key={index}>{elem}</MenuItem>
							)
						})}
					</Select>


				</div>
			)}

					<LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date du cours"
        value={date}
        onChange={(newValue: any) => {
          setDate(newValue);
        }}
		format="dd/MM/yyyy"
      />
	  </LocalizationProvider>

	  <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Heure du cours"
        value={heure}
        onChange={(newValue) => {
          setHeure(newValue);
        }}
		ampm={false}
		openTo="hours"
		views={['hours', 'minutes']}
      />
    </LocalizationProvider>
	  </div>
		</div>
	)
}

export default AddCours;
