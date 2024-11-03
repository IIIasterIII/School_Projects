import React from 'react'
import styles from './styles.module.css'
import {Link} from 'react-router-dom'
import { IoDice } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { FaAppleAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footer}>
        <Link to="/fruits" className={styles.link}><FaAppleAlt className={styles.icon}/>Fruits</Link>
        <Link to="/motivations" className={styles.link}><IoDice className={styles.icon_center}/>Motivations</Link>
        <Link to="/favorites" className={styles.link}><FaHeart className={styles.icon}/>Favorites</Link>
    </div>
  )
}

export default Footer