import React, { useState, useEffect } from "react";
import styles from "./Fotos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createimage, readPictures, editPictures, Logeduser,readPicturesocultados} from "../../../actions";
import FotosDetail from "./FotosDetail";
import { Link } from "react-router-dom";

export default function Fotos() {
  const dispatch = useDispatch();
  const allPictures = useSelector((state) => state.fotos);
  const logeduser = useSelector((state) => state.user);
  const [habilitar, setHabilitar]= useState(false)
  console.log(allPictures);
  const [input, setInput] = useState({
    Description: "",
    Url: "",
  });
  const [edit, setEdit] = useState({
    id: "",
    Description: "",
    Url: "",
  });
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(readPictures());
  }, [dispatch]);

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

  function handleSubmit(e) {
    const { token } = logeduser;
    e.preventDefault();
    dispatch(createimage(input, { token }));
    alert("Foto creada con éxito");
    setInput({
      Description: "",
      Url: "",
    });
    window.location.reload();
  }
  function handleSubmitEdit(e) {
    e.preventDefault();
    dispatch(editPictures(edit));
    alert("Foto editada con éxito");
    setEdit({
      id: "",
      Description: "",
      Url: "",
    });
    window.location.reload();
  }
const ocultadas=() => {
  dispatch(readPicturesocultados())
  setHabilitar(true)
}
const showtrue=()=>{
  dispatch(readPictures())
  setHabilitar(false)
}
  return (
    <div className={styles.container}>
      <div className={styles.btnVolver}>
        <Link to="/admin">
          <button className={styles.btn}>Volver</button>
        </Link>
      </div>
      <div className={styles.formsCont}>
      {!habilitar ?(
            <button onClick={ocultadas}>Mostrar ocultadas</button>
          ):(
            <button onClick={showtrue}>Mostrar habilitadas</button>
          )
          }
        {/* CREAR */}
        <div className={styles.crearCont}>
          <div className={styles.title}> Crear una nueva foto</div>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <input
              type="text"
              value={input.Description} 
              maxLength="100"
              name="Description"
              onChange={(e) => handleChange(e)}
              placeholder="Descripción"
              className={styles.formInputs}
              required
            />
            <input
              type="text"
              value={input.Url}
              name="Url"
              onChange={(e) => handleChange(e)}
              placeholder="Url"
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
          <div className={styles.title}> Editar una nueva foto</div>
          <form onSubmit={(e) => handleSubmitEdit(e)} className={styles.form}>
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
              value={edit.Description}
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
            <div className={styles.btns}>
              <button type="submit" className={styles.btn}>
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {allPictures?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <FotosDetail
                Description={el.Description}
                Url={el.Url}
                ID={el.ID}
                restaurar={habilitar}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
