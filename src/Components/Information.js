import React from 'react'
import styles from './Information.module.css'

const Information = ({plant}) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoHead}>Some info about "{plant.plantName.toUpperCase()}"</div>
      <div className={styles.infoList}>
        <div className={styles.infoListItem}>
          <img src='/images/scale.png' alt='scale' className={styles.liImage}/>
          <span className={styles.listItemText}>{plant.height} inch</span>
        </div>
        <div className={styles.infoListItem}>
          <img src='/images/biology.png' alt='bio' className={styles.liImage}/>
          <span className={styles.listItemText}>{plant.biologicalName}</span>
        </div>
      </div>
      <div className={styles.subText}>
        <div className={styles.subHead}>Why I planted?</div>
        <div className={styles.subAns}>{plant.reason}</div>
      </div>
      <div className={styles.subText}>
        <div className={styles.subHead}>How much water is required?</div>
        <div className={styles.subAns}>{plant.waterFreq}</div>
      </div>
      <div className={styles.subText}>
        <div className={styles.subHead}>Facts about you plant</div>
        <div className={styles.subAns}>{plant.information}</div>
      </div>
    </div>
  )
}

export default Information