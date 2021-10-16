import React, { useState, useEffect } from "react";
import styles from "./Reservaciones.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editReservation,
  readReservation,
  Logeduser,
  readReservationocultados,
  readUsers,
  getCabins
} from "../../../actions";
import ReservacionesDetail from "./ReservacionesDetail";
import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { Link } from "react-router-dom";
import NavAdmin from '../NavAdmin/NavAdmin';
import Navbar from "../../Navbar/Navbar";
registerLocale('es', es)

export default function Reservaciones() {

  const dispatch = useDispatch();

  const [selectDateCI, setSelectDateCI] = useState(null);
  const [selectDateCO, setSelectDateCO] = useState(null);

  const [mostrar, setMostrar] = useState(false);

  const allReservations = useSelector((state) => state.reservaciones);
  console.log('reservas:', allReservations)

  const [habilitar, setHabilitar] = useState(false);

  useEffect(() => {
    dispatch(getCabins())
  },[dispatch])
  const allCabins = useSelector((state) => state.cabins);
  
  const logeduser = useSelector((state) => state.user);
  
  const { token } = logeduser;
  useEffect(() => {
    dispatch(readUsers({ token }));
  }, [dispatch, token]);

  
  const allUsers = useSelector((state) => state.usuarios);
  
  const [input, setInput] = useState({
    id: "",
    UserName: "",
    Anombrede: "",
    Checkin: "",
    Checkout: "",
    CabinNumber: "",
    ExtraServices: "",
    CostoFinal: "",
    Paymentsid: "",
  });

  const [edit, setEdit] = useState({
    id: "",
    UserName: "",
    Anombrede: "",
    Checkin: "",
    Checkout: "",
    Paymentsid: "",
    CabinNumber: "",
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

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   dispatch(createReservation(input));
  //   alert("Reserva creada con éxito");
  //   ;
  //   //window.location.reload();
  // }
  function handleSubmitEdit(e, ID,
    Checkin,
    Checkout,
    UserId,
    Paymentsid,
    Cabinid,
    ExtraServices,
    CostoFinal) {
    e.preventDefault();
    console.log(edit);
    setEdit({
      ...edit,
      id: ID,
      Checkin: Checkin,
      Checkout: Checkout,
      UserId: UserId,
      Paymentsid: Paymentsid,
      Cabinid: Cabinid,
      ExtraServices: ExtraServices,
      CostoFinal: CostoFinal
    })
    setMostrar(true);
    //dispatch(editReservation(edit, { token }));

  }
  const changeFechas = (e) => {
    if (e === null) {
      return
    }
    setSelectDateCI(e)
    mostrarFecha(e);
  }
  const changeFechas2 = async (e) => {
    if (e === null) {
      return
    }
    setSelectDateCO(e)
    mostrarFecha2(e);
  }

  const mostrarFecha = selectDateCI => {
    const options = { year: 'numeric', month: 'numeric', day: '2-digit' }
    setEdit({ ...edit, Checkin: selectDateCI.toLocaleDateString('es-ES', options) })
  }
  const mostrarFecha2 = selectDateCO => {
    const options = { year: 'numeric', month: 'numeric', day: '2-digit' }
    setEdit({ ...edit, Checkout: selectDateCO.toLocaleDateString('es-ES', options) })
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
  const ocultadas = () => {
    dispatch(readReservationocultados())
    setHabilitar(true)

  }
  const showtrue = () => {
    dispatch(readReservation())
    setHabilitar(false)

  }
  return (
    <div className={styles.reservasAdmin}>
      <Navbar />
      <NavAdmin />
      <div className={styles.container1}>
        <div className={styles.btnsContainer}>
          {!habilitar ? (
            <button onClick={ocultadas} className={styles.btnSup}>Mostrar ocultadas</button>
          ) : (
            <button onClick={showtrue} className={styles.btnSup}>Mostrar habilitadas</button>
          )
          }
        </div>
        <div className={styles.container2}>
          <div className={styles.formsCont}>
            {mostrar
              ?
              <div className={styles.editarCont}>
                <div className={styles.title}> <h3>Editar reserva</h3></div>
                <form >
                  <div className={styles.datePicker}>
                    <DatePicker
                      selected={selectDateCI}
                      onChange={(e) => changeFechas(e)}
                      dateFormat='dd/MM/yyyy'
                      // minDate={new Date()}
                      required
                      placeholderText='Fecha de Check in'
                      id={styles.checkin}
                    //isClearable
                    />
                    <DatePicker
                      selected={selectDateCO}
                      onChange={(e) => changeFechas2(e)}
                      dateFormat='dd/MM/yyyy'
                      // minDate={new Date()}
                      required
                      placeholderText='Fecha de Check out'
                      id={styles.checkout}
                    //isClearable
                    />
                  </div>
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
                    type="text" //?????
                    value={edit.ExtraServices}
                    name="ExtraServices"
                    onChange={(e) => handleChangeEdit(e)}
                    placeholder="Servicios extra"
                    className={styles.formInputs}
                  />
                </form>
                <div className={styles.btns}>
                  <button type="submit" onClick={handlePrueba} id={styles.guardar}>
                    Guardar cambios
                  </button>
                  <button onClick={() => { if (mostrar) setMostrar(false) }} id={styles.cancelar}>Cancelar</button>
                </div>
              </div>
              :
              null
            }

          </div>
        </div>
        {/* VER */}
        <div className={styles.containerReservas}>
          {allReservations?.map((el) => {
            let username = allUsers.find(e => e.ID === el.UserId).UserName;
            let cabinNumber = allCabins.find(e => e.ID === el.Cabinid).Number;
            return (
              <div className={styles.detalles} key={el.ID}>
                <ReservacionesDetail
                  ID={el.ID}
                  Checkin={el.Checkin}
                  Checkout={el.Checkout}
                  CabinNumber = {cabinNumber}
                  UserName = {username}
                  Anombrede = {el.Anombrede}
                  CostoFinal={el.CostoFinal}
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
