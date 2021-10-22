import React, { useState, useEffect } from "react";
import styles from "./Reservaciones.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editReservation,
  readReservation,
  Logeduser,
  readReservationocultados,getUserData,readServices, selectcabin,cambiarReserva, cancelarReserva, readCabains
} from "../../../actions";
import ReservacionesDetail from "./ReservacionesDetail";
import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import Navbar from "../../Navbar/Navbar";
import { useHistory } from "react-router";
registerLocale('es', es)

export default function Reservaciones() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Logeduser());
      }, [dispatch]);
      useEffect(() => {
        dispatch(readServices());
      }, [dispatch]);
      useEffect(() => {
        dispatch(readReservation());
      }, [dispatch]);
      useEffect(() => {
        dispatch(readCabains());
      }, [dispatch]);
  const [selectDateCI, setSelectDateCI] = useState(null);
  const [selectDateCO, setSelectDateCO] = useState(null);
  const [mostrar, setMostrar] = useState(false);
  const [costo, setCosto] = useState(0);
  const [habilitar, setHabilitar]= useState(false)
  const logeduser = useSelector((state) => state.user);
  const allreservations = useSelector((state) => state.allReservations);
  const allCabins= useSelector((state) => state.cabañas)
  const { token } = logeduser;
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState({
    id: "",
    Checkin: "",
    Checkout: "",
    UserId: user.userid,
    Cabinid: "",
    ExtraServices: "",
    CostoFinal: costo,
  });
  const [original, setOriginal] = useState({
    id: "",
    Checkin: "",
    Checkout: "",
    UserId: user.userid,
    Cabinid: "",
    ExtraServices: "",
    CostoFinal: "",
  })
  const dataUser = useSelector((state) => state.userData)
  // const costo = useSelector((state) => state.selectedcabin);
  const userid = user.userid;
  const servicios = useSelector((state) => state.servicios);
  let lala = [];
  let id1 = 0;
  let suma = []
  let costoadicional = 0
  useEffect(() => {
    dispatch(getUserData(userid));
  }, [dispatch, userid]);
  function handleSubmitEdit(e, ID,
    Checkin,
    Checkout,
    CabinNumber,
    UserName,
    Anombrede,
    ExtraServices,
    CostoFinal,
    Cabinid,) {
    e.preventDefault();
let seleccionada = allCabins.filter(e=> e.Number === CabinNumber)
setCosto(seleccionada[0].Price)
    setMostrar(true);
    setOriginal({
      ...original,
      id: ID,
      Checkin: Checkin,
      Checkout: Checkout,
      UserName: UserName,
      Anombrede: Anombrede,
      CabinNumber: CabinNumber,
      ExtraServices: ExtraServices,
      CostoFinal: CostoFinal,
      Cabinid: Cabinid,
      UserId: user.userid,
    })
    setEdit({
      ...edit,
      id: ID,
      Checkin: Checkin,
      Checkout: Checkout,
      UserName: UserName,
      Anombrede: Anombrede,
      CabinNumber: CabinNumber,
      ExtraServices: ExtraServices,
      Cabinid: Cabinid,
      CostoFinal: seleccionada[0].Price,
      UserId: user.userid,
    })
  }
  function handleChangeEdit(e) {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
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
  const consultarprecio=()=>{
    let contador = 0
    suma = []
    costoadicional = 0
    const checkbox = Array.from(document.getElementsByClassName("Servicios"));
    for (let i = 0; i < checkbox.length; i++) {

      if (checkbox[i].checked) {
        suma.push(parseFloat(checkbox[i].name))
      }
    }
    for (let j = 0; j < suma.length; j++) {
      costoadicional = costoadicional + parseFloat(suma[j])
      contador++
    }
    costoadicional = parseFloat(costoadicional) + parseFloat(costo)
    setEdit({...edit,CostoFinal:costoadicional})
    if(contador === 0){
      setEdit({...edit , CostoFinal:costo})
    }
  }

  const checkboxselected = (e) => {
    e.preventDefault()
    setEdit({
      ...edit, CostoFinal: original.CostoFinal,
      Checkin: selectDateCI, Checkout: selectDateCO,
    })
    lala = [];
    const checkbox = Array.from(document.getElementsByClassName("Servicios"));
    let contador = 0
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        lala.push(checkbox[i].value);
        setEdit({ ...edit, ExtraServices: [...lala] });
        contador++
      }
    }
    if (contador === 0) {
      setEdit({ ...edit, ExtraServices: null })
    }
  };
  const history = useHistory();
  function handlePrueba(e, ID) {
    e.preventDefault();
    const obj = {
      Original: original,
      Nuevo: edit,
    }
    dispatch(cambiarReserva(obj))
    alert("Solicitud Enviada")
    setTimeout(function () {
      history.go(0);
  }, 2000)
  }
  const cancelar=()=>{
    const obj ={
      Original: original,
      Nuevo: {
        Cancelar:true
      },
    }
    dispatch(cancelarReserva(obj))
    alert("Solicitud Enviada")
    setTimeout(function () {
      history.go(0);
  }, 2000)
  }
 // const pruebadispatch=() => {
   // const { token } = logeduser;
   // console.log(edit)
   // 
   // window.location.reload()
  //}
  const reservasUsuario = allreservations.filter(e => e.UserName === logeduser.user)
  return (
    <div className={styles.container}>
      <div className={styles.navs2}>
        <div className={styles.navs}>
          <Navbar />
        </div>
      </div>
      <div className={styles.container2}>
        {/* <div className={styles.formsCont}> */}

        {/* EDITAR */}
        {!mostrar
          ?
          null :
          <div className={styles.fondo}>
          <div className={styles.edtarCont}>
            <div className={styles.title}> Editar reserva</div>
            <form >
              <DatePicker
                selected={selectDateCI}
                onChange={(e) => changeFechas(e)}
                dateFormat='dd/MM/yyyy'
                placeholderText="Fecha de llegada"
                // minDate={new Date()}
                required
                className={styles.formInputs}
              //isClearable
              />
              <DatePicker
                selected={selectDateCO}
                onChange={(e) => changeFechas2(e)}
                dateFormat='dd/MM/yyyy'
                placeholderText="Fecha de salida"
                // minDate={new Date()}
                required
                //isClearable
                filterDate={d => {
                  return selectDateCI < d;
                }}
                className={styles.formInputs}
              />
              <input
                type="text"
                value={edit.Anombrede}
                name="Anombrede"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="A nombre de . . ."
                className={styles.formInputs}
            
              />
              <div>Costo final por noche:   </div>
            <input
              type="text"
              value={edit.CostoFinal}
              name="CostoFinal"
              placeholder={"Por Noche:" + edit.CostoFinal}
              className={styles.formInputs}
              id={styles.precioFinal}
              required
            />
            </form>
            <div className={styles.p}>Servicios Adicionales:</div>

            <div className={styles.serviciosCont}>
              {servicios.map((el) => (
                <div className={styles.servicios} key={el.ID}>
                  {el.Name + " $" + el.Price}
                  <input
                    className="Servicios"
                    type="checkbox"
                    name={el.Price}
                    value={el.Name}
                    id={id1++}
                    onChange={consultarprecio}
                  />
                  <label >{el.name}</label>
                </div>
              ))}
            </div>
            <div className={styles.btnsContainer}>
              <button className={styles.btnPlus} onClick={checkboxselected}>Seleccionar Servicios</button>
              <button className={styles.btnPlus} onClick={handlePrueba}>Solicitar Cambios</button>
              <button className={styles.btnPlus} id={styles.cancelarCambios} onClick={() => mostrar && setMostrar(false)}>Cancelar cambios</button>
              <button className={styles.btnPlus} id={styles.cancelarReserva} onClick={cancelar}>Cancelar reserva</button>
            </div>
          </div>
          </div>
        }

        {/* </div> */}
        {/* VER */}
        <div className={styles.containerDeContainerDetalles}>
          <div id={styles.containerDetalles}>
            {reservasUsuario?.map((el) => {
              return (
                <div className={styles.detalles} key={el.ID}>
                  <ReservacionesDetail
                    ID={el.ID}
                    Checkin={el.Checkin}
                    Checkout={el.Checkout}
                    CabinNumber={el.CabinNumber}
                    UserName={el.UserName}
                    Anombrede={el.Anombrede}
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
    </div>
  );
}

// const {Checkin, Checkout, UserId, Paymentsid, Cabinid, ExtraServices} = req.body;
