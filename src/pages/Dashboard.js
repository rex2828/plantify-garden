import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import PlantCard from '../Components/PlantCard';
import styles from './Dashboard.module.css';
import Calender from '../Components/Calender';
import Information from '../Components/Information';
const Dashboard = () => {
  const auth = getAuth()
  const db = getFirestore()
  const [myPlants, setMyPlants] = useState([])
  const [plantList, setPlantList] = useState([])
  const [renderedPlants, setRenderedPlants] = useState([])
  const [showCalender, setShowCalender] = useState(false)
  const [showInformation, setShowInformation] = useState(false)
  const [clickedPlant, setClickedPlant] = useState()
  const loadPlants = async () => {
      const querySnapshot = await getDocs(collection(db, "plants"));
      const dummy = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().ownerId === auth.currentUser?.uid) {
          dummy.push(doc.data())
        }
      });
      setMyPlants([...dummy])
  }


  const loadPlantDetails = async () => {
    const res = await fetch('https://plants-json-server.herokuapp.com/plants')
    const plants = await res.json()
    setPlantList(plants)
  }

  useEffect(() => {
    loadPlantDetails()
    loadPlants()
  }, [])

  useEffect(() => {
    const dummy = []
    myPlants?.map((myplant) => {
      plantList?.map((p) => {
        if (p.type.toLowerCase() === myplant.type.toLowerCase()) {
          dummy.push({
            "id": p.id,
            "height": myplant.height,
            "lat": myplant.lat,
            "lng": myplant.lng,
            "reason": myplant.reason,
            "plantName": myplant.username,
            "imageUrl": p.imageUrl,
            "biologicalName": p.genus,
            "type": p.type,
            "information": p.information,
            "manureFreq": p.manureFreq,
            "waterFreq": p.waterFreq,
          })
        }
      })
    })
    setRenderedPlants([...dummy])
  }, [plantList,myPlants])

  const showCalenderHandler = (clickedPlant) => {
    setShowInformation(false)
    setShowCalender(true)
    setClickedPlant(clickedPlant)
  }

  const showInformationHandler = (clickedPlant) => {
    setShowCalender(false)
    setShowInformation(true)
    setClickedPlant(clickedPlant)
  }


  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.left}>
        <div className={styles.cardsContainer}>{
            renderedPlants?.map((plant) => {
              return <PlantCard key={plant.id} plant={plant} showCalenderHandler={showCalenderHandler} showInformationHandler={showInformationHandler} />
            })
          }</div>
      </div>
      <div className={styles.right}>
          {showCalender && <Calender badge={'💦'} headingText={'Watering history'} highlightedDaysList={[2, 15, 27]} />}
          {showCalender && <Calender badge={'🚜'} headingText={'Manuring history'} highlightedDaysList={[2, 15, 27]} />}
          {showInformation && <Information plant={clickedPlant}/>}
      </div>
    </div>
  )
}

export default Dashboard