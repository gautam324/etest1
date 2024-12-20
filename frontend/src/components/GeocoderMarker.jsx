import React, { useState, useEffect } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconsShadow from 'leaflet/dist/images/marker-shadow.png'
import * as ELG from 'esri-leaflet-geocoder'
import axios from 'axios'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconsShadow
})

L.Marker.prototype.options.icon = DefaultIcon

const GeocoderMarker = ({address}) => {

  const map = useMap()
  const [position, setPosition] = useState([60, 19]);

  // useEffect(() => {
  //   ELG.geocode().text(address).run((err, results, response) => {    // esri requiere de una api-key de pago
  //     console.log('results',results);
  //     if(results?.results?.length > 0){
  //       const {lat, lng} = results?.results[0].latlng
  //       setPosition([lat, lng])
  //       map.flyTo([lat, lng], 6)
  //     }
  //   })
  // },[address])

  useEffect(() => {
    if (address) {
     
      const apiKey = process.env.VITE_APP_OPENCAGE_API_KEY; // Reemplaza con tu API key
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

      axios.get(url).then((response) => {
        const results = response.data.results;
        if (results && results.length > 0) {
          const { lat, lng } = results[0].geometry;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 13); // Ajustado el nivel de zoom
        } else {
          console.warn('No results found for the address:', address);
        }
      }).catch((err) => {
        console.error('Geocoding error:', err);
      });
    }
  }, [address, map]);

  return (
    <Marker
      position={position}
      icon={DefaultIcon}
    >
      <Popup />
    </Marker>
  )
}

export default GeocoderMarker