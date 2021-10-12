import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCabains,
  readCabains,
  editCabains,
  Logeduser,
  readCabainsocultados,
  readPictures
} from "../../../actions";
import styles from "./Cabañas.module.css";
import CabañasDetail from "../Cabañas/CabañasDetail";
import NavAdmin from '../NavAdmin/NavAdmin';


const Cabañas = () => {
  const dispatch = useDispatch();
  const allCabains = useSelector((state) => state.cabañas);
  const logeduser = useSelector((state) => state.user);
  const allFotos = useSelector((state) => state.fotos);
  const [habilitar, setHabilitar] = useState(false);
  const [cabain, setCabain] = useState({
    Number: "",
    Capacity: "",
    Available: [],
    Price: "",
    Description: "",
    Picture: "",
    Coffe: false,
    Microondas: false,
    Calefaccion: false,
    Parrilla: false,
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
    Available: [],
    Price: "",
    Description: "",
    Picture: "",
    Coffe: false,
    Microondas: false,
    Calefaccion: false,
    Parrilla: false,
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

  useEffect(() => {
    dispatch(readPictures());
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

  // const handleCheckBox = (e) => {
  //   setCabain({
  //     ...cabain,
  //     [e.target.name]: true,
  //   });
  // };
  // const handleeditCheckBox = (e) => {
  //   setEdit({
  //     ...cabain,
  //     [e.target.name]: true,
  //   });
  // };
  const handleSubmit = (e) => {
    const { token } = logeduser;
    e.preventDefault();
    dispatch(createCabains(cabain, { token }));
    alert("su cabaña fue creada con exito");
    window.location.reload();
    
  };

  const handleeditSubmit = (e, ID, Number,
    Capacity,
    Available,
    Price,
    Description,
    Picture,
    Parrilla,
    Wifi,
    Parking) => {
    setEdit({
      ...edit, id: ID, Number: Number,
      Capacity: Capacity,
      Available: Available,
      Price: Price,
      Description: Description,
      Picture: Picture,
      Parrilla: Parrilla,
      Wifi: Wifi,
      Parking: Parking
    });
    e.preventDefault();
    setMostrar(true);
    const { token } = logeduser;
    //dispatch(editCabains(edit, { token }));
  };
  function handleSelect(e) {
    setCabain({
      ...cabain,
      [e.target.name]: e.target.value,
    });
  }
  function handleSelectedit(e) {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelectPicture(e) {
    setCabain({
      ...cabain,
      [e.target.name]: e.target.value,
    });
  }

  const handlePrueba = (e, ID) => {
    setEdit({ ...edit, id: ID });
    e.preventDefault();
    setMostrar(true);
    pruebadispatch();
  };
  const pruebadispatch = () => {
    const { token } = logeduser;
    dispatch(editCabains(edit, { token }));
   
  };
  const ocultadas = () => {
    dispatch(readCabainsocultados());
    setHabilitar(true);
  };
  const showtrue = () => {
    dispatch(readCabains());
    setHabilitar(false);
  };

  // console.log(allFotos[0].Description)
  return (
    <div className={styles.container}>
        <NavAdmin />
        <div className={styles.btnsContainer}>
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
                  max="20"
                  className={styles.formInputs}
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="Capacity"
                  value={cabain.Capacity}
                  onChange={handleChange}
                  placeholder="Numero de Camas"
                  max="10"
                  className={styles.formInputs}
                  required
                />
              </div>
              {/* <div> */}
              {/* <textarea
                  type="text"
                  name="Available"
                  value={cabain.Available}
                  onChange={handleChange}
                  placeholder={cabain.Available}
                  className={styles.formInputs}
                  requiered
                />
              </div> */}
              <div>
                <input
                  type="number"
                  name="Price"
                  value={cabain.Price}
                  onChange={handleChange}
                  placeholder="Precio"
                  className={styles.formInputs}
                  max="50000"
                  required
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
                  maxLength="100"
                  required
                />
              </div>

              <select name="Picture"
                onChange={(e) => handleSelectPicture(e)}
              >
                <option>Seleccione Imagen:</option>
                {allFotos.map((el) => {
                  return (<option name="Picture" value={el.Url}>{el.Description}</option>)
                })}
              </select>

              <select
                onChange={(e) => handleSelect(e)}
                // value={cabain.Parking}
                className={styles.formInputs}
                name="Parking"
                required
              >
                <option>Estacionamiento:</option>
                <option name="Parking" value="true">true</option>
                <option name="Parking" value="false">false</option>
              </select>

              <select
                onChange={(e) => handleSelect(e)}
                // value={cabain.Parrilla}
                className={styles.formInputs}
                name="Parrilla"
                required
              >
                <option>Parrilla:</option>
                <option name="Parrilla" value="true">true</option>
                <option name="Parrilla" value="false">false</option>
              </select>

              <select
                onChange={(e) => handleSelect(e)}
                name="Wifi"
                // value={cabain.Wifi}
                className={styles.formInputs}
                required
              >
                <option>Wifi:</option>
                <option name="Wifi" value="true">true</option>
                <option name="Wifi" value="false">false</option>
              </select>
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
                  Nº De Cabaña
                  <input
                    type="text"
                    name="Number"
                    value={edit.Number}
                    onChange={handleChangeEdit}
                    placeholder="Numero de Cabaña"
                    max="20"
                    className={styles.formInputs}
                    required
                  />
                </div>
                <div>
                  Cantidad de Camas
                  <input
                    type="number"
                    name="Capacity"
                    value={edit.Capacity}
                    onChange={handleChangeEdit}
                    placeholder="Numero de Camas"
                    max="10"
                    className={styles.formInputs}
                    required
                  />
                </div>
                {/* <div>
                  <input
                    type="text"
                    name="Available"
                    value={edit.Available}
                    onChange={handleChangeEdit}
                    placeholder={edit.Available}
                    className={styles.formInputs}
                  />
                </div> */}
                <div>
                  Costo por Noche
                  <input
                    type="number"
                    name="Price"
                    value={edit.Price}
                    onChange={handleChangeEdit}
                    placeholder="Precio"
                    className={styles.formInputs}
                    max="50000"
                    required
                  />
                </div>
                <div>
                  Description
                  <textarea
                    type="text"
                    name="Description"
                    value={edit.Description}
                    onChange={handleChangeEdit}
                    placeholder="Descripción"
                    maxLength="100"
                    className={styles.formInputs}
                    required
                  />
                </div>

                <select name="Picture"
                  onChange={(e) => handleSelectedit(e)}
                >
                  <option>Seleccione Imagen:</option>
                  {allFotos.map((el) => {
                    return (<option name="Picture" value={el.Url}>{el.Description}</option>)
                  })}
                </select>
                Servicios Basicos
                <select
                  onChange={(e) => handleSelectedit(e)}
                  // value={edit.Parking}
                  className={styles.formInputs}
                  name="Parking"
                  required
                >
                  <option>Estacionamiento:</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                <select
                  onChange={(e) => handleSelectedit(e)}
                  // value={edit.Parrilla}
                  className={styles.formInputs}
                  name="Parrilla"
                  required
                >
                  <option>Parrilla:</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                <select
                  onChange={(e) => handleSelectedit(e)}
                  // value={edit.Wifi}
                  className={styles.formInputs}
                  name="Wifi"
                  required
                >
                  <option>Wifi:</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
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
                  Picture={el.Picture}
                  Coffe={el.Coffe}
                  Microondas={el.Microondas}
                  Calefaccion={el.Calefaccion}
                  Parrilla={el.Parrilla}
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
