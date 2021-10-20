import React, { useState, useEffect } from "react";
import styles from "./Fotos.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createimage,
  readPictures,
  editPictures,
  Logeduser,
  readPicturesocultados,
  readCabains,
} from "../../../actions";
import FotosDetail from "./FotosDetail";
import Upload from "../../Reserva/Upload/Upload";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import NavAdmin from "../NavAdmin/NavAdmin";
import Navbar from "../../Navbar/Navbar";

export default function Fotos() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allPictures = useSelector((state) => state.fotos);
  const allCabains = useSelector((state) => state.cabañas);
  const logeduser = useSelector((state) => state.user);
  const [habilitar, setHabilitar] = useState(false);
  const [description, setDescription] = useState("");
  const [cabainNumber, setCabainNumber] = useState("");
  const [file, setFile] = useState({});
  const [edit, setEdit] = useState({
    id: "",
    Description: "",
    CabainNumber: "",
    Url: "",
  });
  const [mostrar, setMostrar] = useState(false);
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(readPictures());
  }, [dispatch]);

  useEffect(() => {
    dispatch(readCabains());
  }, [dispatch]);

  function handleChangeEdit(e) {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    const { token } = logeduser;
    e.preventDefault();
    dispatch(
      createimage(
        {
          description,
          cabainNumber,
          file,
        },
        { token }
      )
    );
    alert("Foto creada con éxito");
    setTimeout(function() {
      history.go(0);
    }, 2000);
    // window.location.reload();
    //
  }
  function handleSubmitEdit(e, Description, CabainNumber, Url, ID) {
    e.preventDefault();
    setMostrar(true);
    setEdit({
      ...edit,
      id: ID,
      Description: Description,
      CabainNumber: CabainNumber,
      Url: Url,
    });
  }
  function handlePrueba(e, ID) {
    e.preventDefault();
    const { token } = logeduser;
    dispatch(editPictures(edit, { token }));
    // setEdit({
    //   ...edit,
    //   id: ID
    // })
    alert("Foto editada con éxito");
    window.location.reload();
  }
  const ocultadas = () => {
    dispatch(readPicturesocultados());
    setHabilitar(true);
  };
  const showtrue = () => {
    dispatch(readPictures());
    setHabilitar(false);
  };

  console.log("cabain number", cabainNumber);

  return (
    <div className={styles.container}>
      <div className={styles.navs2}>
        <div className={styles.navs}>
          <Navbar />
          <NavAdmin className={styles.navAdmin} />
        </div>
        <div className={styles.navRsp}>
          <Navbar />
        </div>
      </div>
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
      <div className={styles.container2}>
        <div className={styles.formsCont}>
            {/* CREAR */}
            <div className={styles.crearCont}>
              <div className={styles.title}> Crear una nueva foto</div>
              <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <input
                  type="text"
                  maxLength="100"
                  name="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Descripción"
                  className={styles.formInputs}
                  required
                />
                <label>Seleccione una cabaña para asociar a la imagen:</label>
                <select
                  name="CabainNumber"
                  onChange={(e) => {
                    setCabainNumber(e.target.value);
                  }}
                >
                  <option>Cabaña N°</option>
                  {allCabains.map((c) => {
                    return <option name="CabainNumber">{c.Number}</option>;
                  })}
                </select>
                <input
                  type="file"
                  name="File"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  className={styles.formInputs}
                  id={styles.btnSupp}
                  required
                />

                {/* Subir Imagen */}

                {/* <Upload /> */}

                <div className={styles.btns}>
                  <button type="submit" className={styles.btn} id={styles.crearB}>
                    Crear
                  </button>
                </div>
              </form>
              <div className={styles.btnsGuarCanc}>
                <button onClick={handlePrueba} id={styles.guardar}>Guardar cambios</button>
                <button
                  onClick={() => mostrar && setMostrar(false)}
                  id={styles.cancelar}
                >
                  Cancelar
                </button>
              </div>
            </div>
            {/* EDITAR */}
            {mostrar ? (
              <div className={styles.crearCont}>
                <div className={styles.title}> Editar una nueva foto</div>
                <form className={styles.form}>
                  {/*  <input
              type="text"
              value={edit.id}
              name="id"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Id"
              className={styles.formInputs}
            /> */}
                  <input
                    type="text"
                    defaultValue={edit.Description}
                    name="Description"
                    onChange={(e) => handleChangeEdit(e)}
                    placeholder="Descripción"
                    className={styles.formInputs}
                  />

                  <label>Seleccione una cabaña para asociar a la imagen:</label>
                  <select
                    name="CabainNumber"
                    onChange={(e) => {
                      handleChangeEdit(e);
                    }}
                  >
                    <option>Cabaña N°</option>
                    {allCabains.map((c) => {
                      return <option name="CabainNumber">{c.Number}</option>;
                    })}
                  </select>

                  <input
                    type="text"
                    value={edit.Url}
                    name="Url"
                    onChange={(e) => handleChangeEdit(e)}
                    placeholder="Url"
                    className={styles.formInputs}
                  />
                </form>
                <div className={styles.btnsGuarCanc}>
                  <button onClick={handlePrueba} id={styles.guardar}>
                    Guardar cambios
                  </button>
                  <button
                    onClick={() => mostrar && setMostrar(false)}
                    id={styles.cancelar}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : null}
        </div>
        <div className={styles.containerDetalles}>
          {allPictures?.map((el) => {
            return (
              <div className={styles.detalles} key={el.ID}>
                <FotosDetail
                  ID={el.ID}
                  Description={el.Description}
                  CabainNumber={el.CabainNumber}
                  Url={el.Url}
                  handleSubmitEdit={handleSubmitEdit}
                  handlePrueba={handlePrueba}
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
