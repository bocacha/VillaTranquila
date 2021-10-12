import React, { useState, useEffect } from "react";
import styles from "./Pagos.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createPayment,
  readPayment,
  editPayments,
  Logeduser,
  readPaymentocultados,
} from "../../../actions";
import PagosDetail from "./PagosDetail";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import NavAdmin from '../NavAdmin/NavAdmin';
// import { Link } from "react-router-dom";

export default function Pagos() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  const [habilitar, setHabilitar] = useState(false);
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
  function handleSubmitEdit(e, ID,
    TotalAmount,
    PaydAmount,
    Date,
    idClient) {
    e.preventDefault();
    setMostrar(true);
    setEdit({ ...edit, id: ID,TotalAmount:TotalAmount,PaydAmount:PaydAmount,Date:Date});
    //dispatch(editPayments(edit, { token }));
  }

  function handlePrueba(e, ID) {
    const { token } = logeduser;
    e.preventDefault();
    setMostrar(true);
    setEdit({ ...edit, id: ID });
    dispatch(editPayments(edit, { token }));

    window.location.reload();
  }
  const ocultadas = () => {
    const { token } = logeduser;
    dispatch(readPaymentocultados({ token }));
    setHabilitar(true);
  };
  const showtrue = () => {
    const { token } = logeduser;
    dispatch(readPayment({ token }));
    setHabilitar(false);
  };
  const changeFechas=(e)=>{
    if(e === null){
      return
    }
    setSelectDateCI(e)
    mostrarFecha(e);
  }
  const mostrarFecha = selectDateCI =>{
    const options = {year:'numeric', month:'numeric', day:'2-digit'}
    setEdit({...input,  Checkin: selectDateCI.toLocaleDateString('es-ES', options)})
    
  }
  return (
    <div className={styles.container}>
      <NavAdmin />
      <div className={styles.btnsContainer}>
        {!habilitar ? (
          <button onClick={ocultadas} className={styles.btnSup}>
            Mostrar ocultadas
          </button>
        ) : (
          <button onClick={showtrue} className={styles.btnSup}>
            Mostrar habilitadas
          </button>
        )}
      </div>
      <div className={styles.container2}>
        <div className={styles.formsCont}>
          {/* CREAR */}
          {/* <div className={styles.crearCont}>
            <div className={styles.title}>Crear un pago</div>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className={styles.formInputs}
                required
                //isClearable
              />

               
          <input
            type="date"
            value={input.Date}
            minDate= {new Date()}
            name="Date"
            onChange={(e) => handleChange(e)}
            placeholder="Date"
            className={styles.Date}
            required
          />
              <input
                type="text"
                value={input.idClient}
                name="idClient"
                onChange={(e) => handleChange(e)}
                placeholder="Cliente id"
                className={styles.formInputs}
                pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                required
              />
              <input
                type="number"
                value={input.TotalAmount}
                name="TotalAmount"
                onChange={(e) => handleChange(e)}
                placeholder="Monto total $"
                className={styles.formInputs}
                required
              />
              <input
                type="number"
                value={input.PaydAmount}
                name="PaydAmount"
                onChange={(e) => handleChange(e)}
                placeholder="Monto a pagar $"
                className={styles.formInputs}
                required
              />
              <div className={styles.btns}>
                <button type="submit" className={styles.btn}>
                  Crear
                </button>
              </div>
            </form>
          </div> */}
          {/* EDITAR */}
          {mostrar ? (
            <div className={styles.editarCont}>
              <div className={styles.title}> Editar un nuevo pago</div>
              <form className={styles.form}>
              <DatePicker
                selected={edit.Date}
                onChange={(e) => changeFechas(e)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className={styles.formInputs}
                required
                //isClearable
              />
                <input
                  type="text"
                  value={edit.idClient}
                  name="idClient"
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Cliente id"
                  pattern='^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
                  className={styles.formInputs}
                  required
                />
                <input
                  type="number"
                  value={edit.TotalAmount}
                  name="TotalAmount"
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Monto total $"
                  className={styles.formInputs}
                  required
                />
                <input
                  type="number"
                  value={edit.PaydAmount}
                  name="PaydAmount"
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Monto a pagar $"
                  className={styles.formInputs}
                  required
                />
              </form>
            </div>
          ) : null}

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
      </div>
    </div>
  );
}
