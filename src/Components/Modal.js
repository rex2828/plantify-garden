import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Modal.module.css"
import { doc, setDoc, getFirestore, arrayUnion, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

    
const Modal = ({ showModal, setShowModal, markerList, setFirstTime, plantDetails, setMarkerList }) => {

    const db = getFirestore();
    const auth = getAuth();

    // const [username, setUsername] = useState((plantDetails.username === null || plantDetails.username === undefined)? '' : plantDetails.username);
    const [username, setUsername] = useState();
    const [reason, setReason] = useState();
    const [type, setType] = useState();
    const [height, setHeight] = useState();
    const [watered, setWatered] = useState(false);
    const [manured, setManured] = useState(false);

    useEffect(() => {
        setUsername(plantDetails ? plantDetails.username : '');
        setReason(plantDetails ? plantDetails.reason : '');
        setType(plantDetails ? plantDetails.type : '');
        setHeight(plantDetails ? plantDetails.height : '');
        setWatered(plantDetails ? plantDetails.watered : '');
        setManured(plantDetails ? plantDetails.manured : '');
    }, [plantDetails])

    const modal = {
        hidden: {
            x: "120vw",
            opacity: 0
        },
        visible: {
            x: "70vw",
            opacity: 1,
            transition: { delay: 0.5 }
        },
        exit: { 
            x: "120vw",
            opacity: 0 
        }
    }

    const getDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        
        
        const formattedToday = dd;
        return parseInt(formattedToday)
    }

    const editPlant = async (e) => {
        e.preventDefault();
        console.log(plantDetails.myId);
        try {
            // console.log(auth)
            const d = new Date();

            const plantRef = doc(db, "plants", plantDetails.myId);

            // edit
            await updateDoc(plantRef, {
                username: username,
                type: type,
                reason: reason,
                height: parseInt(height),
                // waterDates: watered? [getDate()] : [],
                // manureDates: manured? [getDate()] : []
            })
            if(manured){
                await updateDoc(plantRef, {
                    manureDates: arrayUnion(getDate())
                });
            }

            if(watered){
                await updateDoc(plantRef, {
                    waterDates: arrayUnion(getDate()),
                });
            }

            plantDetails.username = username
            plantDetails.type = type
            plantDetails.reason = reason
            plantDetails.height = height
            if(manured){
                plantDetails.manureDates.push(getDate())
            }
            if(watered){
                plantDetails.waterDates.push(getDate())
            }
            markerList.map(el => el.myId === plantDetails.myId? plantDetails : el)
            setMarkerList([...markerList])
            setFirstTime(true);


            console.log("edited")
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

    const addPlant = async (e) => {
        e.preventDefault();
        // console.log(e.)
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
                myId: plantId,
                ownerId: auth.currentUser.uid,
                lng: markerList[markerList.length - 1]['lng'],
                lat: markerList[markerList.length - 1]['lat'],
                username: username,
                type: type,
                reason: reason,
                height: parseInt(height),
                waterDates: watered? [getDate()] : [],
                manureDates: manured? [getDate()] : []
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

    const closeHandler = () => {
        setShowModal(false)
    }

  return (
    <AnimatePresence exitBeforeEnter>
        {
            showModal && (
                    <motion.div className={styles.container} variants={modal} initial="hidden" animate="visible" >
                        <form className={styles.contact}>
                            <div className={styles.headerDiv}>
                                <h3 className={styles.headText}>{plantDetails? "Edit" : "Add"} your plant details</h3>
                                <div className={styles.closeButtonDiv}><img src='/images/close.png' alt='close' className={styles.closeButton} onClick={closeHandler}/></div>
                            </div>
                            <input 
                                placeholder="Your Plant's name" 
                                type="text" 
                                onChange={(e) => setUsername(e.target.value)} 
                                className={styles.inputF}
                                value={username}/> 
                            <select value={type} name="type" id="type" onChange={(e) => setType(e.target.value)} className={styles.plantType}>
                                <option value="alder">Alder</option>
                                <option value="Aloe vera">Aloevera</option>
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
                            <input value={height} placeholder="Plant's height" type="number" onChange={(e) => setHeight(e.target.value)} className={styles.inputF}/> 
                            <textarea value={reason} placeholder="Why are you planting?" onChange={(e) => setReason(e.target.value)} className={styles.inputF + ' ' + styles.inputA}></textarea>
                            <label className={styles.checkboxinput} for="water"><input type="checkbox" id="water" name="water" value={watered} onChange={(e) => setWatered(e.target.checked)}/>Watered today?
                            <span className={styles.checkmark}></span></label>
                            <br/>
                            
                            <label className={styles.checkboxinput} for="manure"><input type="checkbox" id="manure" name="manure" value={manured} onChange={(e) => setManured(e.target.checked)}/>Manured today?
                            <span className={styles.checkmark}></span></label>
                            {plantDetails?
                            plantDetails.ownerId === auth.currentUser.uid?
                            <button name="submit" onClick={plantDetails? editPlant : addPlant} className={styles.contactSubmit}>{plantDetails? "Save" : "Submit"}</button>:
                            <div/> :
                            <button name="submit" onClick={plantDetails? editPlant : addPlant} className={styles.contactSubmit}>{plantDetails? "Save" : "Submit"}</button>}
                        </form>
                </motion.div>
            )
        }
    </AnimatePresence>
  )
}

export default Modal