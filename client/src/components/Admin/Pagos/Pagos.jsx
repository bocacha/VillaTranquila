import React, { useState, useEffect } from "react";
import styles from "./Pagos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, readPayment, editPayments, Logeduser, readServicesocultados } from "../../../actions";
import PagosDetail from "./PagosDetail";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
// import { Link } from "react-router-dom";

export default function Pagos() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  const [habilitar, setHabilitar]= useState(false)
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;

  useEffect(() => {
    dispatch(readPayment({ token }));
  }, [dispatch, token]);

  const allPayments = useSelector((state) => state.pagos);
  const [selectedDate, setSelectedDate] = useState(null);
 
  const [input, setInput] = useState({
    Date: "",
    idClient: "",
    TotalAmount: "",
    PaydAmount: "",
  });
  const [mostrar, setMostrar] = useState(false);

  const [edit, setEdit] = useState({
    id: "",
    Date: "",
    idClient: "",
    TotalAmount: "",
    PaydAmount: "",
  });
  

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
    const { token } = logeduser;
    e.preventDefault();
    dispatch(createPayment(input));
    alert("Pago creado con éxito");
    setInput({
      Date: "",
      idClient: "",
      TotalAmount: "",
      PaydAmount: "",
    });
    
    window.location.reload();
  }
  function handleSubmitEdit(e, ID) {
    e.preventDefault();
    setMostrar(true);
    setEdit({...edit,
      id:ID  
    })
    //dispatch(editPayments(edit, { token }));
   
    
  }

  function handlePrueba(e,ID) {
    e.preventDefault();
    setMostrar(true);
    setEdit({...edit,
      id:ID  
    })
    dispatch(editPayments(edit, { token }));
   
   // window.location.reload();
  }
  const ocultadas= () => {
    dispatch(readServicesocultados())
  }
  const showtrue=()=>{
    dispatch(readPayment())
  }
  return (
    <div className={styles.container}>
      <div className={styles.formsCont}>
      {!habilitar ?(
            <button onClick={ocultadas}>Mostrar ocultadas</button>
          ):(
            <button onClick={showtrue}>Mostrar habilitadas</button>
          )
          }
        {/* CREAR */}
        <div className={styles.crearCont}>
          <div className={styles.title}>Crear un nuevo pago</div>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
             <DatePicker
          selected={selectedDate}
          onChange={date=> setSelectedDate(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
          className={styles.formInputs}
          //isClearable
          />

            {/* 
          <input
            type="date"
            value={input.Date}
            minDate= {new Date()}
            name="Date"
            onChange={(e) => handleChange(e)}
            placeholder="Date"
            className={styles.Date}
            required
          /> */}
            <input
              type="text"
              value={input.idClient}
              name="idClient"
              onChange={(e) => handleChange(e)}
              placeholder="Cliente id"
              className={styles.formInputs}
              //pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'
              required
            />
            <input
              type="text"
              value={input.TotalAmount}
              name="TotalAmount"
              onChange={(e) => handleChange(e)}
              placeholder="Monto total"
              className={styles.formInputs}
              required
            />
            <input
              type="text"
              value={input.PaydAmount}
              name="PaydAmount"
              onChange={(e) => handleChange(e)}
              placeholder="Monto a pagar"
              className={styles.formInputs}
              required
            />
            <div className={styles.btns}>
              <button type="submit" className={styles.btn}>
                Crear
              </button>
            </div>
          </form>
        </div>
        {/* EDITAR */}
        {mostrar ?
            <div className={styles.editarCont}>
            <div className={styles.title}> Editar un nuevo pago</div>
            <form className={styles.form}>
              <input
                type="text"
                value={edit.Date}
                name="Date"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Fecha"
                className={styles.formInputs}
              />
              <input
                type="text"
                value={edit.idClient}
                name="idClient"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Cliente id"
                className={styles.formInputs}
              />
              <input
                type="text"
                value={edit.TotalAmount}
                name="TotalAmount"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Monto total"
                className={styles.formInputs}
              />
              <input
                type="text"
                value={edit.PaydAmount}
                name="PaydAmount"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Monto a pagar"
                className={styles.formInputs}
              />
             
            </form>
          </div>
          :
          null
        }
        

      </div>

      {/* VER */}
      <div>
        {allPayments?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <PagosDetail
                ID={el.ID}
                idClient={el.idClient}
                Date={el.Date}
                PaydAmount={el.PaydAmount}
                TotalAmount={el.TotalAmount}
                handlePrueba={handlePrueba}
                handleSubmitEdit={handleSubmitEdit}
                restaurar={habilitar}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
