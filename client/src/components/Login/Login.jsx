import React, { useState, useEffect } from "react";
import { useDispatch} from 'react-redux';
import { Loguser } from "../../actions";
import Navbar from "../Navbar/Navbar";



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
        dispatch(Loguser(user))
    }
return (
    <div>
        <form>
            <input type="text" placeholder="username" name="UserName" value={user.UserName} onChange={Handlechange}/>
            <input type="password" placeholder="password" name="UserPassword" value={user.UserPassword} onChange={Handlechange}/>
            <button onClick={handleLogin}>Login</button>
        </form>
        <Navbar/>
    </div>
)
}