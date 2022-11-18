import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Map from "../Components/Map"
import Modal from "../Components/Modal"
export default function Home() {

    const [showModal, setShowModal] = useState(false)
    const [firstTime, setFirstTime] = useState(true);
    const [markerList, setMarkerList] = useState([{
      lat: 13.5269,
      lng: 79.9802
    }])
    const auth = getAuth()

    const addMarker = (ev) => {
        var newMarker = {
          lat: ev.latLng.lat(),
          lng: ev.latLng.lng()
        }
        console.log(firstTime);
        console.log(markerList[1]);
        if(!markerList.includes(newMarker)){
          if(firstTime){
            // firstTime = false;
            setFirstTime(false);
          }else{
            markerList.pop()
            setMarkerList(markerList)
          }
          setMarkerList(markerList => [...markerList, newMarker]);
          setShowModal(true);
        }
        // console.log(markerList);
      
    }

    const onClickMarker = (e) => {
        const d = new Date();
        // console.log(d.valueOf())
        setShowModal(true)
        
        if(!firstTime){
          markerList.pop()
          setMarkerList(markerList)
          setFirstTime(true);
        }
      }
    

    const handleLogout = () => {
        auth.signOut()
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
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
                setFirstTime={setFirstTime}/>

            <Map 
                setShowModal={setShowModal} 
                addMarker={addMarker} 
                onClickMarker={onClickMarker} 
                markerList={markerList}/>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}
