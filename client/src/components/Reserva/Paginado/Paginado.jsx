import React from 'react';

export default function Paginado({cabinsPerPage, allCabins, paginado}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allCabins / cabinsPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <nav>
            <ul>
                {pageNumbers.length > 1 && 
                pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => paginado(number)}><strong>{number}</strong></button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}