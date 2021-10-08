import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCabains,
  readCabains,
  editCabains,
  Logeduser,
  readCabainsocultados,
} from "../../../actions";
import styles from "./Cabañas.module.css";
import CabañasDetail from "../Cabañas/CabañasDetail";
import { Link } from "react-router-dom";

const Cabañas = () => {
  const dispatch = useDispatch();
  const allCabains = useSelector((state) => state.cabañas);
  const logeduser = useSelector((state) => state.user);
  const [habilitar, setHabilitar] = useState(false);
  const [cabain, setCabain] = useState({
    Number: "",
    Capacity: "",
    Available: "",
    Price: "",
    Description: "",
    Coffe: false,
    Microondas: false,
    Calefaccion: false,
    Barbecue: false,
    Wifi: false,
    Cleaning: false,
    Refrigerator: false,
    Stove: false,
    Parking: false,
  });
  const [edit, setEdit] = useState({
    id: "",
    Number: "",
    Capacity: "",
    Available: "",
    Price: "",
    Description: "",
    Coffe: false,
    Microondas: false,
    Calefaccion: false,
    Barbecue: false,
    Wifi: false,
    Cleaning: false,
    Refrigerator: false,
    Stove: false,
    Parking: false,
  });

  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    dispatch(readCabains());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);

  const handleChange = (e) => {
    setCabain({
      ...cabain,
      [e.target.name]: e.target.value,
    });
  };

  function handleChangeEdit(e) {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  }
  console.log("handle", edit);

  const handleCheckBox = (e) => {
    setCabain({
      ...cabain,
      [e.target.name]: true,
    });
  };
  const handleeditCheckBox = (e) => {
    setEdit({
      ...cabain,
      [e.target.name]: true,
    });
  };
  const handleSubmit = (e) => {
    const { token } = logeduser;
    e.preventDefault();
    alert("su cabaña fue creada con exito");
    dispatch(createCabains(cabain, { token }));
    window.location.reload();
  };

  const handleeditSubmit = (e, ID) => {
    setEdit({ ...edit, id: ID });
    e.preventDefault();
    setMostrar(true);
    const { token } = logeduser;
    dispatch(editCabains(edit, { token }));
  };

  const handlePrueba = (e, ID) => {
    setEdit({ ...edit, id: ID });
    e.preventDefault();
    setMostrar(true);
    pruebadispatch();
  };
  const pruebadispatch = () => {
    const { token } = logeduser;
    dispatch(editCabains(edit, { token }));
    window.location.reload();
  };
  const ocultadas = () => {
    dispatch(readCabainsocultados());
    setHabilitar(true);
  };
  const showtrue = () => {
    dispatch(readCabains());
    setHabilitar(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.btnsContainer}>
        <Link to="/admin">
          <button className={styles.btnVolver}>Volver</button>
        </Link>
        {!habilitar ? (
          <button onClick={ocultadas} className={styles.btnSup}>Mostrar ocultadas</button>
        ) : (
          <button onClick={showtrue} className={styles.btnSup}>Mostrar habilitadas</button>
        )}
      </div>
      <div className={styles.container2}>
        <div className={styles.formsCont}>
          <div className={styles.crearCont}>
              <div className={styles.title}>Crear Cabaña</div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <input
                  type="number"
                  name="Number"
                  value={cabain.Number}
                  onChange={handleChange}
                  placeholder="Numero de Cabaña"
                  className={styles.formInputs}
                  requiered
                />
              </div>
              <div>
                <input
                  type="number"
                  name="Capacity"
                  value={cabain.Capacity}
                  onChange={handleChange}
                  placeholder="Numero de Camas"
                  className={styles.formInputs}
                  requiered
                />
              </div>
              <div>
                <input
                  type="text"
                  name="Available"
                  value={cabain.Available}
                  onChange={handleChange}
                  placeholder="Disponibilidad"
                  className={styles.formInputs}
                  requiered
                />
              </div>
              <div>
                <input
                  type="number"
                  name="Price"
                  value={cabain.Price}
                  onChange={handleChange}
                  placeholder="Precio"
                  className={styles.formInputs}
                  max="50000"
                  requiered
                />
              </div>
              <div>
                <textarea
                  type="text"
                  name="Description"
                  value={cabain.Description}
                  onChange={handleChange}
                  placeholder="Descripción"
                  className={styles.formInputs}
                  requiered
                />
              </div>
              {/* <div>
              <label>Cafe</label>
              <input
                type="checkbox"
                name="Coffe"
                value={cabain.Coffe}
                onChange={handleCheckBox}
                className={styles.formInputs}
              />
              <label>Microondas</label>
              <input
                type="checkbox"
                name="Microondas"
                value={cabain.Microondas}
                onChange={handleCheckBox}
                className={styles.formInputs}
              />
              <label>Calefaccion</label>
              <input
                type="checkbox"
                name="Calefaccion"
                value={cabain.Calefaccion}
                onChange={handleCheckBox}
                className={styles.formInputs}
              />

              <label>Parrilla</label>
              <input
                type="checkbox"
                name="Barbecue"
                value={cabain.Barbecue}
                onChange={handleCheckBox}
                className={styles.formInputs}
              />
              <label>Wifi</label>
              <input
                type="checkbox"
                name="Wifi"
                value={cabain.Wifi}
                onChange={handleCheckBox}
                className={styles.formInputs}
              />
              <label>Estacionamiento</label>
              <input
                type="checkbox"
                name="Parking"
                value={cabain.Parking}
                onChange={handleCheckBox}
                className={styles.formInputs}
              />
            </div> */}
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
              <div className={styles.title}>Editar Cabaña</div>
              <form className={styles.form}>
                {/* <div>
              <input
                type="text"
                name="id"
                value={edit.id}
                onChange={handleChangeEdit}
                placeholder="Id"
                className={styles.formInputs}
              />
            </div> */}
                <div>
                  <input
                    type="text"
                    name="Number"
                    value={edit.Number}
                    onChange={handleChangeEdit}
                    placeholder="Numero de Cabaña"
                    className={styles.formInputs}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="Capacity"
                    value={edit.Capacity}
                    onChange={handleChangeEdit}
                    placeholder="Numero de Camas"
                    className={styles.formInputs}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="Available"
                    value={edit.Available}
                    onChange={handleChangeEdit}
                    placeholder="Disponibilidad"
                    className={styles.formInputs}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="Price"
                    value={edit.Price}
                    onChange={handleChangeEdit}
                    placeholder="Precio"
                    className={styles.formInputs}
                  />
                </div>
                <div>
                  <textarea
                    type="text"
                    name="Description"
                    value={edit.Description}
                    onChange={handleChangeEdit}
                    placeholder="Descripción"
                    className={styles.formInputs}
                  />
                </div>
                {/* <div>
              <label>Cafe</label> 
              <input
                type="checkbox"
                name="Coffe"
                value={edit.Coffe}
                onChange={handleeditCheckBox}
                placeholder="h"
                className={styles.formInputs}
              />
              <label>Microondas</label>
              <input
                type="checkbox"
                name="Microondas"
                value={edit.Microondas}
                onChange={handleeditCheckBox}
                className={styles.formInputs}
              />
              <label>Calefaccion</label>
              <input
                type="checkbox"
                name="Calefaccion"
                value={edit.Calefaccion}
                onChange={handleeditCheckBox}
                className={styles.formInputs}
              />
              <label>Parrilla</label>
              <input
                type="checkbox"
                name="Barbecue"
                value={edit.Barbecue}
                onChange={handleeditCheckBox}
                className={styles.formInputs}
              />
              <label>Wifi</label>
              <input
                type="checkbox"
                name="Wifi"
                value={edit.Wifi}
                onChange={handleeditCheckBox}
                className={styles.formInputs}
              />
              <label>Estacionamiento</label>
              <input
                type="checkbox"
                name="Parking"
                value={edit.Parking}
                onChange={handleeditCheckBox}
                className={styles.formInputs}
              />
            </div> */}
                {/*  <div className={styles.btns}>
              <button type="submit" className={styles.btn}>
                Guardar
              </button>
            </div>  */}
              </form>
            </div>
          ) : null}
        </div>
        {/* VER */}
        <div>
          {allCabains?.map((el) => {
            return (
              <div className={styles.detalles} key={el.ID}>
                <CabañasDetail
                  ID={el.ID}
                  Number={el.Number}
                  Capacity={el.Capacity}
                  Available={el.Available}
                  Price={el.Price}
                  Description={el.Description}
                  Coffe={el.Coffe}
                  Microondas={el.Microondas}
                  Calefaccion={el.Calefaccion}
                  Barbecue={el.Barbecue}
                  Wifi={el.Wifi}
                  Cleaning={el.Cleaning}
                  Refrigerator={el.Refrigerator}
                  Stove={el.Stove}
                  Parking={el.Parking}
                  handlePrueba={handlePrueba}
                  handleeditSubmit={handleeditSubmit}
                  restaurar={habilitar}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cabañas;
