import { useEffect, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../contexts/store';
import mapboxgl from 'mapbox-gl'; 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJsYWpvdWEiLCJhIjoiY2xoNWdvOXpyMXphejNyb3hnMWlsZHZyMyJ9.65OKcKmokJv-wPfa9Xq-Eg';
 
const InfosPratiques = () => {
	const navigate = useNavigate();
	const { token, admin } = useContext(Context);

	const mapContainer = useRef<any>(null);
	const map = useRef<any>(null);
	const [lat, setLat] = useState(45.944979);
	const [lng, setLng] = useState(-0.958312);

	useEffect(() => {
		if (!token)
			navigate('/');

		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/outdoors-v12',
			center: [lng, lat],
			attributionControl: false,
			zoom: 16
		});

		
		new mapboxgl.Marker()
		.setLngLat([-0.958312, 45.944979])
		.addTo(map.current);
	}, [])
	
return (
	<div className="body flex items-center flex-col">
		<div className="flex items-center mb-2">
			<LocationOnIcon />
			<span className="ml-1">25 Av. Marcel Dassault, 17300 Rochefort</span>
		</div>
		<div ref={mapContainer} className="map-container" />
		<div className="flex items-center mt-4">
			<LocalPhoneIcon />
			<span className="ml-1">06 17 46 53 45</span>
		</div>
	</div>
)

}

export default InfosPratiques;