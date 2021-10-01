import React, { useState } from "react";
import styles from "./Servicios.module.css";
import { useDispatch } from "react-redux";
import { createServices } from "../../../actions";

export default function Servicios() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    Name: "",
    Description: "",
    Price: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createServices(input));
    alert("Servicio creado con éxito");
    setInput({
      Name: "",
      Description: "",
      Price: "",
    });
  }

  return (
    <div className={styles.container}>
      {/* CREAR */}
      <div>
        Crear un nuevo servicio
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={input.Name}
            name="Name"
            onChange={(e) => handleChange(e)}
            placeholder="Nombre"
            className={styles.Name}
          />
          <input
            type="text"
            value={input.Description}
            name="Description"
            onChange={(e) => handleChange(e)}
            placeholder="Descripción"
            className={styles.Description}
          />
          <input
            type="text"
            value={input.Price}
            name="Price"
            onChange={(e) => handleChange(e)}
            placeholder="Price"
            className={styles.Price}
          />
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
