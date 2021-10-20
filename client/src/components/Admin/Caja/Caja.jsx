import Navbar from '../../Navbar/Navbar';
import styles from './Caja.module.css';
import { readPayment,readUsers,Logeduser,filterPayment} from '../../../actions/index'
import { useDispatch,useSelector } from "react-redux";
import { useEffect} from 'react';

export default function Caja(){   
    
    const dispatch=useDispatch();

    useEffect(() => {
        dispatch(Logeduser());
      }, [dispatch]);
    
    const logeduser = useSelector((state) => state.user);
    const { token } = logeduser

    useEffect (() =>{        
        dispatch(readPayment({token}));
    },[dispatch,token]);

    useEffect (() =>{        
        dispatch(readUsers({token}));
    },[dispatch,token]);

    const pagos= useSelector((state) => state.pagos);
    const datosUsuarios = useSelector((state)=> state.usuarios);
   
    var total=0;
   
    function formato(texto){
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }

    var miMes="";
    var mes="";
    // const miDato=pagos[0].fecha;
    // miMes=miDato.substr(5,2);

    function handleMes(e){    
        mes=e.target.value;
        dispatch(filterPayment({token},mes))
    }

    return(               
        <div className={styles.general}>             
                <Navbar /> 
                <div className={styles.moveme}></div>  
                    <div className={styles.filtro}>
                        <div className={styles.titulo}>
                            <h4>Pagos del mes:</h4> 
                        </div>
                        <select className={styles.formInput} id="mes" name="mes" onClick={handleMes}>
                            <option value="01">Enero</option>
                            <option value="02">Febrero</option>
                            <option value="03">Marzo</option>
                            <option value="04">Abril</option>
                            <option value="05">Mayo</option>
                            <option value="06">Junio</option>
                            <option value="07">Julio</option>
                            <option value="08">Agosto</option>
                            <option value="09">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                        </select>                          
                    </div>                           
             <div className={styles.container}>             
                <label className={styles.comprobante}>Comprobante</label>
                <label>Nombre</label>
                <label className={styles.fecha}>Fecha</label>
                <label className={styles.neto}>Monto</label> 
                <label>NETO</label>
            </div>
            <div className={styles.sub}>
                {pagos?.map((el,index)=>{
    
                    
                    const indiceCliente=el.user;
                    const idPago=el.ID;
                    const comprobante=idPago.substr(14,3);
                    const fechaCompleta=el.fecha;
                    const fechaPago=fechaCompleta.substr(0,10);
                    const miFecha=formato(fechaPago);
                    total=total + el.transaction_detail.pagoNeto;
                    //total+=(el.transaction_detail.pagoNeto);
                    return (
                        <div key={index} className={styles.detalle}>
                        <div className={styles.comprobante}>A00-0{comprobante}0</div>
                            {datosUsuarios?.map((e)=>{                          
                                  
                                    return(
                                    <>
                                        <div className={styles.nombre}>
                                            <p >{e.FirstName}</p>                                
                                            <p >{e.LastName}</p>
                                        </div>                                  
                                        <p className={styles.fecha}>{miFecha}</p> 
                                        <p className={styles.neto}>${el.transaction_detail.pagoTotal}</p>
                                        <p>${el.transaction_detail.pagoNeto}</p>                                        
                                    </>                              
                                )                              
                                                 
                            })}                                                 
                        </div>
                    )
                                  
                })}
                <hr/>
            </div>
            <div className={styles.total}>
                <h4>TOTAL : ${total}</h4>
            </div>
        </div>
    )
}