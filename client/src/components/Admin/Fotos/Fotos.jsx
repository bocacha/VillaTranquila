import React, { useState, useEffect } from "react";
import styles from "./Fotos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createimage, readPictures, editPictures, Logeduser, readPicturesocultados } from "../../../actions";
import FotosDetail from "./FotosDetail";
import Upload from "../../Reserva/Upload/Upload";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function Fotos() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allPictures = useSelector((state) => state.fotos);
  const logeduser = useSelector((state) => state.user);
  const [habilitar, setHabilitar] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState({});
  const [edit, setEdit] = useState({
    id: "",
    Description: "",
    Url: "",
  });
  const [mostrar, setMostrar] = useState(false);
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(readPictures());
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
          file,
        },
        { token }
      )
    );
    alert("Foto creada con éxito");
    setTimeout(function () {
      history.go(0);
    }, 2000)
    // window.location.reload();
    //
  }
  function handleSubmitEdit(e, ID) {
    e.preventDefault();
    setMostrar(true);
    setEdit({
      ...edit,
      id: ID
    })
    handledispatch()
  }
  const handledispatch=()=>{
    const { token } = logeduser;
    dispatch(editPictures(edit, { token }));
  }

 function handlePrueba(e, ID) {
    e.preventDefault();
    const { token } = logeduser;
    dispatch(editPictures(edit, { token }));
    alert("Foto editada con éxito");
    setEdit({
      ...edit,
      id: ID
    })
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
              <input
                type="file"
                name="File"
                onChange={(e) => {
                  setFile(e.target.files[0])
                }}
                className={styles.formInputs}
                required
              />

              {/* Subir Imagen */}

              {/* <Upload /> */}

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
                <input
                  type="text"
                  value={edit.Url}
                  name="Url"
                  onChange={(e) => handleChangeEdit(e)}
                  placeholder="Url"
                  className={styles.formInputs}
                />
              </form>
            </div>
          ) : null}
          <div>
            {allPictures?.map((el) => {
              return (
                <div className={styles.detalles} key={el.ID}>
                  <FotosDetail
                    ID={el.ID}
                    Description={el.Description}
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
    </div>
  );
}