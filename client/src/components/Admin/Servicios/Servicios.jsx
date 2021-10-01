<<<<<<< HEAD
import React, { useState } from "react";
import styles from "./Servicios.module.css";
import { useDispatch } from "react-redux";
import { createServices } from "../../../actions";

export default function Servicios() {
  const dispatch = useDispatch();
=======
import React, { useState, useEffect } from "react";
import styles from "./Servicios.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createServices, readServices } from "../../../actions";
import ServiciosDetail from "./ServiciosDetail";

export default function Servicios() {
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.servicios);
>>>>>>> f1dea7dc03e3683c6b1fdb4cc4734e0fe22b4594
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

<<<<<<< HEAD
=======
  useEffect(() => {
    dispatch(readServices());
  }, [dispatch]);

>>>>>>> f1dea7dc03e3683c6b1fdb4cc4734e0fe22b4594
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createServices(input));
    alert("Servicio creado con éxito");
    setInput({
      Name: "",
      Description: "",
      Price: "",
    });
<<<<<<< HEAD
=======
    window.location.reload();
>>>>>>> f1dea7dc03e3683c6b1fdb4cc4734e0fe22b4594
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
<<<<<<< HEAD
=======
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
>>>>>>> f1dea7dc03e3683c6b1fdb4cc4734e0fe22b4594
    </div>
  );
}
