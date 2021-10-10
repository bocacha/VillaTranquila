
import Navbar from '../../Navbar/Navbar';
import styles from './Caja.module.css';
import { useSelector } from "react-redux";


export default function Caja(){
    const pago= useSelector((state) => state.pagos);
    const datosUsuario = useSelector((state)=> state.usuarios);
    // const uno=datosUsuario[1].FirstName;
    
    // const dos=datosUsuario[1].LastName;
    // const tres= uno + " " + dos;
    // const indice=datosUsuario[1].ID;

    // for(var i=0;i< pago.length;i++){
    //     if(pago.idClient===indice){
    //         console.log("ENTREEEEEEEEEE")
    //     }

    // }

    return(
        
        <>
               
        <div className={styles.general}>  
            <div className={styles.barra}>
                <Navbar />  
            </div>
            {/* <div className={styles.detalle}>
                <p>{tres}</p>

            </div> */}
            
            <h3>Comprobantes emitidos para el día Sábado, 9 de Octubre 2021</h3>                     
            <div className={styles.container}>
                <label>Comprobante</label>
                <label>Nombre</label>
                <label>Fecha</label>
                <label>Monto</label>                                
            </div>
            <div className={styles.detalle}>
                    <label>A0024-003456</label>
                    <label>Tony Tralice</label>
                    <label>09/10/2021</label>
                    <label>$9875,20</label>                    
            </div>
            <hr/>
            <div className={styles.detalle}>
                    <label>A0024-003457</label>
                    <label>Martin Bouchard</label>
                    <label>09/10/2021</label>
                    <label>$15324,00</label>                    
            </div>
            <hr/>
            <div className={styles.detalle}>
                    <label>A0024-003458</label>
                    <label>Diego Rodriguez</label>
                    <label>09/10/2021</label>
                    <label>$2170,00</label>                    
            </div>
            <hr/>
            <div className={styles.total}>
                <h4>TOTAL : </h4>
                <h4>$27.369,20</h4>

            </div>
        </div>
        
        </>
    )





}