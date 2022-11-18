import React, { useState }  from 'react'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"

const Map = ({setShowModal, addMarker, onClickMarker, markerList}) => {
    // var firstTime = true;
    const [firstTime, setFirstTime] = useState(true);

    // const [markerList, setMarkerList] = useState([{
    //   lat: 13.5269,
    //   lng: 79.9802
    // }])

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
    
      // const onClickMarker = (e) => {
      //   const d = new Date();
      //   // console.log(d.valueOf())
      //   setShowModal(true)
        
      //   if(!firstTime){
      //     markerList.pop()
      //     setMarkerList(markerList)
      //     setFirstTime(true);
      //   }
      // }
    
      if (!isLoaded) {
        return <div>Loading....</div>
      }
  return (
    <GoogleMap zoom={15} center={center} mapContainerStyle={mapContainerStyle} onClick={addMarker}>
        {/* <MarkerF position={center} onLoad={onLoad} onClick={onClickMarker}/> */}
        {markerList.map((e) => <MarkerF position={e} onLoad={onLoad} onClick={onClickMarker}/>)}
      </GoogleMap>
  )
}

export default Map