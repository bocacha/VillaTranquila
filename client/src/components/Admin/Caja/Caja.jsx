
import Navbar from '../../Navbar/Navbar';
import styles from './Caja.module.css';
import { readPayment,readUsers,Logeduser} from '../../../actions/index'
import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { TiZoomIn } from "react-icons/ti";
import CajaDetail from './CajaDetail';


export default function Caja(){
    
    
    const dispatch=useDispatch();

    useEffect(() => {
        dispatch(Logeduser());
      }, [dispatch]);
    
    const logeduser = useSelector((state) => state.user);
    const { token } = logeduser

    useEffect (() =>{        
        dispatch(readPayment({token}));
    },[dispatch]);
    useEffect (() =>{        
        dispatch(readUsers({token}));
    },[dispatch]);

    const pagos= useSelector((state) => state.pagos);
    const datosUsuarios = useSelector((state)=> state.usuarios);
    const [mostrar, setMostrar] = useState(false);

    var total=0;
    const Mostrar=()=>{
        setMostrar(true)
    }
    const NoMostrar=()=>{
        setMostrar(false)
    }
    return(
               
        <div className={styles.general}>             
                <Navbar /> 
                <div className={styles.moveme}></div>                             
             <div className={styles.container}>
             
                <label>Comprobante</label>
                <label>Nombre</label>
                <label>Fecha</label>
                <label>Monto</label> 
                <label>Detalle</label>

            </div>
            <div >
                {pagos?.map((el,index)=>{
                    const indiceCliente=el.user;
                    total=total + parseInt(el.transaction_detail.pagoTotal);
                    return (
                        <div className={styles.detalle}>
                        <div  key={index}>{el.status}{index}</div>
                            {datosUsuarios?.map((e)=>{  
                                console.log(e)                         
                                if(e.UserName === indiceCliente){
                                    return(
                                    <>
                                    <div className={styles.nombre}>
                                        <p >{e.UserName}</p>
                                        {/* <p >{e.FirstName}</p>                                
                                        <p >{e.LastName}</p> */}
                                    </div>                                  
                                    <p>{el.fecha}</p> 
                                    <p>${el.transaction_detail.pagoTotal}.00</p>
                                    <button className={styles.zoom} onClick={Mostrar}><TiZoomIn className={styles.icons} /></button>
                                    
                                    <div>
                                        {mostrar ?
                                            <div>
                                                <CajaDetail
                                                    id_reserva={el.id_reserva}
                                                    status={el.status}
                                                    status_detail={el.status_detail}
                                                    pagoNeto={el.transaction_detail.pagoNeto}
                                                    pagoTotal={el.transaction_detail.pagoTotal}
                                                    UserName={e.UserName}
                                                    FirstName={e.FirstName}
                                                    LastName={e.LastName}
                                                    Email={e.Email}
                                                    fecha={e.fecha}
                                                    reservationhistory={e.ReservationsHistory}
                                                    Address={e.Address}
                                                    NoMostrar={NoMostrar}
                                                />
                                            </div>
                                        : null}
                                    </div>                                    
                                            
                                        
                                    </>                              
                                )                              
                                }else{
                                    return null;
                                }                            
                            })}
                            {/* <p>${el.transaction_detail.pagoTotal}.00</p> */}
                            {/* <Link to="/admin/cajadetail">
                                <button>
                                    <strong className={styles.list}>
                                    <strong >
                                          <TiZoomIn className={styles.icons} />
                                    </strong>
                                </button>
                            </Link> */}
                     
                        </div>
                    )
                })}
                <hr/>
            </div>
            {/* <div className={styles.total}>
                <h4>Neto : </h4>
                <h4>${el.transaction_detail.pagoNeto}.00</h4>

            </div>  */}
            <div className={styles.total}>
                <h4>TOTAL : ${total}.00</h4>
            </div>
        </div>
    )





}