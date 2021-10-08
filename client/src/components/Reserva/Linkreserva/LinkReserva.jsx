import React, { useState, useEffect, useCallback } from "react";
import styles from "./LinkReserva.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createReservation,
  readReservation,
  Logeduser,
  readServices,
  readFechas,
  editCabains,
  editAvailible,
  sendNotification,
} from "../../../actions";
// import ReservacionesDetail from "./ReservacionesDetail";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";
import DatePicker,{registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';
import axios from "axios"
import fechas from "./algoritmofechas.js"
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
  let fechasintermedias=[]
  const ocupadas = useSelector((state) => state.fechasnodisponibles)
  const [selectDateCI, setSelectDateCI] = useState(null);
  const [selectDateCO, setSelectDateCO] = useState(null);
  const [reserva, setReserva] = useState({Checkin:"",Checkout:""});
  const costo = localStorage.getItem("costo");
  const cabinId = localStorage.getItem("id_cabaña");
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;
  const [edit,setEdit]= useState({id:JSON.parse(cabinId), Available:[]})
  const [input, setInput] = useState({
    Nombre: "",
    Checkin: "",
    Checkout: "",
    UserId: logeduser.userid,
    CostoFinal: JSON.parse(costo),
    Cabinid: JSON.parse(cabinId),
    ExtraServices: "",
    Anombrede:""
  });
  const consultarprecio=()=>{
    suma = []
    costoadicional = 0
    const checkbox = Array.from(document.getElementsByClassName("Servicios"));
    for (let i = 0; i < checkbox.length; i++) {
      
      if (checkbox[i].checked) {
        console.log(suma)
        suma.push(parseFloat(checkbox[i].name))
        console.log(checkbox[i].name)
      }
    }
    for(let j=0; j < suma.length; j++){
     costoadicional = costoadicional + parseFloat(suma[j])
      
    }
    costoadicional = costoadicional+ parseFloat(JSON.parse(costo))
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

  const changeFechas=(e)=>{
    if(e === null){
      return
    }
    setSelectDateCI(e)
    mostrarFecha(e);
  }
  useEffect(()=>{
    fechasafiltrar()
    console.log(fechasintermedias)
    },[selectDateCO]);
const changeFechas2=async(e)=>{
  if(e === null){
    return
  }
  setSelectDateCO(e)
  mostrarFecha2(e);
}
const mostrarFecha = selectDateCI =>{
    const options = {year:'numeric', month:'numeric', day:'2-digit'}
    setInput({...input,  Checkin: selectDateCI.toLocaleDateString('es-ES', options)})
    setReserva({...reserva, Checkin:selectDateCI.toLocaleDateString('es-ES', options)})
}
const mostrarFecha2 = selectDateCO =>{
  const options = {year:'numeric', month:'numeric', day:'2-digit'}
  setInput({...input,  Checkout: selectDateCO.toLocaleDateString('es-ES', options)})
  setReserva({...reserva, Checkout:selectDateCO.toLocaleDateString('es-ES', options)})
}
const calculofechas=()=> {
 let fechasintermedias=[]
  if(ocupadas.length>=1){
    fechasintermedias = [...ocupadas]
    fechasintermedias.push(fechas(reserva))
    console.log(fechasintermedias)
    setEdit({...edit,Available:fechasintermedias})
  }
}
useEffect(()=>{
  calculofechas()
  },[reserva]);

  useEffect(()=>{
    date(ocupadas)
    });
const handlePrueba=()=>{
console.log(input.Anombrede, logeduser.email, input.Checkin)
dispatch(createReservation(input))
const options = {year:'numeric', month:'numeric', day:'2-digit'}
    const data = { username:logeduser.user ,name: input.Anombrede, email: logeduser.email, date: selectDateCI.toLocaleDateString('es-ES', options)}
   dispatch(sendNotification(data))
dispatch(editAvailible(edit))
alert("Reserva creada")
}
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(input)
  //   alert("Reserva creada con éxito");
  }

  const parapiker2=[] 
  const parapiker =[]
  function date(array){
    array.map(e=>{
        e.map(i=>{
    parapiker.push(i)
        })
    })
    parapiker.map(e=>{
        let dia = e.slice(0,2)
        let mes = e.slice(3,5)
        let anio = e.slice(6)
      if(mes === '01' || mes === '02' || mes === '03' || mes === '04' || mes === '05' || mes === '06' || mes === '07' || mes === '08' || mes === '09' ){
        mes = mes - 0;
      }
      parapiker2.push(new Date(anio, mes-1, dia))
    })

    }
    const fechasafiltrar=()=>{
      console.log("entre")
     const intermedias = fechas(reserva)
     const ocup = parapiker
     for(let i= 0; i<intermedias.length; i++){
      for(let j =0;j<ocup.length; j++){
        if(intermedias[i] === ocup[j]){
          setSelectDateCO(null)
          throw alert("error no podes elegir esas fechas, porlomenos una esta reservada")
        }
      }
     }
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
          <form onSubmit={(e) => handleSubmit(e)}className={styles.form}>          
          <input
              type="text"
              name="Anombrede"
              onChange={(e) => handleChange(e)}
              placeholder="A nombre de:"
              className={styles.formInputs}
              required
            /> 
            <div>Costo por noche:   </div>
               <input
              type="number"
              value={input.CostoFinal}
              name="Checkin"
              placeholder={"Por Noche:" + input.CostoFinal}
              className={styles.formInputs}
              required
            />
         
{/*          
            <input
              type="text"
              value={input.Checkin}
              name="Checkin"
              onChange={(e) => handleChange(e)}
              placeholder="Check in"
              className={styles.formInputs}
              required
            /> */}
          <DatePicker
            selected={selectDateCI}
            onChange={e=>changeFechas(e)}
            placeholderText="Fecha de Check in"
            className={styles.formInputs}
            defaultDate={new Date()}
            dateFormat="dd 'de' MMMM 'de' yyyy"
            minDate={new Date()}
            locale='es'
            excludeDates={parapiker2}
            />
        <DatePicker
            selected={selectDateCO}
            onChange={e=>changeFechas2(e)}
            placeholderText="Fecha de Check out"
            onFocus={calculofechas}
            className={styles.formInputs}
            dateFormat="dd 'de' MMMM 'de' yyyy"
            minDate={new Date()}
            locale='es'
            excludeDates={parapiker2}
            filterDate={d => {
              return selectDateCI < d;
            }}
            />
            <div>
              <div className={styles.p}>Servicios Adicionales:</div>
              <button onClick={checkboxselected}>Seleccionar Servicios</button>
              <div>
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
            </div>
            <div className={styles.btns}>
              <Link to="/reserva/pago">
                <button onClick={handlePrueba} className={styles.btnRes}>
                  Reservar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.imagenFondo}></div>
    </div>
  );
}
