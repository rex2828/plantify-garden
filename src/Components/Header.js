import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = ({handleLogout}) => {
  return (
    <nav className={styles.navContainer}>
        <div className={styles.navItemsDiv}>
            <ul className={styles.navItems}>
                <li className={styles.navItem}>Shop</li>
                <li className={styles.navItem}>Products</li>
                <li className={styles.navItem}>Fertilizer</li>
                <li className={styles.navItem}>Guide</li>
            </ul>
        </div>
        <Link to='/'>
            <div className={styles.logoDiv}>
                <img src='/images/logo.svg' alt='logo' />
            </div>
        </Link>
        <div className={styles.navIconsDiv}>
            <img src='/images/search.svg' alt='search' className={styles.navIcon} />
            <img src='/images/user.svg' alt='user' className={styles.navIcon} />
            <img src='/images/dashboard.png' alt='dashboard' className={styles.navIcon} />
            <img src='/images/logout.png' alt='logout' className={styles.navIcon} onClick={handleLogout}/>
        </div>
    </nav>
  )
}

export default Header