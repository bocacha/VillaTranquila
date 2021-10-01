import React, { useState, useEffect } from "react";
import styles from "./Servicios.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createServices, readServices, editServices } from "../../../actions";
import ServiciosDetail from "./ServiciosDetail";
import { Link } from "react-router-dom";

export default function Servicios() {
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.servicios);
  const [input, setInput] = useState({
    Name: "",
    Description: "",
    Price: "",
  });
  const [edit, setEdit] = useState({
    id: "",
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
  function handleChangeEdit(e) {
    setEdit({
      ...edit,
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
  function handleSubmitEdit(e) {
    e.preventDefault();
    dispatch(editServices(edit));
    alert("Servicio editado con éxito");
    setEdit({
      id: "",
      Name: "",
      Description: "",
      Price: "",
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
      {/* VER */}
      <div>
        Editar un nuevo servicio
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
            value={edit.Name}
            name="Name"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="Nombre"
            className={styles.Name}
          />
          <input
            type="text"
            value={edit.Description}
            name="Description"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="Descripción"
            className={styles.Description}
          />
          <input
            type="text"
            value={edit.Price}
            name="Price"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="Price"
            className={styles.Price}
          />
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Editar
            </button>
          </div>
        </form>
      </div>
      <div>
        {allServices?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <ServiciosDetail
                ID={el.ID}
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
