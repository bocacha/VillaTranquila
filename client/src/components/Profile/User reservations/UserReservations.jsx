import React, { useState, useEffect } from "react";
import styles from "./Reservaciones.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editReservation,
  readReservation,
  Logeduser,
  readReservationocultados,getUserData
} from "../../../actions";
import ReservacionesDetail from "./ReservacionesDetail";
import DatePicker,{registerLocale} from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import Navbar from "../../Navbar/Navbar";
registerLocale('es', es)

export default function Reservaciones() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Logeduser());
      }, [dispatch]);
  const [selectDateCI, setSelectDateCI] = useState(null);
  const [selectDateCO, setSelectDateCO] = useState(null);
  const [mostrar, setMostrar] = useState(false);
  const [habilitar, setHabilitar]= useState(false)
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;
  const [edit, setEdit] = useState({
    id: "",
    Checkin: "",
    Checkout: "",
    UserId: "",
    Paymentsid: "",
    Cabinid: "",
    ExtraServices: "",
    CostoFinal: "",
  });
  
  const dataUser = useSelector((state) => state.userData);
  const user = useSelector((state) => state.user);
  const userid = user.userid;
  useEffect(() => {
      dispatch(getUserData(userid));
  }, [dispatch, userid]);

  function handleChangeEdit(e) {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmitEdit(e,ID,
    Checkin,
    Checkout,
    UserId,
    Paymentsid,
    Cabinid,
    ExtraServices,
    CostoFinal) {
    e.preventDefault();
    console.log(edit);
    setMostrar(true);
    setEdit({...edit,
      id:ID,
      Checkin:Checkin,
      Checkout:Checkout,
      UserId: UserId,
      Paymentsid: Paymentsid,
      Cabinid: Cabinid,
      ExtraServices: ExtraServices,
      CostoFinal:CostoFinal
    })
    //dispatch(editReservation(edit, { token }));
   
  }
  const changeFechas=(e)=>{
    if(e === null){
      return
    }
    setSelectDateCI(e)
    mostrarFecha(e);
  }
  const changeFechas2=async(e)=>{
    if(e === null){
      return
    }
    setSelectDateCO(e)
    mostrarFecha2(e);
  }

  const mostrarFecha = selectDateCI =>{
    const options = {year:'numeric', month:'numeric', day:'2-digit'}
    setEdit({...edit,  Checkin: selectDateCI.toLocaleDateString('es-ES', options)})
  }
  const mostrarFecha2 = selectDateCO =>{
    const options = {year:'numeric', month:'numeric', day:'2-digit'}
    setEdit({...edit,  Checkout: selectDateCO.toLocaleDateString('es-ES', options)})
  }
  function handlePrueba(e, ID) {
    e.preventDefault();
    console.log(edit)
   //  setEdit({...edit,
   //   id:ID  
  //})
    setMostrar(true);
    dispatch(editReservation(edit, { token }));
    alert("Editado")
    //pruebadispatch()
    window.location.reload()
  }
 // const pruebadispatch=() => {
   // const { token } = logeduser;
   // console.log(edit)
   // 
   // window.location.reload()
  //}
  const reservasUsuario = dataUser.ReservationsHistory
  const ocultadas= () => {
   dispatch(readReservationocultados())
   setHabilitar(true)

  }
  const showtrue=()=>{
    dispatch(readReservation())
    setHabilitar(false)

  }
  return (
    <div className={styles.container}>
      <div className={styles.navs2}>
        <div className={styles.navs}>
          <Navbar />
        </div>
      </div>
      <div className={styles.btnsContainer}>
        {!habilitar ?(
            <button onClick={ocultadas} className={styles.btnSup}>Mostrar ocultadas</button>
          ):(
            <button onClick={showtrue} className={styles.btnSup}>Mostrar habilitadas</button>
          )
          }
      </div>
      <div className={styles.container2}>
      <div className={styles.formsCont}>
          {/* EDITAR */}
          {mostrar
         ? 
            <div className={styles.editarCont}>
            <div className={styles.title}> Editar reserva</div>
            <form >
              <DatePicker
              selected={selectDateCI}
              onChange={(e)=>changeFechas(e)}
              dateFormat='dd/MM/yyyy'
              placeholderText="Fecha de llegada"
             // minDate={new Date()}
              required
              //isClearable
              /> 
              <DatePicker
              selected={selectDateCO}
              onChange={(e)=>changeFechas2(e)}
              dateFormat='dd/MM/yyyy'
              placeholderText="Fecha de salida"
             // minDate={new Date()}
              required
              //isClearable
              />
            </form>
          </div>
          :
          null
      }
        
      </div>
        {/* VER */}
        <div>
          {reservasUsuario?.map((el) => {
            return (
              <div className={styles.detalles} key={el.ID}>
                <ReservacionesDetail
                  ID={el.ID}
                  Checkin={el.Checkin}
                  Checkout={el.Checkout}
                  UserId={el.UserId}
                  CostoFinal={el.CostoFinal}
                  Cabinid={el.Cabinid}
                  ExtraServices={el.ExtraServices}
                  handlePrueba={handlePrueba}
                  handleSubmitEdit={handleSubmitEdit}
                  restaurar={habilitar}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// const {Checkin, Checkout, UserId, Paymentsid, Cabinid, ExtraServices} = req.body;
