import React from 'react';
import styles from './ServiciosBanner.module.css';
import { GiBarbecue, GiBathtub, GiVacuumCleaner } from 'react-icons/gi';
import { AiOutlineWifi } from 'react-icons/ai';
import { FaParking } from 'react-icons/fa';
import { MdFreeBreakfast } from 'react-icons/md';

export default function ServiciosBanner() {
    return(
        <div className={styles.container}>
            <ul className={styles.ul}>
                <div className={styles.div1}>
                    <li className={styles.li}><AiOutlineWifi  className={styles.items} /></li>
                    <li className={styles.li}><GiBarbecue className={styles.items} /></li>
                    <li className={styles.li}><FaParking  className={styles.items}/></li>
                </div> 
                <div className={styles.div2}>
                    <li className={styles.li}><MdFreeBreakfast  className={styles.items}/></li>
                    <li className={styles.li}><GiVacuumCleaner  className={styles.items}/></li>
                    <li className={styles.li}><GiBathtub className={styles.items} /></li>
                </div>
            </ul>
        </div>
    )
}