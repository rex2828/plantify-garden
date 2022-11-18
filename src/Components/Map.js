import React from 'react'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"

const Map = ({setShowModal}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAjOH0KyzlCsfmS8CbIMEe2Tkp5DPmvpd8"
      })
    
      const mapContainerStyle = {
        height: "100vh",
        width: "100vw"
      }
      
      const center = {
        lat: 13.5269,
        lng: 79.9802
      }
    
      const onLoad = marker => {
        console.log('marker: ', marker)
      }
    
      const onClickMarker = (e) => {
        console.log("latitude", e.latLng.lat())
        console.log("longitude", e.latLng.lng())
        setShowModal(true)
      }
    
      if (!isLoaded) {
        return <div>Loading....</div>
      }
  return (
    <GoogleMap zoom={15} center={center} mapContainerStyle={mapContainerStyle} onClick={ev => {
        console.log("latitide = ", ev.latLng.lat());
        console.log("longitude = ", ev.latLng.lng());
      }}>
        <MarkerF position={center} onLoad={onLoad} onClick={onClickMarker}/>
      </GoogleMap>
  )
}

export default Map