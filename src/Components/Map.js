import React, { useState }  from 'react'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import othersPlant from './../assets/images/plant5.png'
import myPlant from './../assets/images/plant4.png'

const Map = ({setShowModal, addMarker, onClickMarker, markerList, setMarkerList}) => {
    // var firstTime = true;
    const [firstTime, setFirstTime] = useState(true);
    const db = getFirestore();
    const auth = getAuth();
    


    // const [markerList, setMarkerList] = useState([{
    //   lat: 13.5269,
    //   lng: 79.9802
    // }])
        const loadPlants = async () => {
          const querySnapshot = await getDocs(collection(db, "plants"));
          const dummy = [];
          querySnapshot.forEach((doc) => {
              dummy.push(doc.data());
              setFirstTime(true);
          // console.log(doc.id, " => ", doc.data().lat);
          });
          setMarkerList([...dummy])
  
      }

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
        loadPlants();
        return <div>Loading....</div>
      }
  return (
    <GoogleMap zoom={15} center={center} mapContainerStyle={mapContainerStyle} onClick={addMarker}>
        {/* <MarkerF position={center} onLoad={onLoad} onClick={onClickMarker}/> */}
        {markerList.map((e, index) => <MarkerF options={
          {
            icon: (e.ownerId !== auth.currentUser?.uid)? othersPlant : myPlant,
          }
        } position={{lat: e.lat, lng: e.lng}} onLoad={onLoad} onClick={(ev) =>onClickMarker(index, ev)}/>)}
      </GoogleMap>
  )
}

export default Map