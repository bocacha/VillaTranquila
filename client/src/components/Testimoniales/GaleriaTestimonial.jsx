import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./GaleriaTestimonial.module.css";
import { getTestimonials } from "../../actions";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const GaleriaTestimonial = () => {
  const allTestimonials = useSelector((state) => state.testimoniales);
  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);
  const handleVolver = (e) => {
    e.preventDefault(e);
    history.push("/");
  };

  var array = [1, 2, 3, 4, 5];
  return (
    <div className={styles.containerForm}>
      {/* <Navbar /> */}
      <div className={styles.container}>
        {allTestimonials.length !== 0 ? (
          <div>
            {allTestimonials.map((expe, id) => {
              return (
                <div>
                  <div key={id} className={styles.container}>
                    <h3>Nombre : {expe.Name} </h3>
                    <p>Descripcion : {expe.Description} </p>
                    <div className={styles.arrayStar}>
                      {array.map((la) => {
                        return (
                          <div>
                            {la <= allTestimonials[id].Stars ? (
                              <div className={styles.paint}>
                                <p>★</p>
                              </div>
                            ) : (
                              <div>
                                <p>☆</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              <button onClick={handleVolver}>Volver</button>
            </div>
          </div>
        ) : (
          <div>
            <h3>No hay testimoniales para mostrar</h3>
            <div>
              <button onClick={handleVolver}>Volver</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GaleriaTestimonial;

