import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Map from "../Components/Map"
import Modal from "../Components/Modal"
export default function Home() {
    const auth = getAuth()

    const [showModal, setShowModal] = useState(false)
    const [firstTime, setFirstTime] = useState(true);
    const [markerList, setMarkerList] = useState([{
      lat: 13.5269,
      lng: 79.9802
    }])
    const [plantDetails, setPlantDetails] = useState({})

    const addMarker = (ev) => {
        var newMarker = {
          lat: ev.latLng.lat(),
          lng: ev.latLng.lng(),
          ownerId: auth.currentUser.uid
        }
        if(!markerList.includes(newMarker)){
          if(firstTime){
            // firstTime = false;
            setFirstTime(false);
          }else{
            markerList.pop()
            setMarkerList(markerList)
          }
          setMarkerList(markerList => [...markerList, newMarker]);
          setPlantDetails(null);
          setShowModal(true);
        }
        // console.log(markerList);
      
    }

    const onClickMarker = (index, e) => {
        setPlantDetails(markerList[index]);
        const d = new Date();
        // console.log(d.valueOf())
        setShowModal(true)
        
        if(!firstTime){
          markerList.pop()
          setMarkerList(markerList)
          setFirstTime(true);
        }
      }

    let navigate = useNavigate();


    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        console.log(authToken)
        if (authToken) {
            navigate('/')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [navigate])
    return (
        <div>
            <Modal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                markerList={markerList} 
                setFirstTime={setFirstTime}
                plantDetails={plantDetails}
                setMarkerList={setMarkerList}/>

            <Map 
                setShowModal={setShowModal} 
                addMarker={addMarker} 
                onClickMarker={onClickMarker} 
                markerList={markerList}
                setMarkerList={setMarkerList}/>
        </div>
    )
}
