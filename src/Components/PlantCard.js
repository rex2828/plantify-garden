import React from 'react'
import styles from './PlantCard.module.css'



const PlantCard = ({plant, showCalenderHandler, showInformationHandler}) => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardContent}>
                <img src = {`${plant.imageUrl}`} alt='rest1' className={styles.restImage}/>
                <div className={styles.rName}>{plant.plantName.toUpperCase()}</div>
                <div className={styles.detailsDiv}>
                    <div className={styles.latlng}>
                        <span className={styles.lat}>Lat: {plant.lat.toFixed(2)}</span>
                        <span className={styles.lng}>Lng: {plant.lng.toFixed(2)}</span>
                    </div>
                    <div className={styles.ptype}>Plant type: {plant.type}</div>
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.waterBtn} onClick={() => showCalenderHandler(plant)}>
                        Watering History
                    </button>
                    <button className={styles.waterBtn} onClick={() => showInformationHandler(plant)}>
                        Show Information
                    </button>
                </div>
            </div>
        </div>
  )
}

export default PlantCard