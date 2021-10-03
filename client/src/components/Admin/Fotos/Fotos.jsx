import React, { useState, useEffect } from "react";
import styles from "./Fotos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createimage, readPictures, editPictures } from "../../../actions";
import FotosDetail from "./FotosDetail";
import { Link } from "react-router-dom";

export default function Fotos() {
  const dispatch = useDispatch();
  const allPictures = useSelector((state) => state.fotos);
  const logeduser = useSelector ((state) => state.user);
  console.log(allPictures);
  const [input, setInput] = useState({
    Description: "",
    Url: "",
  });
  const [edit, setEdit] = useState({
    id:"",
    Description: "",
    Url: "",
  });

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
    const {token} = logeduser
    e.preventDefault();
    dispatch(createimage(input, {token}));
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
      id:"",
      Description: "",
      Url: "",
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
        Crear una nueva foto
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={input.Description}
            name="Description"
            onChange={(e) => handleChange(e)}
            placeholder="Description"
            className={styles.Description}
          />
          <input
            type="text"
            value={input.Url}
            name="Url"
            onChange={(e) => handleChange(e)}
            placeholder="Url"
            className={styles.Url}
          />
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Crear
            </button>
          </div>
        </form>
      </div>
      {/* EDITAR */}
      <div>
        Editar una nueva foto
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
            value={edit.Description}
            name="Description"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="Description"
            className={styles.Description}
          />
          <input
            type="text"
            value={edit.Url}
            name="Url"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="Url"
            className={styles.Url}
          />
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Editar
            </button>
          </div>
        </form>
      </div>
      <div>
        {allPictures?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <FotosDetail Description={el.Description} Url={el.Url} ID={el.ID} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
