import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    useEffect(() => {
      let authToken = sessionStorage.getItem('Auth Token')
      if (authToken) {
        navigate('/')
      }
    }, [navigate])

    const handleAction = (e) => {
        e.preventDefault();
        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
        })
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.imageDiv}>
                  <img src='/images/plant-in-hand.svg' alt='plant' className={styles.image} />
                </div>
                <div className={styles.formDiv}>
                  <form className={styles.contact}>
                      <h3 className={styles.headText}>Login</h3>
                      <input placeholder="Your Email" type="email" className={styles.inputF} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" /> 
                      <input placeholder="Your Password" type="password" className={styles.inputF} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/> 
                      <button name="submit" className={styles.contactSubmit} onClick={handleAction}>Login</button>
                  </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login