import React, { useState, useEffect } from "react";
import styles from "./Servicios.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createServices, readServices } from "../../../actions";
import ServiciosDetail from "./ServiciosDetail";

export default function Servicios() {
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.servicios);
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

  useEffect(() => {
    dispatch(readServices());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createServices(input));
    alert("Servicio creado con éxito");
    setInput({
      Name: "",
      Description: "",
      Price: "",
    });
    window.location.reload();
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
      <div>
        {allServices?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <ServiciosDetail
                Name={el.Name}
                Description={el.Description}
                Price={el.Price}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
