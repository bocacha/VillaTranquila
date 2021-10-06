import React, { useState, useEffect } from "react";
import styles from "./LinkReserva.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createReservation,
  readReservation,
  Logeduser,
  readServices,
  readFechas,
} from "../../../actions";
// import ReservacionesDetail from "./ReservacionesDetail";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";
import DatePicker,{registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';
import axios from "axios"
registerLocale('es', es)

export default function Reservaciones() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  useEffect(() => {
    dispatch(readServices());
  }, [dispatch]);
  const servicios = useSelector((state) => state.servicios);
  let lala = [];
  let id1 = 0;
  let suma = []
  let costoadicional = 0
  const ocupadas = useSelector((state) => state.fechasnodisponibles)
  const [selectDateCI, setSelectDateCI] = useState(null);
  const [selectDateCO, setSelectDateCO] = useState(null);

  const costo = localStorage.getItem("costo");
  const cabinId = localStorage.getItem("id_cabaña");
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;

  const [input, setInput] = useState({
    Checkin: "",
    Checkout: "",
    UserId: logeduser.userid,
    CostoFinal: JSON.parse(costo),
    Cabinid: JSON.parse(cabinId),
    ExtraServices: "",
  });
  const consultarprecio=(e)=>{
    suma = []
    costoadicional = 0
    // parseFloat(input.CostoFinal)
    const checkbox = Array.from(document.getElementsByClassName("Servicios"));
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        suma.push(parseFloat(checkbox[i].name))
      }
    }
    for(let j=0; j < suma.length; j++){
     costoadicional = costoadicional + parseFloat(suma[j])
      
    }
    costoadicional = costoadicional+ parseFloat(JSON.parse(costo))
  console.log(costoadicional)
    setInput({...input,CostoFinal:costoadicional})
  }
  const checkboxselected = (e) => {
    e.preventDefault()
      setInput({
      ...input, CostoFinal:JSON.parse(costo),
      Checkin:selectDateCI,Checkout:selectDateCO,
    })
    lala = [];
    const checkbox = Array.from(document.getElementsByClassName("Servicios"));
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        lala.push(checkbox[i].value);
        setInput({...input, ExtraServices: [...lala]});
        console.log(checkbox[i].value);
      }
    }
  };

  useEffect(() => {
    dispatch(readReservation({ token }));
  }, [dispatch, token]);
  useEffect(() => {
    dispatch(readFechas());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      UserId: logeduser.userid,
      [e.target.name]: e.target.value,
    });
  }
const mostrarFecha =async selectDateCI =>{
    const options = {year:'numeric', month:'numeric', day:'numeric'}
    setInput({...input,  Checkin: selectDateCI.toLocaleDateString('es-ES', options)})
}
const mostrarFecha2 = selectDateCI =>{
  const options = {year:'numeric', month:'numeric', day:'numeric'}
  setInput({...input,  Checkout: selectDateCI.toLocaleDateString('es-ES', options)})
}
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(input)
    // alert("Reserva creada con éxito");
    // window.location.reload();
  }
  return (
    <div className={styles.container}>
      <div className={styles.formsCont}>
        {/* CREAR */}
        <div className={styles.crearCont}>
          <div className={styles.btnVolver}>
            <Link to="/reserva">
              <button className={styles.btn}>Volver</button>
            </Link>
          </div>
          <div className={styles.title}>Crear una nueva reservación</div>
          <div>
            Fechas disponibles no de la cabaña
            <div>{ocupadas.map((e)=>(
              <div>  Del   {e.Checkin} Al {e.Checkout}</div>
            ))}</div>
            <div>fin</div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}className={styles.form}>
          <input
              type="number"
              value={input.CostoFinal}
              name="Checkin"
              placeholder={input.CostoFinal}
              className={styles.formInputs}
              required
            />
            <input
              type="text"
              value={input.Checkin}
              name="Checkin"
              onChange={(e) => handleChange(e)}
              placeholder="Check in"
              className={styles.formInputs}
              required
            />
          <DatePicker
            selected={selectDateCI}
            onChange={date=> setSelectDateCI(date)}
            className={styles.formInputs}
            //onChange = {onChange}
            dateFormat="dd 'de' MMMM 'de' yyyy"
            minDate={new Date()}
            locale='es'
            //isClearable
            />
            <input type='button' onClick={()=> mostrarFecha(selectDateCI)} value="comprobar fecha"/>
            <input
              type="text"
              value={input.Checkout}
              name="Checkout"
              onChange={(e) => handleChange(e)}
              placeholder="Check out"
              className={styles.formInputs}
              required
            />
        <DatePicker
            selected={selectDateCO}
            onChange={date=> setSelectDateCO(date)}
            className={styles.formInputs}
            //onChange = {onChange}
            dateFormat="dd 'de' MMMM 'de' yyyy"
            minDate={new Date()}
            locale='es'
            //isClearable
            />
            <input type='button' onClick={()=> mostrarFecha2(selectDateCO)} value="comprobar fecha"/>
            {/* <input
              type="text"
              value={input.UserId}
              name="UserId"
              onChange={(e) => handleChange(e)}
              placeholder="Usuario Id"
              className={styles.formInputs} 
              pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'
              required
            /> */}
            {/* <input
              type="text"
              value={input.Paymentsid}
              name="Paymentsid"
              onChange={(e) => handleChange(e)}
              placeholder="Pagos id"
              className={styles.formInputs} 
              // pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$' 
              required
            /> */}
            {/* <input
              type="text"
              value={input.Cabinid}
              name="Cabinid"
              onChange={(e) => handleChange(e)}
              placeholder="Cabaña id"
              className={styles.formInputs} 
              pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'
              required
            /> */}
            {/* <input
              type="text"
              value={input.ExtraServices}
              name="ExtraServices"
              onChange={(e) => handleChange(e)}
              placeholder="Servicios extra"
              className={styles.formInputs}
            /> */}
            <div>
              <div className={styles.p}>Servicios Adicionales:</div>
              <button onClick={checkboxselected}>Seleccionar Servicios</button>
              <div>
                {servicios.map((el) => (
                  <div className={styles.servicios}>
                    {el.Name + " $" + el.Price}
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      name={el.Price}
                      value={el.Name}
                      id={id1++}
                      onChange={consultarprecio}
                    />
                    <label htmlFor="temperament">{el.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.btns}>
              <button onClick={createReservation(input)} className={styles.btnRes}>
                Reservar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.imagenFondo}></div>
    </div>
  );
}
            // <input type='button' onClick={()=> mostrarFecha(selectDateCI)}/>
            // <input type='button' onClick={()=> console}/>


