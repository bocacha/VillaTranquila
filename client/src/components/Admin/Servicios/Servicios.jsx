import React, { useState, useEffect } from "react";
import styles from "./Servicios.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createServices,
  readServices,
  editServices,
  Logeduser,
  readServicesocultados,
} from "../../../actions";
import ServiciosDetail from "./ServiciosDetail";
import { Link } from "react-router-dom";
import NavAdmin from '../NavAdmin/NavAdmin';
import Navbar from "../../Navbar/Navbar";

export default function Servicios() {
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.servicios);
  const [habilitar, setHabilitar] = useState(false);
  const logeduser = useSelector((state) => state.user);
  const [mostrar, setMostrar] = useState(false);
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
    dispatch(Logeduser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(readServices());
  }, [dispatch]);
  function handleSubmit(e) {
    const { token } = logeduser;
    e.preventDefault();
    dispatch(createServices(input, { token }));
    alert("Servicio creado con éxito");
    setInput({
      Name: "",
      Description: "",
      Price: "",
    });
    //window.location.reload();
  }
  function handleSubmitEdit(e, ID,
    Name,
    Description,
    Price,) {
    const { token } = logeduser;
    e.preventDefault();
    setMostrar(true);
    setEdit({
      ...edit,
      id: ID,
      Name: Name,
      Description:Description,
      Price:Price,
    });
   // dispatch(editServices(edit, { token }));
    //window.location.reload();
  }
  function handlePrueba(e, ID) {
    const { token } = logeduser;
    e.preventDefault();
    dispatch(editServices(edit, { token }));
    setMostrar(true);
    setEdit({
      ...edit,
      id: ID,
    });
    alert("Editado")
    window.location.reload()
  }
  
  const ocultadas = () => {
    dispatch(readServicesocultados());
    setHabilitar(true);
  };
  const showtrue = () => {
    dispatch(readServices());
    setHabilitar(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.navs2}>
        <div className={styles.navs}>
          <Navbar />
          <NavAdmin />
        </div>
      </div>
      <div className={styles.btnsContainer}>
        {!habilitar ? (
          <button onClick={ocultadas} className={styles.btnSup}>Mostrar ocultadas</button>
        ) : (
          <button onClick={showtrue} className={styles.btnSup}>Mostrar habilitadas</button>
        )}
      </div>
      <div className={styles.container2}>
        <div className={styles.formsCont}>
          {/* CREAR */}
          <div className={styles.crearCont}>
            <div className={styles.title}> Crear un servicio</div>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
              <input
                type="text"
                value={input.Name}
                name="Name"
                onChange={(e) => handleChange(e)}
                placeholder="Nombre"
                className={styles.formInputs}
                pattern="^[0-9a-zA-Z\s]+$"
                title="debe contener letras y numeros"
                required
              />
              <textarea
                type="text"
                value={input.Description}
                name="Description"
                onChange={(e) => handleChange(e)}
                placeholder="Descripción"
                className={styles.formInputs}
                required
              />
              <input
                type="number"
                value={input.Price}
                name="Price"
                min="500"
                max="20000"
                onChange={(e) => handleChange(e)}
                placeholder="Precio"
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
          {mostrar ? (
            <div className={styles.editarCont}>
              <div className={styles.title}> Editar un nuevo servicio</div>
              <form>
                <input
                  type="text"
                  value={edit.Name}
                  name="Name"
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Nombre"
                  className={styles.formInputs}
                  pattern="^[0-9a-zA-Z\s]+$"
                  title="debe contener letras y numeros"
                  required
                />
                <input
                  type="text"
                  value={edit.Description}
                  name="Description"
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Descripción"
                  className={styles.formInputs}
                  required
                />
                <input
                  type="text"
                  value={edit.Price}
                  name="Price"
                  min="1000"
                  max="20000"
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Precio"
                  className={styles.formInputs}
                  required
                />
              </form>
            </div>
          ) : null}
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
  );
}
