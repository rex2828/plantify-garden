import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Map from "../Components/Map"
import Modal from "../Components/Modal"
export default function Home() {
    const auth = getAuth();

    const [showModal, setShowModal] = useState(false)


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
            <Modal showModal={showModal} setShowModal={setShowModal}/>
            <Map setShowModal={setShowModal}/>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}
