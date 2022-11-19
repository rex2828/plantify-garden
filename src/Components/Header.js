import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

const Header = ({handleLogout}) => {

    const navigate = useNavigate()
  return (
    <nav className={styles.navContainer}>
        <div className={styles.navItemsDiv}>
            <ul className={styles.navItems}>
                <li className={styles.navItem} onClick={() => navigate('/')}>Home</li>
                <li className={styles.navItem} onClick={() => navigate('/dashboard')}>Dashboard</li>
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
            <img src='/images/dashboard.png' alt='dashboard' className={styles.navIcon} onClick={() => navigate('/dashboard')}/>
            <img src='/images/logout.png' alt='logout' className={styles.navIcon} onClick={handleLogout}/>
        </div>
    </nav>
  )
}

export default Header