import React, { useState, useEffect } from "react";
import styles from "./Pagos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, readPayment } from "../../../actions";
import PagosDetail from "./PagosDetail";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function Pagos() {
  const dispatch = useDispatch();
  const allPayments = useSelector((state) => state.pagos);

  const [selectedDate, setSelectedDate] = useState(null);

  const [input, setInput] = useState ({
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

  return (
    <div className={styles.container}>
      {/* CREAR */}
      <div>
        Crear un nuevo pago
        <form onSubmit={(e) => handleSubmit(e)}>

          <DatePicker
          selected={selectedDate}
          onChange={date=> setSelectedDate(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()
          }
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
            placeholder="id Cliente"
            className={styles.idClient}
            pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'
            required
          />
          
          <input
            type="number"
            value={input.TotalAmount}
            name="TotalAmount"
            onChange={(e) => handleChange(e)}
            placeholder="Costo total"
            className={styles.TotalAmount}
            required
          />
          <input
            type="number"
            value={input.PaydAmount}
            name="Cantidad abonada"
            onChange={(e) => handleChange(e)}
            placeholder="PaydAmount"
            className={styles.PaydAmount}
            required
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
