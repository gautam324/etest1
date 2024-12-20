import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import GeocoderMarker  from './GeocoderMarker'

const Map = ({address, city, country}) => {
  //console.log(address);
  return (
    <MapContainer
      center={[53.35, 18.8]}
      zoom={1}
      scrollWheelZoom={false}
      className="h-[24rem] w-full mt-5 z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeocoderMarker 
        address={`${country} ${city} ${address}  `}
      />
    </MapContainer>
  )
}

export default Map