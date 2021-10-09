import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { createCabains, readCabains, editCabains, Logeduser, readCabainsocultados } from "../../../actions";
=======
import {
  createCabains,
  readCabains,
  editCabains,
  Logeduser,
  readCabainsocultados,
} from "../../../actions";
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
import styles from "./Cabañas.module.css";
import CabañasDetail from "../Cabañas/CabañasDetail";
import { Link } from "react-router-dom";

const Cabañas = () => {
  const dispatch = useDispatch();
  const allCabains = useSelector((state) => state.cabañas);
  const logeduser = useSelector((state) => state.user);
<<<<<<< HEAD
  const [habilitar, setHabilitar] = useState(false)
=======
  const [habilitar, setHabilitar] = useState(false);
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
  const [cabain, setCabain] = useState({
    Number: "",
    Capacity: "",
    Available: [],
    Price: "",
    Description: "",
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
console.log(edit.Available)
  const [mostrar, setMostrar] = useState(false);
<<<<<<< HEAD

=======
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad

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
<<<<<<< HEAD
  console.log('handle', edit)
=======
  console.log("handle", edit);
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad

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
    alert("su cabaña fue creada con exito");
    dispatch(createCabains(cabain, { token }));
    window.location.reload();
  };

<<<<<<< HEAD
  const handleeditSubmit = (e, ID) => {
    setEdit({
      ...edit,
      id: ID
    })
=======
  const handleeditSubmit = (e, ID, Number,
    Capacity,
    Available,
    Price,
    Description,
    Parrilla,
    Wifi,
    Parking) => {
    setEdit({ ...edit, id: ID, Number:Number,
      Capacity:Capacity,
      Available:Available,
      Price:Price,
      Description:Description,
      Parrilla:Parrilla,
      Wifi:Wifi,
      Parking:Parking});
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
    e.preventDefault();
    setMostrar(true);
    const { token } = logeduser;
    dispatch(editCabains(edit, { token }));
<<<<<<< HEAD


  };


  const handlePrueba = (e, ID) => {
    setEdit({
      ...edit,
      id: ID
    })
    e.preventDefault();
    setMostrar(true);
    pruebadispatch()
  };
  const pruebadispatch = () => {
    const { token } = logeduser;
    dispatch(editCabains(edit, { token }));
    window.location.reload()
  }
  const ocultadas = () => {
    dispatch(readCabainsocultados())
    setHabilitar(true)
  }
  const showtrue = () => {
    dispatch(readCabains())
    setHabilitar(false)
  }
=======
  };
  function handleSelect(e) {
    setCabain({
      ...cabain,
      [e.target.name] : e.target.value,
    });
  }
  function handleSelectedit(e) {
    setEdit({
      ...edit,
      [e.target.name] : e.target.value,
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
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad

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
<<<<<<< HEAD
            {!habilitar ? (
              <button onClick={ocultadas}>Mostrar ocultadas</button>
            ) : (
              <button onClick={showtrue}>Mostrar habilitadas</button>
            )
            }
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.title}>Crear Cabaña</div>
=======
              <div className={styles.title}>Crear Cabaña</div>
            <form onSubmit={handleSubmit} className={styles.form}>
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
<<<<<<< HEAD
                  className={styles.formInp}
                  requiered
                />
              </div>
              {/* <div>
                <input
=======
                  className={styles.formInputs}
                  requiered
                />
              </div>
              {/* <div> */}
                {/* <textarea
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
                  type="text"
                  name="Available"
                  value={cabain.Available}
                  onChange={handleChange}
<<<<<<< HEAD
                  placeholder="Disponibilidad"
=======
                  placeholder={cabain.Available}
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
<<<<<<< HEAD
=======
              <select
                onChange={(e) => handleSelect(e)}
               // value={cabain.Parking}
                className={styles.formInputs}
                name="Parking"
                required
              >
                <option>Estacionamiento:</option>
                <option  name="Parking"  value="true">true</option>
                <option  name="Parking" value="false">false</option>
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
                <option name="Parrilla"  value="false">false</option>
              </select>

              <select
                onChange={(e) => handleSelect(e)}
                name="Wifi"
               // value={cabain.Wifi}
                className={styles.formInputs}
                required
              >
                <option>Wifi:</option>
                <option name="Wifi"  value="true">true</option>
                <option name="Wifi"  value="false">false</option>
              </select>
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
<<<<<<< HEAD
          {mostrar ?
            <div className={styles.editarCont}>
              <div className={styles.title}>Editar Cabaña</div>
              <form>
=======
          {mostrar ? (
            <div className={styles.editarCont}>
              <div className={styles.title}>Editar Cabaña</div>
              <form className={styles.form}>
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
<<<<<<< HEAD
=======
                  Nº De Cabaña
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
<<<<<<< HEAD
=======
                  Cantidad de Camas
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
                  <input
                    type="number"
                    name="Capacity"
                    value={edit.Capacity}
                    onChange={handleChangeEdit}
                    placeholder="Numero de Camas"
                    className={styles.formInputs}
                  />
                </div>
<<<<<<< HEAD
                <div>
=======
                {/* <div>
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
                  <input
                    type="text"
                    name="Available"
                    value={edit.Available}
                    onChange={handleChangeEdit}
<<<<<<< HEAD
                    placeholder="Disponibilidad"
                    className={styles.formInputs}
                  />
                </div>
                <div>
=======
                    placeholder={edit.Available}
                    className={styles.formInputs}
                  />
                </div> */}
                <div>
                  Costo por Noche
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
<<<<<<< HEAD
=======
                  Description
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
                  <textarea
                    type="text"
                    name="Description"
                    value={edit.Description}
                    onChange={handleChangeEdit}
                    placeholder="Descripción"
                    className={styles.formInputs}
                  />
                </div>
<<<<<<< HEAD
=======
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
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
<<<<<<< HEAD
            : null}
=======
          ) : null}
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
<<<<<<< HEAD
                  Barbecue={el.Barbecue}
=======
                  Parrilla={el.Parrilla}
>>>>>>> d25fce356aafe67faf4514b8ce31e812e2a2daad
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
