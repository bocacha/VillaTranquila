import React, { useState, useEffect } from "react";
import styles from "./Pagos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, readPayment, editPayments, Logeduser } from "../../../actions";
import PagosDetail from "./PagosDetail";
import { Link } from "react-router-dom";

export default function Pagos() {
  const dispatch = useDispatch();
  const allPayments = useSelector((state) => state.pagos);
  const logeduser = useSelector ((state) => state.user);
  const {token}  = logeduser
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
    dispatch(Logeduser());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(readPayment({token}));
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
    const {token} = logeduser
    e.preventDefault();
    dispatch(createPayment(input));
    alert("Pago creado con éxito");
    setInput({
      Date: "",
      idClient: "",
      TotalAmount: "",
      PaydAmount: "",
    });
    dispatch(readPayment({token}))
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
          <button>Volver</button>
        </Link>
      </div>
      {/* CREAR */}
      <div>
        Crear un nuevo pago
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={input.Date}
            name="Date"
            onChange={(e) => handleChange(e)}
            placeholder="Date"
            className={styles.Date}
          />
          <input
            type="text"
            value={input.idClient}
            name="idClient"
            onChange={(e) => handleChange(e)}
            placeholder="idClient"
            className={styles.idClient}
          />
          <input
            type="text"
            value={input.TotalAmount}
            name="TotalAmount"
            onChange={(e) => handleChange(e)}
            placeholder="TotalAmount"
            className={styles.TotalAmount}
          />
          <input
            type="text"
            value={input.PaydAmount}
            name="PaydAmount"
            onChange={(e) => handleChange(e)}
            placeholder="PaydAmount"
            className={styles.PaydAmount}
          />
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Crear
            </button>
          </div>
        </form>
      </div>
      {/* EDITAR */}
      <div>
        Editar un nuevo pago
        <form onSubmit={(e) => handleSubmitEdit(e)}>
          <input
            type="text"
            value={edit.id}
            name="id"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="id"
            className={styles.id}
          />
          <input
            type="text"
            value={edit.Date}
            name="Date"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="Date"
            className={styles.Date}
          />
          <input
            type="text"
            value={edit.idClient}
            name="idClient"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="idClient"
            className={styles.idClient}
          />
          <input
            type="text"
            value={edit.TotalAmount}
            name="TotalAmount"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="TotalAmount"
            className={styles.TotalAmount}
          />
          <input
            type="text"
            value={edit.PaydAmount}
            name="PaydAmount"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="PaydAmount"
            className={styles.PaydAmount}
          />
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Crear
            </button>
          </div>
        </form>
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
