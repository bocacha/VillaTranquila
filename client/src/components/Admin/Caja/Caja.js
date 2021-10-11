
import Navbar from '../../Navbar/Navbar';
import styles from './Caja.module.css';
import { readPayment,readUsers,Logeduser} from '../../../actions/index'
import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect} from 'react';


export default function Caja(){
    
    
    const dispatch=useDispatch();

    useEffect(() => {
        dispatch(Logeduser());
      }, [dispatch]);
    
    const logeduser = useSelector((state) => state.user);
    const { token } = logeduser

    useEffect (() =>{        
        dispatch(readPayment({token}));
        dispatch(readUsers({token}));
    },[dispatch,token]);

    const pagos= useSelector((state) => state.pagos);
    const datosUsuarios = useSelector((state)=> state.usuarios);

    var total=0;

    return(
        
        <>
               
        <div className={styles.general}>             
                {/* <Navbar />                                  */}
             <div className={styles.container}>
                <label>Comprobante</label>
                <label>Nombre</label>
                <label>Fecha</label>
                <label>Monto</label>                                
            </div>
            <div >
                {pagos?.map((el,index)=>{
                    const indiceCliente=el.idClient;
                    total=total + parseInt(el.PaydAmount);
                    return (
                        <div className={styles.detalle}>
                        <div  key={index}>{index}</div>
                       {datosUsuarios?.map((e)=>{                           
                            if(e.ID===indiceCliente){
                                return(
                                    <>
                                    <div className={styles.nombre}>
                                        <p >{e.FirstName}</p>                                
                                        <p >{e.LastName}</p>
                                    </div> 
                                    <p>10/10/2021</p> 
                                    
                                    </>                              
                                )                              
                            }else{
                                return null;
                            }
                            
                        })}
                        <p>${el.PaydAmount}.00</p>
                        
                        </div>
                    )
                })}
                <hr/>
            </div>
            
            <div className={styles.total}>
                <h4>TOTAL : </h4>
                <h4>${total}.00</h4>

            </div> 
        </div>
        
        </>
    )





}