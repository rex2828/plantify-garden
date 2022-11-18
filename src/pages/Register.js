import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Register.module.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleAction = (e) => {
        e.preventDefault();
        const authentication = getAuth();
        createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        })
    }

    return (
        <div>
            <div className={styles.container}>  
                <form className={styles.contact}>
                    <h3 className={styles.headText}>Register</h3>
                    <input placeholder="Your Email" type="email" className={styles.inputF} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" /> 
                    <input placeholder="Your Password" type="password" className={styles.inputF} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/> 
                    <button name="submit" className={styles.contactSubmit} onClick={handleAction}>Register</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register