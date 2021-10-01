import React, { useState, useEffect } from "react";
import styles from "./Fotos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createimage, readPictures } from "../../../actions";
import FotosDetail from "./FotosDetail";

export default function Fotos() {
  const dispatch = useDispatch();
  const allPictures = useSelector((state) => state.fotos);
  const logeduser = useSelector ((state) => state.user);
  console.log(allPictures);
  const [input, setInput] = useState({
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

  return (
    <div className={styles.container}>
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
      <div>
        {allPictures?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <FotosDetail Description={el.Description} Url={el.Url} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
