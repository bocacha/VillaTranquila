import React from "react";
import { Link } from "react-router-dom";
import { GrLinkedin } from 'react-icons/gr';
import { AiFillGithub } from 'react-icons/ai';
import './Nosotros.css';

export default function Nosotros(){
    return (
        <div className='nosotros'>
            <Link to='/' ><button className='home' ><span><strong>Home</strong></span></button></Link>
            <ul className='container'>
                <li className='card' >
                    <div>
                        <h2 className='info'>Ignacio Cañas Elies</h2>
                        <img src='https://avatars.githubusercontent.com/u/63696926?v=4' alt='Ignacio Cañas Elies' />
                        <Link to={{pathname: 'https://www.linkedin.com/in/ignacio-ca%C3%B1as-elies-dev/'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><GrLinkedin/></button></Link>
                        <Link to={{pathname: 'https://github.com/IgnaC02'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><AiFillGithub/></button></Link>
                    </div>
                </li>
                <li className='card'>
                    <div>
                        <h2 className='info'>Martin E. Gonzalez</h2>
                        <img src='https://avatars.githubusercontent.com/u/82456534?v=4' alt='Martin E. Gonzalez' />
                        <Link to={{pathname: 'https://www.linkedin.com/in/martin-e-gonzalez-90314b112/'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><GrLinkedin/></button></Link>
                        <Link to={{pathname: 'https://github.com/bocacha'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><AiFillGithub/></button></Link>
                    </div>
                </li>
                <li className='card'>
                    <div>
                        <h2 className='info'>Ignacio Giorgis</h2>
                        <img src='https://avatars.githubusercontent.com/u/82051708?v=4' alt='Ignacio Giorgis' />
                        <Link to={{pathname: 'https://www.linkedin.com/in/ignacio-giorgis/'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><GrLinkedin/></button></Link>
                        <Link to={{pathname: 'https://github.com/ignaciogiorgis'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><AiFillGithub/></button></Link>
                    </div>
                </li>
                <li className='card'>
                    <div>
                        <h2 className='info'>José Gutierrez</h2>
                        <img src='' alt='José Gutierrez' />
                        <Link to={{pathname: 'https://www.linkedin.com/in/josemagut/'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><GrLinkedin/></button></Link>
                        <Link to={{pathname: 'https://github.com/josegutib'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><AiFillGithub/></button></Link>
                    </div>
                </li>
                <li className='card'>
                    <div>
                        <h2 className='info'>Karenina Kauffmann</h2>
                        <img src='https://avatars.githubusercontent.com/u/65468357?v=4' alt='Karenina Kauffman' />
                        <Link to={{pathname: 'https://www.linkedin.com/in/karenina-kauffmann/'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><GrLinkedin/></button></Link>
                        <Link to={{pathname: 'https://github.com/KareninaK'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><AiFillGithub/></button></Link>
                    </div>
                </li>
                <li className='card'>
                    <div>
                        <h2 className='info'>Joaquín Sosa</h2>
                        <img src='' alt='Joaquín Sosa' />
                        <Link to={{pathname: ''}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><GrLinkedin/></button></Link>
                        <Link to={{pathname: 'https://github.com/SpyraL-dev'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><AiFillGithub/></button></Link>
                    </div>
                </li>
                <li className='card'>
                    <div>
                        <h2 className='info'>Javier Ardiles Reibel</h2>
                        <img src='https://avatars.githubusercontent.com/u/81182460?v=4' alt='Javier Ardiles Reibel' />
                        <Link to={{pathname: 'https://www.linkedin.com/in/javier-ardiles-reibel/'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><GrLinkedin/></button></Link>
                        <Link to={{pathname: 'https://github.com/JavierArdiles'}} target='_blank' style={{ textDecoration: 'none' }} ><button className='linkedin' ><AiFillGithub/></button></Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}