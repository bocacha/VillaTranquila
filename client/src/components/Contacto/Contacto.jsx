import React, { useState } from "react";
import style from '../Contacto/Contacto.module.css'


export default function Contacto(){

    const [control, setControl] = useState({
        name: '',
        tel:'',
        email:'',
        query:''
    })

    const [error, setError] = useState(false);

    const {name, tel, email, query} = control;

    const changeControl = (e) =>{
        setControl({
            ...control,
                [e.target.name]: e.target.value
        })
    }

    const submitQuery = (e)=>{  
        e.preventDefault();
        if(name ===''|| tel=== ''|| email ==='' || query === ''){
            setError(true)
            return;
        }
        setError(false);
    }

    return (
        <div >
           <form
                 onSubmit={submitQuery} 
                 className={style.form}
            >
                { error ? 
                    <div className={style.Error}>
                        <h3>Todos los campos son obligatorios</h3>
                    </div>  
                :  
                    null}
                <h2>Contacto</h2>
                <p type="Nombre:"><input name="name" value={name} onChange={changeControl} placeholder="Nombre"></input></p>
                <p type="Telefono:"><input name="tel"value={tel} onChange={changeControl} placeholder="Telefono"></input></p>
                <p type="Email:"><input name="email"value={email} onChange={changeControl} placeholder="Email"></input></p>
                <p type="Consulta:"><input name="query" value={query} onChange={changeControl} placeholder="Consulta"></input></p>
                <button type="submit">Enviar</button>
                
        </form>

        </div>
        
    )
}