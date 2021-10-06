import React, { useState, useEffect } from "react";
import styles from "./Servicios.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createServices, readServices, editServices, Logeduser, readServicesocultados} from "../../../actions";
import ServiciosDetail from "./ServiciosDetail";
import { Link } from "react-router-dom";

export default function Servicios() {
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.servicios);
  const logeduser = useSelector ((state) => state.user);
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
    const {token} = logeduser
     e.preventDefault();
    dispatch(createServices(input, {token}));
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
 const ocultadas= () => {
   dispatch(readServicesocultados())
 }
 const showtrue=()=>{
  dispatch(readServices())
}
return (
    <div className={styles.container}>
      <div className={styles.btnVolver}>
        <Link to="/admin">
          <button className={styles.btn}>Volver</button>
        </Link>
      </div>
      <button onClick={ocultadas}>Mostrar ocultadas</button>
      <div className={styles.formsCont}>
        {/* CREAR */}
        <div className={styles.crearCont}>
          <div className={styles.title}> Crear un nuevo servicio</div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={input.Name}
              name="Name"
              onChange={(e) => handleChange(e)}
              placeholder="Nombre"
              className={styles.formInputs} 
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
              min='1000' 
              max='20000'
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
        <div className={styles.editarCont}>
          <div className={styles.title}> Editar un nuevo servicio</div>
          <form onSubmit={(e) => handleSubmitEdit(e)}>
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
              value={edit.Name}
              name="Name"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Nombre"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={edit.Description}
              name="Description"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Descripción"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={edit.Price}
              name="Price"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Precio"
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
