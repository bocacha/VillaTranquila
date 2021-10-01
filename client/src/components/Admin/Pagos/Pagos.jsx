import React, { useState, useEffect } from "react";
import styles from "./Pagos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, readPayment } from "../../../actions";
import PagosDetail from "./PagosDetail";

export default function Pagos() {
  const dispatch = useDispatch();
  const allPayments = useSelector((state) => state.pagos);
  const logeduser = useSelector ((state) => state.user);
  const [input, setInput] = useState({
    Date: "",
    idClient: "",
    TotalAmount: "",
    PaydAmount: "",
  });

  useEffect(() => {
    dispatch(readPayment());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
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

  return (
    <div className={styles.container}>
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
      {/* VER */}
      <div>
        {allPayments?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <PagosDetail
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
