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
  });
  const [edit, setEdit] = useState({
    id: "",
    Checkin: "",
    Checkout: "",
    UserId: "",
    Paymentsid: "",
    Cabinid: "",
    ExtraServices: "",
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
    const options = {year:'numeric', month:'numeric', day:'numeric'}
    setInput({...input,  Checkin: selectDateCI.toLocaleDateString('es-ES', options)})
  }

  const console = ()=>{
    
    console.log(input.Checkin)
  }

  function handlePrueba(e, ID) {
    e.preventDefault();
    
    dispatch(editReservation(edit, { token }));
    setEdit({...edit,
      id:ID  
    })
    setMostrar(true);
    
    //window.location.reload();
  }
  const ocultadas= () => {
   return dispatch(readReservationocultados())
  }
  const showtrue=()=>{
    dispatch(readReservation())
  }
  return (
    <div className={styles.container}>
      <div className={styles.btnVolver}>
        <Link to="/admin">
          <button className={styles.btn}>Volver</button>
        </Link>
      </div>
      <div className={styles.container2}>
        {!habilitar ?(
            <button onClick={ocultadas}>Mostrar ocultadas</button>
          ):(
            <button onClick={showtrue}>Mostrar habilitadas</button>
          )
          }
      <div className={styles.formsCont}>
          {/* CREAR */}
          <div className={styles.crearCont}>
            <div className={styles.title}>Crear una  reservación</div>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
              <input
                type="text"
                value={input.Checkin}
                name="Checkin"
                onChange={(e) => handleChange(e)}
                placeholder="Check in"
                className={styles.formInputs}
                required
              />
              {/* <DatePicker
          selected={selectDateCI}
          onChange={date=> setSelectDateCI(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
          //isClearable
          /> */}
              <input
                type="text"
                value={input.Checkout}
                name="Checkout"
                onChange={(e) => handleChange(e)}
                placeholder="Check out"
                className={styles.formInputs}
                required
              />
              {/* 
          <DatePicker
          selected={selectDateCO}
          onChange={date=> setSelectDateCO(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
          //isClearable
          /> */}
              <input
                type="text"
                value={input.UserId}
                name="UserId"
                onChange={(e) => handleChange(e)}
                placeholder="Usuario Id"
                className={styles.formInputs}
                title='Formato: UUID4'
                pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
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
                pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
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
                pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
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
                {console.log(el.CostoFinal)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// const {Checkin, Checkout, UserId, Paymentsid, Cabinid, ExtraServices} = req.body;
