import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Modal.module.css"
import { doc, setDoc, getFirestore, arrayUnion, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

    const modal = {
        hidden: {
            x: "120vw",
            opacity: 0
        },
        visible: {
            x: "70vw",
            opacity: 1,
            transition: { delay: 0.5 }
        }
    }
const Modal = ({ showModal, setShowModal, markerList, setFirstTime }) => {

    const db = getFirestore();
    const auth = getAuth();

    const [username, setUsername] = useState('');
    const [reason, setReason] = useState('');
    const [type, setType] = useState('Alder');
    const [height, setHeight] = useState(1);

    const addPlant = async (e) => {
        e.preventDefault();

        try {
            // console.log(auth)
            console.log(markerList[markerList.length - 1]['lng'])
            const userRef = doc(db, "users", auth.currentUser.uid);
            const d = new Date();

            const plantId = d.valueOf().toString()
            const plantRef = doc(db, "plants", plantId);

            await updateDoc(userRef, {
                plants: arrayUnion(plantId)
            });

            // adding new plant 
            // other field have to add 
            await setDoc(plantRef, {
                ownerId: auth.currentUser.uid,
                lng: markerList[markerList.length - 1]['lng'],
                lat: markerList[markerList.length - 1]['lat'],
                username: username,
                type: type,
                reason: reason,
                height: parseInt(height)
            })

            setFirstTime(true);


            console.log("done")
            // const docRef = await setDoc(doc(db, "users", auth.currentUser.uid), {
            //   plants: "hello",    
            // });
            // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        
        // console.log(auth.currentUser.uid)
        // await db.collection('users').doc(auth.currentUser.uid).set({
        //     "plant": markerList
        // });
        setShowModal(false);
    }

  return (
    <AnimatePresence exitBeforeEnter>
        {
            showModal && (
                    <motion.div className={styles.container} variants={modal} initial="hidden" animate="visible">
                        <form className={styles.contact}>
                            <h3 className={styles.headText}>Add your plant details</h3>
                            <input placeholder="Your Plant's name" type="text" onChange={(e) => setUsername(e.target.value)} className={styles.inputF}/> 
                            <select name="type" id="type" onChange={(e) => setType(e.target.value)} className={styles.plantType}>
                                <option value="alder">Alder</option>
                                <option value="Aloe vera">Aloe vera</option>
                                <option value="Apple">Apple</option>
                                <option value="Bamboo">Bamboo</option>
                                <option value="Banana">Banana</option>
                                <option value="Bean">Bean</option>
                                <option value="Blueberry">Blueberry</option>
                                <option value="Cabbage">Cabbage</option>
                                <option value="Carrot">Carrot</option>
                                <option value="Cucumber">Cucumber</option>
                                <option value="Fennel">Fennel</option>
                                <option value="Grape Vine">Grape Vine</option>
                                <option value="Turmeric">Turmeric</option>
                                <option value="Lavender">Lavender</option>
                                <option value="Lemon">Lemon</option>
                            </select>
                            <input placeholder="Plant's height" type="number" onChange={(e) => setHeight(e.target.value)} className={styles.inputF}/> 
                            <textarea placeholder="Why are you planting?" onChange={(e) => setReason(e.target.value)} className={styles.inputF + ' ' + styles.inputA}></textarea>
                            <button name="submit" onClick={addPlant} className={styles.contactSubmit}>Submit</button>
                        </form>
                </motion.div>
            )
        }
    </AnimatePresence>
  )
}

export default Modal