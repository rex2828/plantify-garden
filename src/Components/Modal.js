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
                            <input placeholder="Your Email Address" type="text" className={styles.inputF}/> 
                            <textarea placeholder="Type your message here...." className={styles.inputF + ' ' + styles.inputA}></textarea>
                            <button name="submit" type="submit" className={styles.contactSubmit}>Submit</button>
                        </form>
                </motion.div>
            )
        }
    </AnimatePresence>
  )
}

export default Modal