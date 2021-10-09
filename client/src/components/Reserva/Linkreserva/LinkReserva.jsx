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
<<<<<<< HEAD
=======
  selectcabin,
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
} from "../../../actions";
// import ReservacionesDetail from "./ReservacionesDetail";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import axios from "axios"
import fechas from "./algoritmofechas.js"
<<<<<<< HEAD
=======
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
  const seleccionada = useSelector((state) => state.selectedcabin)
  let lala = [];
  let id1 = 0;
  let suma = []
  let costoadicional = 0
<<<<<<< HEAD
  let fechasintermedias = []
=======
  let fechasintermedias=[]
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
  const ocupadas = useSelector((state) => state.fechasnodisponibles)
  //console.log(ocupadas)
  const [selectDateCI, setSelectDateCI] = useState(null);
  const [selectDateCO, setSelectDateCO] = useState(null);
<<<<<<< HEAD
  const [reserva, setReserva] = useState({ Checkin: "", Checkout: "" });
=======
  const [reserva, setReserva] = useState({Checkin:"",Checkout:""});
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
  const costo = localStorage.getItem("costo");
  const cabinId = localStorage.getItem("id_cabaña");
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;
<<<<<<< HEAD
  const [edit, setEdit] = useState({ id: JSON.parse(cabinId), Available: [] })
=======
  const [edit,setEdit]= useState({id:JSON.parse(cabinId), Available:[]})
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
  const [input, setInput] = useState({
    Nombre: "",
    Checkin: "",
    Checkout: "",
    UserId: logeduser.userid,
    CostoFinal: JSON.parse(costo),
    Cabinid: JSON.parse(cabinId),
    ExtraServices: "",
<<<<<<< HEAD
    Anombrede: ""
  });
  const consultarprecio = () => {
=======
    Anombrede:""
  });
  const consultarprecio=()=>{
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
    suma = []
    costoadicional = 0
    const checkbox = Array.from(document.getElementsByClassName("Servicios"));
    for (let i = 0; i < checkbox.length; i++) {
<<<<<<< HEAD

=======
      
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
      if (checkbox[i].checked) {
        console.log(suma)
        suma.push(parseFloat(checkbox[i].name))
        console.log(checkbox[i].name)
      }
    }
    for (let j = 0; j < suma.length; j++) {
      costoadicional = costoadicional + parseFloat(suma[j])

    }
<<<<<<< HEAD
    costoadicional = costoadicional + parseFloat(JSON.parse(costo))
    setInput({ ...input, CostoFinal: costoadicional })
=======
    costoadicional = costoadicional+ parseFloat(JSON.parse(costo))
    setInput({...input,CostoFinal:costoadicional})
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
  }
  const checkboxselected = (e) => {
    e.preventDefault()
    setInput({
      ...input, CostoFinal: JSON.parse(costo),
      Checkin: selectDateCI, Checkout: selectDateCO,
    })
    lala = [];
    const checkbox = Array.from(document.getElementsByClassName("Servicios"));
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        lala.push(checkbox[i].value);
        setInput({ ...input, ExtraServices: [...lala] });
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
  useEffect(() => {
    dispatch(selectcabin(localStorage.getItem("id_cabaña")))
  }, [dispatch,cabinId]);
  function handleChange(e) {
    setInput({
      ...input,
      UserId: logeduser.userid,
      [e.target.name]: e.target.value,
    });
  }

<<<<<<< HEAD
  const changeFechas = (e) => {
    if (e === null) {
=======
  const changeFechas=(e)=>{
    if(e === null){
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
      return
    }
    setSelectDateCI(e)
    mostrarFecha(e);
  }
<<<<<<< HEAD
  const changeFechas2 = async (e) => {
    if (e === null) {
      return
    }
    setSelectDateCO(e)
    mostrarFecha2(e);
  }
  const mostrarFecha = selectDateCI => {
    const options = { year: 'numeric', month: 'numeric', day: '2-digit' }
    setInput({ ...input, Checkin: selectDateCI.toLocaleDateString('es-ES', options) })
    setReserva({ ...reserva, Checkin: selectDateCI.toLocaleDateString('es-ES', options) })
  }
  const mostrarFecha2 = selectDateCO => {
    const options = { year: 'numeric', month: 'numeric', day: '2-digit' }
    setInput({ ...input, Checkout: selectDateCO.toLocaleDateString('es-ES', options) })
    setReserva({ ...reserva, Checkout: selectDateCO.toLocaleDateString('es-ES', options) })
  }
  const calculofechas = () => {
    let fechasintermedias = []
    if (ocupadas.length >= 1) {
      fechasintermedias = [...ocupadas]
      fechasintermedias.push(fechas(reserva))
      console.log(fechasintermedias)
      setEdit({ ...edit, Available: fechasintermedias })
    }
  }
  useEffect(() => {
    calculofechas()
  }, [reserva]);

  useEffect(() => {
    date(ocupadas)
  });

  const handlePrueba = () => {
    console.log(edit)
    dispatch(createReservation(input))
    dispatch(editAvailible(edit))
    dispatch(sendNotification(input.Nombre, logeduser.email,input.Checkin))
    alert("Reserva creada")
  }
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(input)
    alert("Reserva creada con éxito");
  }

  const parapiker2 = []
  const parapiker = []
  function date(array) {
    array.map(e => {
      e.map(i => {
        parapiker.push(i)
      })
    })
    parapiker.map(e => {
      let dia = e.slice(0, 2)
      let mes = e.slice(3, 5)
      let anio = e.slice(6)
      if (mes === '01' || mes === '02' || mes === '03' || mes === '04' || mes === '05' || mes === '06' || mes === '07' || mes === '08' || mes === '09') {
        mes = mes - 0;
      }
      parapiker2.push(new Date(anio, mes - 1, dia))
    })

  }

=======
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
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
<<<<<<< HEAD
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <input
=======
          <form onSubmit={(e) => handleSubmit(e)}className={styles.form}>          
          <input
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
              type="text"
              name="Anombrede"
              onChange={(e) => handleChange(e)}
              placeholder="A nombre de:"
              className={styles.formInputs}
              required
<<<<<<< HEAD
            />
            <div>Costo por noche:   </div>
            <input
=======
            /> 
            <div>Costo por noche:   </div>
               <input
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
              type="number"
              value={input.CostoFinal}
              name="Checkin"
              placeholder={"Por Noche:" + input.CostoFinal}
              className={styles.formInputs}
              required
            />
<<<<<<< HEAD

            {/*          
=======
         
{/*          
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
            <input
              type="text"
              value={input.Checkin}
              name="Checkin"
              onChange={(e) => handleChange(e)}
              placeholder="Check in"
              className={styles.formInputs}
              required
            /> */}
<<<<<<< HEAD
            <DatePicker
              selected={selectDateCI}
              onChange={e => changeFechas(e)}
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
              onChange={e => changeFechas2(e)}
              placeholderText="Fecha de Check out"
              onFocus={calculofechas}
              className={styles.formInputs}
              dateFormat="dd 'de' MMMM 'de' yyyy"
              minDate={new Date()}
              locale='es'
              excludeDates={parapiker2}
            />

=======
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
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
            <div>
              <div className={styles.p}>Servicios Basicos:
              <p className={styles.p}><strong>Parrilla:</strong>  {seleccionada.Parrilla?<span>si</span>:<span>no</span>}</p>
               <p className={styles.p}><strong> Wifi:</strong> {seleccionada.Wifi?<span>si</span>:<span>no</span>}</p>
               <p className={styles.p}><strong>Parking:</strong>  {seleccionada.Parking?<span>si</span>:<span>no</span>}</p>
              </div>
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
<<<<<<< HEAD
              <button onClick={handlePrueba} className={styles.btnRes}>
                Reservar
              </button>
=======
              <Link to="/reserva/pago">
                <button onClick={handlePrueba} className={styles.btnRes}>
                  Reservar
                </button>
              </Link>
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
            </div>
          </form>
        </div>
      </div>
      <div className={styles.imagenFondo}></div>
    </div>
  );
}
<<<<<<< HEAD


=======
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
