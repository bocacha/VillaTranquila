import React, { useState, useEffect } from "react";
import styles from "./Reservaciones.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createReservation,
  editReservation,
  readReservation,
  Logeduser,
  readReservationocultados
} from "../../../actions";
import ReservacionesDetail from "./ReservacionesDetail";
import DatePicker,{registerLocale} from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import {Link} from "react-router-dom";
import NavAdmin from '../NavAdmin/NavAdmin';
registerLocale('es', es)

export default function Reservaciones() {
  const [selectDateCI, setSelectDateCI] = useState(null);
  const [selectDateCO, setSelectDateCO] = useState(null);
  const [mostrar, setMostrar] = useState(false);
  const dispatch = useDispatch();
  const allReservations = useSelector((state) => state.reservaciones);
  const [habilitar, setHabilitar]= useState(false)
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;
  const [input, setInput] = useState({
    id: "",
    Checkin: "",
    Checkout: "",
    UserId: "",
    Paymentsid: "",
    Cabinid: "",
    ExtraServices: "",
    CostoFinal: "",
  });
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
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(readReservation({ token }));
  }, [dispatch, token]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeEdit(e) {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createReservation(input));
    alert("Reserva creada con éxito");
    setInput({
      id: "",
      Checkin: "",
      Checkout: "",
      UserId: "",
      Paymentsid: "",
      Cabinid: "",
      ExtraServices: "",
      CostoFinal: "",
    });
    window.location.reload();
  }
  function handleSubmitEdit(e,ID) {
    e.preventDefault();
    

    


    setMostrar(true);
    dispatch(editReservation(edit, { token }));
    setEdit({...edit,
      id:ID  
    })
   
  }

  const mostrarFecha = selectDateCI =>{
    const options = {weekday :'long', year:'yyyy', month:'MM', day:'dd'}
    setInput({...input,  Checkin: selectDateCI.toLocaleDateString('es-ES', options)})
  }
  function handlePrueba(e, ID) {
    e.preventDefault();
     setEdit({...edit,
      id:ID  
    })
    setMostrar(true);
    pruebadispatch()
  }
  const pruebadispatch=() => {
    const { token } = logeduser;
    console.log(edit)
    dispatch(editReservation(edit, { token }));
    window.location.reload()
  }
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
      <NavAdmin />
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
          {/* CREAR */}
          <div className={styles.crearCont}>
            <div className={styles.title}>Crear una  reservación</div>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
              
              <DatePicker
          selected={selectDateCI}
          onChange={date=> setSelectDateCI(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
          className={styles.formInputs}
          //isClearable
          /> 
              
          <DatePicker
          selected={selectDateCO}
          onChange={date=> setSelectDateCO(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
          className={styles.formInputs}
          //isClearable
          />
              <input
                type="text"
                value={input.UserId}
                name="UserId"
                onChange={(e) => handleChange(e)}
                placeholder="Usuario Id"
                className={styles.formInputs}
                title='Formato: UUID4'
               // pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                required
              />
              <input
                type="text"
                value={input.Paymentsid}
                name="Paymentsid"
                onChange={(e) => handleChange(e)}
                placeholder="Pagos id"
                className={styles.formInputs}
                 title='Formato: UUID4'
               // pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                required
              />
              <input
                type="text"
                value={input.Cabinid}
                name="Cabinid"
                onChange={(e) => handleChange(e)}
                placeholder="Cabaña id"
                className={styles.formInputs}
                title='Formato: UUID4'
               // pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                required
              />
              <input
                type="text"
                value={input.ExtraServices}
                name="ExtraServices"
                onChange={(e) => handleChange(e)}
                placeholder="Servicios extra"
                className={styles.formInputs}
              />
              <div className={styles.btns}>
                <button type="submit" className={styles.btn}>
                  Crear
                </button>
              </div>
            </form>
          </div>
          {/* EDITAR */}
          {mostrar
         ? 
            <div className={styles.editarCont}>
            <div className={styles.title}> Editar reserva</div>
            <form >
              <input
                type="text"
                value={edit.Checkin}
                name="Checkin"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Check in"
                className={styles.formInputs}
              />
              <input
                type="text"
                value={edit.Checkout}
                name="Checkout"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Check out"
                className={styles.formInputs}
              />
              <input
                type="text"
                value={edit.CostoFinal}
                name="CostoFinal"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Costo Final"
                className={styles.formInputs}
              />
              <input
                type="text"
                value={edit.UserId}
                name="UserId"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Usuario id"
                className={styles.formInputs}
                title='Formato: UUID4'
                pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                required
              />
              <input
                type="text"
                value={edit.Paymentsid}
                name="Paymentsid"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Pagos id"
                className={styles.formInputs}
                title='Formato: UUID4'
                pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                required
              />
              <input
                type="text"
                value={edit.Cabinid}
                name="Cabinid"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Cabaña id"
                className={styles.formInputs}
                title='Formato: UUID4'
                pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                required
              />
              <input
                type="text"
                value={edit.ExtraServices}
                name="ExtraServices"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Servicios extra"
                className={styles.formInputs}
              />
             {/*  <div className={styles.btns}>
                <button type="submit" className={styles.btn}>
                  Editar
                </button>
              </div> */}
            </form>
          </div>
          :
          null
      }
        
      </div>
        {/* VER */}
        <div>
          {allReservations?.map((el) => {
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
