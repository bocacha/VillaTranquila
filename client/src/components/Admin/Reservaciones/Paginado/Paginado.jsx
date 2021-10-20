import React from 'react';
import styles from './Paginado.module.css';

export default function Paginado({reservationsPerPage, allReservations, paginado}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allReservations / reservationsPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <div className={styles.paginado}>
            <ul className={styles.numeros}>
                {pageNumbers.length > 1 && 
                pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => {
                            paginado(number);
                            window.scrollTo({
                                top: window.top,
                                left: 0,
                                behavior: 'smooth',
                              });
                            }}
                        ><strong>{number}</strong>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}