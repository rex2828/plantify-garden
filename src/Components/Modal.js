import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Modal.module.css"

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
const Modal = ({ showModal, setShowModal }) => {
  return (
    <AnimatePresence exitBeforeEnter>
        {
            showModal && (
                    <motion.div className={styles.container} variants={modal} initial="hidden" animate="visible">
                        <form className={styles.contact}>
                            <h3 className={styles.headText}>Add your plant details</h3>
                            <input placeholder="Your Plant's name" type="text" className={styles.inputF}/> 
                            <select name="type" id="type" className={styles.plantType}>
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
                            <textarea placeholder="Why are you planting?" className={styles.inputF + ' ' + styles.inputA}></textarea>
                            <button name="submit" type="submit" className={styles.contactSubmit}>Submit</button>
                        </form>
                </motion.div>
            )
        }
    </AnimatePresence>
  )
}

export default Modal