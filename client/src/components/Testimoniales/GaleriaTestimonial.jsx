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
      <div className={styles.containerNav}>
        <Navbar />
      </div>
      <div className={styles.container}>
        {allTestimonials.length !== 0 ? (
          <div className={styles.grilla} >
            {allTestimonials.map((expe, id) => {
              return (
                <div>
                  <div key={id} className={styles.containerTestimoniales}>
                    <h3>Nombre : {expe.Name} </h3>
                    <p className={styles.descrip}> {expe.Description} </p>
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
          </div>
        ) : (
          <div className={styles.noHay}>
            <h3>No hay testimoniales para mostrar</h3>
            <div>
              <button onClick={handleVolver} className={styles.btnPlus}>Volver</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GaleriaTestimonial;
