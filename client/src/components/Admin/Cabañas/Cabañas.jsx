import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCabains,
  readCabains,
  editCabains,
  Logeduser,
  readCabainsocultados,
  readPictures,
} from "../../../actions";
import styles from "./Cabañas.module.css";
import CabañasDetail from "../Cabañas/CabañasDetail";
import Navbar from "../../Navbar/Navbar";
import NavAdmin from "../NavAdmin/NavAdmin";

const Cabañas = () => {
  const dispatch = useDispatch();
  const allCabains = useSelector((state) => state.cabañas);
  const logeduser = useSelector((state) => state.user);
  const allFotos = useSelector((state) => state.fotos);

  // const [rende, setRende] = useState('');
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
    alert("Su cabaña fue creada con éxito 🏡");
    window.location.reload();
  };

  const handleeditSubmit = (
    e,
    ID,
    Number,
    Capacity,
    Available,
    Price,
    Description,
    Picture,
    Parrilla,
    Wifi,
    Parking
  ) => {
    setEdit({
      ...edit,
      id: ID,
      Number: Number,
      Capacity: Capacity,
      Available: Available,
      Price: Price,
      Description: Description,
      Picture: Picture,
      Parrilla: Parrilla,
      Wifi: Wifi,
      Parking: Parking,
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
    alert("Edicion exitosa");
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
    <div className={styles.adminCabañas}>
      <Navbar />
      <NavAdmin />
      <div className={styles.btns}>
        <div className={styles.btnsContainer}>
          {!habilitar ? (
            <button onClick={ocultadas} className={styles.btnSup}>
              Mostrar ocultadas
            </button>
          ) : (
            <button onClick={showtrue} className={styles.btnSup}>
              Mostrar habilitadas
            </button>
          )}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.crearCont}>
          <div className={styles.title}>Crear Cabaña</div>
          <form onSubmit={handleSubmit} >
            <input
              type="number"
              name="Number"
              value={cabain.Number}
              onChange={handleChange}
              placeholder="Número de Cabaña"
              max="20"
              required
            />
            <input
              type="number"
              name="Capacity"
              value={cabain.Capacity}
              onChange={handleChange}
              placeholder="Número de Camas"
              max="10"
              required
            />
            <input
              type="number"
              name="Price"
              value={cabain.Price}
              onChange={handleChange}
              placeholder="Precio"
              max="50000"
              required
            />

            <div>
              <textarea
                type="text"
                name="Description"
                value={cabain.Description}
                onChange={handleChange}
                placeholder="Descripción . . ."
                maxLength="500"
                required
              />
            </div>

            <select name="Picture" className={styles.formInputs} onChange={(e) => handleSelectPicture(e)}>
              <option>Seleccione Imagen:</option>
              {allFotos.map((el) => {
                return (
                  <option name="Picture" value={el.Url}>
                    {el.Description}
                  </option>
                );
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
              <option name="Parking" value="true">
                SI
              </option>
              <option name="Parking" value="false">
                NO
              </option>
            </select>

            <select
              onChange={(e) => handleSelect(e)}
              // value={cabain.Parrilla}
              className={styles.formInputs}
              name="Parrilla"
              required
            >
              <option>Parrilla:</option>
              <option name="Parrilla" value="true">
                SI
              </option>
              <option name="Parrilla" value="false">
                NO
              </option>
            </select>

            <select
              onChange={(e) => handleSelect(e)}
              name="Wifi"
              // value={cabain.Wifi}
              className={styles.formInputs}
              required
            >
              <option>Wifi:</option>
              <option name="Wifi" value="true">
                SI
              </option>
              <option name="Wifi" value="false">
                NO
              </option>
            </select>
            <button type="submit" >
              Crear
            </button>
          </form>
        </div>
        {/* EDITAR */}
        {mostrar ? (
          <div className={styles.crearCont}>
            <div className={styles.title}>Editar Cabaña</div>
            <form className={styles.form} onSubmit={handlePrueba}>
              <div>
                Nº De Cabaña:
                <input
                  type="text"
                  name="Number"
                  value={edit.Number}
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Numero de Cabaña"
                  max="20"
                  id={styles.id1}
                  required
                />
              </div>
              <div>
                Cantidad de Camas:
                <input
                  type="number"
                  name="Capacity"
                  value={edit.Capacity}
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Numero de Camas"
                  max="10"
                  id={styles.id2}
                  required
                />
              </div>
              <div>
                Costo por Noche:
                <input
                  type="number"
                  name="Price"
                  value={edit.Price}
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Precio"
                  id={styles.id3}
                  max="50000"
                  required
                />
              </div>
              <div className={styles.descripcion}>
                Descripción:
                <textarea
                  type="text"
                  name="Description"
                  value={edit.Description}
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Descripción..."
                  maxLength="500"
                  className={styles.formInputs}
                  id={styles.descripcionEditar}
                  required
                />
              </div>
              <select name="Picture" onChange={(e) => handleSelectedit(e)}>
                <option>Seleccione Imagen:</option>
                {allFotos.map((el) => {
                  return (
                    <option name="Picture" value={el.Url}>
                      {el.Description}
                    </option>
                  );
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
                <option value="true">SI</option>
                <option value="false">NO</option>
              </select>
              <select
                onChange={(e) => handleSelectedit(e)}
                // value={edit.Parrilla}
                className={styles.formInputs}
                name="Parrilla"
                required
              >
                <option>Parrilla:</option>
                <option value="true">SI</option>
                <option value="false">NO</option>
              </select>
              <select
                onChange={(e) => handleSelectedit(e)}
                // value={edit.Wifi}
                className={styles.formInputs}
                id={styles.lastSelect}
                name="Wifi"
                required
              >
                <option>Wifi:</option>
                <option value="true">SI</option>
                <option value="false">NO</option>
              </select>
            </form>
            <div className={styles.btnsGuarCanc}>
              <button onClick={handlePrueba} id={styles.guardar}>Guardar cambios</button>
              <button
                onClick={() => {
                  if (mostrar) setMostrar(false);
                }}
                id={styles.cancelar}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : null}
        {/* VER */}
      </div>
      <div className={styles.containerCabañas}>
        {allCabains?.sort((a, b) => {
          if(parseInt(a.Number) < parseInt(b.Number)) return -1;
          if(parseInt(a.Number) > parseInt(b.Number)) return 1;
          return 1;
        }).map((el) => {
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
  );
};

export default Cabañas;
