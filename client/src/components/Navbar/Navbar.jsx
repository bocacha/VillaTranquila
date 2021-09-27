import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import { RiTeamLine, RiMailLine, RiLoginBoxLine } from 'react-icons/ri';
import { GoSignIn } from 'react-icons/go';

export default function Navbar(){
    
    return (
        <div>
            <ul className='navbar' >
                <li>
                    <Link to='/nosotros' ><button><strong>Nosotros <RiTeamLine/></strong></button></Link>
                </li>
                <li>
                    <Link to='/contacto' ><button><strong>Contacto <RiMailLine/></strong></button></Link>
                </li>
                <li>
                    <button><strong>Sign in <GoSignIn/></strong></button>
                </li>
                <li>
                    <button><strong>Log in <RiLoginBoxLine/></strong></button>
                </li>
            </ul>
        </div>
    )
}