import React, { useState, useEffect } from "react";
import styles from "./Reservaciones.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editReservation,
  readReservation,
  Logeduser,
  readReservationocultados,
  readUsers,
  getCabins,
  readServices
} from "../../../actions";
import ReservacionesDetail from "./ReservacionesDetail";
import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { Link } from "react-router-dom";
import NavAdmin from '../NavAdmin/NavAdmin';
import Navbar from "../../Navbar/Navbar";
import SearchBar from "./SearchBar";
import Paginado from './Paginado/Paginado';
registerLocale('es', es)

export default function Reservaciones() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCabins())
  }, [dispatch])
  useEffect(() => {
    dispatch(readServices());
  }, [dispatch]);
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;
  const [selectDateCI, setSelectDateCI] = useState(null);
  const [selectDateCO, setSelectDateCO] = useState(null);
  const [cabinid, setCabinid] = useState(null)
  const [cabinnumber, setCabinnumber] = useState(null)
  const [costo, setCosto] = useState(null)
  const [mostrar, setMostrar] = useState(false);
  const [habilitar, setHabilitar] = useState(false);
  const allCabins = useSelector((state) => state.cabins);
  const servicios = useSelector((state) => state.servicios);
  useEffect(() => {
    dispatch(readUsers({ token }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(readReservation({ token }));
  }, [dispatch]);
  let lala = [];
  let id1 = 0;
  let suma = []
  let costoadicional = 0
  const allUsers = useSelector((state) => state.usuarios);
  const allReservations = useSelector((state) => state.reservaciones);
  const [edit, setEdit] = useState({
    id: "",
    Anombrede: "",
    Checkin: "",
    Checkout: "",
    CabinNumber: "",
    Cabinid: "",
    ExtraServices: "",
    CostoFinal: "",
    UserName: "",
    UserDNI: "",
  });

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
    CabinNumber,
    UserName,
    Anombrede,
    ExtraServices,
    CostoFinal,
    Cabinid,
    UserDNI,
    ) {
    e.preventDefault();
    setCabinid(Cabinid)
    setCabinnumber(CabinNumber)
    setCosto(CostoFinal)
    setSelectDateCI()
    setSelectDateCO()
    setEdit({
      ...edit,
      id: ID,
      Checkin: Checkin,
      Checkout: Checkout,
      UserName: UserName,
      Anombrede: Anombrede,
      CabinNumber: CabinNumber,
      ExtraServices: ExtraServices,
      CostoFinal: CostoFinal,
      Cabinid: Cabinid,
      UserDNI: UserDNI,
    })
    setMostrar(true);
    //dispatch(editReservation(edit, { token }));

  }
  function handleSelect(e) {
    if (e.target.value === "Cabaña N°") {
      setEdit({
        ...edit,
        Cabinid: cabinid,
        CabinNumber: cabinnumber
      })
    } else {
      const select = allCabins.find(el => el.ID === e.target.value)
      setEdit({
        ...edit,
        CabinNumber: select.Number,
        Cabinid: e.target.value,
      });
    }
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
    //  setEdit({...edit,
    //   id:ID  
    //})
    setMostrar(true);
    dispatch(editReservation(edit, { token }));
    alert("Editado")
    //pruebadispatch()
    // window.location.reload()
  }
  // const pruebadispatch=() => {
  // const { token } = logeduser;
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

  // Paginado---------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage, /*setReservationsPerPage*/] = useState(9);
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  let currentReservations = Array.isArray(allReservations) ?
    allReservations.slice(indexOfFirstReservation, indexOfLastReservation) :
    allReservations;

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //-------------------------------------------------------------------------
  const checkboxselected = () => {
    setEdit({
      ...edit, CostoFinal: edit.CostoFinal,
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
        console.log(checkbox[i].value);
      }
    }
    if(contador === 0){
      setEdit({...edit , ExtraServices:null})
    }
  };
  const consultarprecio=()=>{
    suma = []
    costoadicional = 0
    const checkbox = Array.from(document.getElementsByClassName("Servicios"));
    for (let i = 0; i < checkbox.length; i++) {
      
      if (checkbox[i].checked) {
        suma.push(parseFloat(checkbox[i].name))
        console.log(checkbox[i].name)
      }
    }
    for (let j = 0; j < suma.length; j++) {
      costoadicional = costoadicional + parseFloat(suma[j])

    }
    costoadicional = parseFloat(costoadicional) + parseFloat(costo)
    setEdit({...edit,CostoFinal:costoadicional})
  }
  return (
    <div className={styles.reservasAdmin}>
      <div className={styles.navs2}>
        <div className={styles.navs}>
          <Navbar />
          <NavAdmin  className={styles.navAdmin}/>
        </div>
        <div className={styles.navRsp}>
          <Navbar />
        </div>
      </div>
      <div className={styles.container1}>
        <div className={styles.btnsContainer}>
          {!habilitar ? (
            <button onClick={ocultadas} className={styles.btnSup}>Mostrar ocultadas</button>
          ) : (
            <button onClick={showtrue} className={styles.btnSup}>Mostrar habilitadas</button>
          )
          }
        </div>
        <div>
          <SearchBar />
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
            //  onChange={()=>checkboxselected()}
              required
            />
                  {/* <input
                    type="text"
                    value={edit.UserId}
                    name="UserId"
                    onChange={(e) => handleChangeEdit(e)}
                    placeholder="Usuario id"
                    className={styles.formInputs}
                    title='Formato: UUID4'
                    pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                    required
                  /> */}
                  {/* <input
                    type="text"
                    value={edit.Paymentsid}
                    name="Paymentsid"
                    onChange={(e) => handleChangeEdit(e)}
                    placeholder="Pagos id"
                    className={styles.formInputs}
                    title='Formato: UUID4'
                    pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                    required
                  /> */}
              {/* <label>Cabaña Nº:</label>
              <select
                onChange={(e) => handleSelect(e)}
              >
                <option >Cabaña N°</option>
                {allCabins.map((c) => {

                  return (
                    <option value={c.ID}>{c.Number} </option>
                  )
                })}
                </select> */}
                  {/* <input
                    type="text"
                    value={edit.CabinNumber}
                    name="CabinNumber"
                    onChange={(e) => handleChangeEdit(e)}
                    placeholder="Numero de Cabaña"
                    className={styles.formInputs}
                    title='Formato: UUID4'
                    pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                    required
                  /> */}
                  {/* <input
                    type="text" //?????
                    value={edit.ExtraServices}
                    name="ExtraServices"
                    onChange={(e) => handleChangeEdit(e)}
                    placeholder="Servicios extra"
                    className={styles.formInputs}
                  /> */}
                  <div className={styles.p}>Servicios Adicionales:</div>
              
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
                </form>
                <div className={styles.btns}>
                <button onClick={checkboxselected}>Seleccionar Servicios</button>
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
          {currentReservations.length !== 0 ?
            currentReservations.sort((a, b) => {
              if (a.Checkin < b.Checkin) return -1;
              if (a.Checkin > b.Checkin) return 1;
              return 1;
            }).map((el) => {
              if (allUsers.length > 0) {
                if (allCabins.length > 0) {
                  let username = allUsers.find(e => e.ID === el.UserId).UserName;
                  let cabinNumber = allCabins.find(e => e.ID === el.Cabinid).Number;
                  return (
                    <div className={styles.detalles} key={el.ID}>
                      <ReservacionesDetail
                        ID={el.ID}
                        Checkin={el.Checkin}
                        Checkout={el.Checkout}
                        CabinNumber={cabinNumber}
                        UserName={username}
                        Anombrede={el.Anombrede}
                        CostoFinal={el.CostoFinal}
                        ExtraServices={el.ExtraServices}
                        UserDNI= {el.UserDNI}
                        Cabinid={el.Cabinid}
                        handlePrueba={handlePrueba}
                        handleSubmitEdit={handleSubmitEdit}
                        restaurar={habilitar}
                      />
                    </div>
                  );

                }
              }
            }) :
            <div className={styles.ninguna}>
              <div>
                <h1>No se encontró ninguna reserva</h1>
              </div>
            </div>}
        </div>
        <div className={styles.paginado}>
          <Paginado reservationsPerPage={reservationsPerPage} allReservations={allReservations.length} paginado={paginado} />
        </div>
      </div>
    </div>
  );
}