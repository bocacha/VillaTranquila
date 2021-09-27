import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar(){
    
    return (
        <div>
            <ul className='navbar' >
                <li>
                    <Link to='/nosotros' ><button>Nosotros</button></Link>
                </li>
                <li>
                    <Link to='/contacto' ><button>Contacto</button></Link>
                </li>
                <li>
                    <button>Sign in</button>
                </li>
                <li>
                    <button>Log in</button>
                </li>
            </ul>
        </div>
    )
}