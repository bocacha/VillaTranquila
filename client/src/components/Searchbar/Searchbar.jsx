import React from 'react';
import styles from './Searchbar.module.css'


function handleOnClick(){

}

function handleOnChange(){

}


export default function Searchbar() {
    return (
        <div>
            <input className={styles.input} onChange={(e) => handleOnChange(e)} type="text" placeholder="What are you looking for?" />
            <button className={styles.button} onClick={(e)=>handleOnClick(e)}>Search</button>
        </div>
    )
}