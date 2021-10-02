import React, { useState, useEffect } from "react";
import styles from "./Pagos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, readPayment, editPayments } from "../../../actions";
import PagosDetail from "./PagosDetail";
import { Link } from "react-router-dom";

export default function Pagos() {
  const dispatch = useDispatch();
  const allPayments = useSelector((state) => state.pagos);
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;
  const [input, setInput] = useState({
    Date: "",
    idClient: "",
    TotalAmount: "",
    PaydAmount: "",
  });

  const [edit, setEdit] = useState({
    id: "",
    Date: "",
    idClient: "",
    TotalAmount: "",
    PaydAmount: "",
  });

  useEffect(() => {
    dispatch(readPayment({ token }));
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
    dispatch(readPayment({ token }));
  }
  function handleSubmitEdit(e) {
    e.preventDefault();
    dispatch(editPayments(edit));
    alert("Pago editado con éxito");
    setEdit({
      id: "",
      Date: "",
      idClient: "",
      TotalAmount: "",
      PaydAmount: "",
    });
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      <div className={styles.btnVolver}>
        <Link to="/admin">
          <button className={styles.btn}>Volver</button>
        </Link>
      </div>
      <div className={styles.formsCont}>
        {/* CREAR */}
        <div className={styles.crearCont}>
          <div className={styles.title}>Crear un nuevo pago</div>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <input
              type="text"
              value={input.Date}
              name="Date"
              onChange={(e) => handleChange(e)}
              placeholder="Fecha"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={input.idClient}
              name="idClient"
              onChange={(e) => handleChange(e)}
              placeholder="Cliente id"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={input.TotalAmount}
              name="TotalAmount"
              onChange={(e) => handleChange(e)}
              placeholder="Monto total"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={input.PaydAmount}
              name="PaydAmount"
              onChange={(e) => handleChange(e)}
              placeholder="Monto a pagar"
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
        <div className={styles.editarCont}>
          <div className={styles.title}> Editar un nuevo pago</div>
          <form onSubmit={(e) => handleSubmitEdit(e)} className={styles.form}>
            <input
              type="text"
              value={edit.id}
              name="id"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Id"
              className={styles.formInputs}
            />
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
            <div className={styles.btns}>
              <button type="submit" className={styles.btn}>
                Editar
              </button>
            </div>
          </form>
        </div>
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
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
