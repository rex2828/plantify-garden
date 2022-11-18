import React from 'react'
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
                lat: markerList[markerList.length - 1]['lat']
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
                            <input placeholder="Your Plant's name" type="text" className={styles.inputF}/> 
                            <input placeholder="Your Plant's type" type="text" className={styles.inputF}/> 
                            <input placeholder="Your Email Address" type="text" className={styles.inputF}/> 
                            <textarea placeholder="Type your message here...." className={styles.inputF + ' ' + styles.inputA}></textarea>
                            <button name="submit" onClick={addPlant} className={styles.contactSubmit}>Submit</button>
                        </form>
                </motion.div>
            )
        }
    </AnimatePresence>
  )
}

export default Modal