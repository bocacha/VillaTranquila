
import Navbar from '../../Navbar/Navbar';
import styles from './Caja.module.css';


export default function Caja(){
    
    return(
        
        <>
               
        <div className={styles.general}>  
            <Navbar />  
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