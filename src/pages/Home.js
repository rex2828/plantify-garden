import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Map from "../Components/Map"
import Modal from "../Components/Modal"
export default function Home() {

    const [showModal, setShowModal] = useState(false)

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
        </div>
    )
}
