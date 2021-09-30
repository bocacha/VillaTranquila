import React from 'react';
import styles from './Searchbar.module.css'


function handleOnClick(){

}

function handleOnChange(){

}


export default function Searchbar() {
    return (
        <div className={styles.container}>
            <input className={styles.input} onChange={(e) => handleOnChange(e)} type="text" placeholder="¿Que quieres buscar?" />
            <button className={styles.button} onClick={(e)=>handleOnClick(e)}>Buscar</button>
        </div>
    )
}