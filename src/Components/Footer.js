import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.logoContainer}>
            <img src='/images/logo.svg' alt='logo' className={styles.logo}/>
        </div>
        <div className={styles.detailsContainer}>
            <div className={styles.textLine}>
                <span className={styles.text}>About us</span>
                <span className={styles.text}>Help &amp; Support</span>
                <span className={styles.text}>T&amp;C</span>
            </div>
            <div className={styles.images}>
                <img src='/images/facebook-icon.svg' alt='facebook' className={styles.logoImage}/>
                <img src='/images/insta-icon.svg' alt='insta' className={styles.logoImage}/>
                <img src='/images/twitter-icon.svg' alt='twitter' className={styles.logoImage}/>
            </div>
        </div>
        <div className={styles.contact}>
            <span>Contact: +91 1234567890</span>
        </div>
    </div>
  )
}

export default Footer