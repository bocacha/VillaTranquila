import React, { useState, useEffect } from "react";
import { useDispatch} from 'react-redux';
import { Loguser } from "../../actions";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "../Admin/Cabañas/Cabañas.module.css";


export default function Login(){
    const dispatch = useDispatch();
    const [user, setuser]= useState({UserName:"",UserPassword:""});
    useEffect(() => {
        dispatch(Loguser())
    }, [dispatch]);
    const Handlechange = (e)=>{
        e.preventDefault();
        setuser({
            ...user,
            [e.target.name]: e.target.value
        })
    };
    const handleLogin = (e)=>{
        e.preventDefault();
        dispatch(Loguser(user));
        alert("Bienvenido/a     " + user.UserName);
    }
return (
    <div>
        <form>
            <input type="text" placeholder="username" name="UserName" value={user.UserName} onChange={Handlechange}/>
            <input type="password" placeholder="password" name="UserPassword" value={user.UserPassword} onChange={Handlechange}/>
            <div>
            <button onClick={handleLogin}>Login</button>
            </div>
            <div className={styles.btnVolver}>
        <Link to="/"><button>Volver</button></Link>
      </div>
        </form>
        <Navbar/>
    </div>
)
}