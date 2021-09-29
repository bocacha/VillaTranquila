
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
    const [errorEmail, setErrorEmail] = useState(false);
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

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setErrorEmail(true)
            return;
        }
        
        setErrorEmail(false);

        
    }

    return (
        <div className={style.containerForm}>
           <form
                 onSubmit={submitQuery} 
                 className={style.form}
            >
                { error ? 
                    <div className={style.Error}>
                        <h4>Todos los campos son obligatorios</h4>
                    </div>  
                :  
                    null}
                <h2>Contacto</h2>
                <p type="Nombre:"><input name="name" value={name} onChange={changeControl} placeholder="Nombre"></input></p>
                <p type="Telefono:"><input name="tel"value={tel} onChange={changeControl} placeholder="Telefono"></input></p>
                {errorEmail ?
                     <div className={style.Error}>
                        <h4>correo electronico incorrecto</h4>
                    </div> :
                    null 
            
                }
                <p type="Email:"><input name="email"value={email} onChange={changeControl} placeholder="Email"></input></p>
                <p type="Consulta:"><input name="query" value={query} onChange={changeControl} placeholder="Consulta"></input></p>
                <button type="submit">Enviar</button>
                
        </form>

        </div>
        
    )
}