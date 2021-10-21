import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTestimonials, removeFeedback, restoreFeedback, readFeedbackocultados, Logeduser } from "../../../actions";
import styles from '../Testimonial/TestimonialAdmin.module.css';
import { useHistory } from 'react-router-dom';
import NavAdmin from '../NavAdmin/NavAdmin';
import Navbar from "../../Navbar/Navbar";


const Testimonial = () => {

  const allTestimonials = useSelector((state) => state.testimoniales);
  const [habilitar, setHabilitar] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  var array = [1, 2, 3, 4, 5]

  const handleSubmitDelete = (ID) => {
    dispatch(removeFeedback({ id: ID }));
    alert("su Reseña fue Eliminada con exito");
    setTimeout(function () {
      history.go(0);
    }, 1000)
  };

  const handleSubmitrestore = (ID) => {
    dispatch(restoreFeedback({ id: ID }));
    alert("su reseña fue restaurada con exito");
    setTimeout(function () {
      history.go(0);
    }, 1000)
  }

  const ocultadas = () => {
    dispatch(readFeedbackocultados());
    setHabilitar(true);
  };
  const showtrue = () => {
    dispatch(getTestimonials());
    setHabilitar(false);
  };
  return (
    <div className={styles.testimAdmin}>
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
        {!habilitar ?
          <button onClick={() => ocultadas()} className={styles.btnSup}>Mostrar Ocultas</button>
          :
          <button onClick={() => showtrue()} className={styles.btnSup}>Mostrar Habilitadas</button>
        }
      </div>
      {allTestimonials.length !== 0
        ?
        <div className={styles.grid}>
          {
            allTestimonials.map((expe, i) => {

              return (
                <div className={styles.container}>
                  <div key={i} className={styles.infoContainer}>
                    <h3>Nombre : {expe.Name} </h3>
                    <p>{expe.Description} </p>
                    <div className={styles.arrayStar}>
                      {array.map((la) => {
                        return (
                          <div>
                            {(la <= allTestimonials[i].Stars) ?
                              <div className={styles.paint}><p>★</p></div>
                              :
                              <div><p>☆</p></div>}
                          </div>)

                      })}
                    </div>
                  </div>
                  {!habilitar
                    ?
                    <div>
                      <button onClick={() => handleSubmitDelete(expe.ID)} className={styles.btn}>Ocultar</button>
                    </div>
                    :
                    <div>
                      <button onClick={() => handleSubmitrestore(expe.ID)} className={styles.btn}>Restaurar</button>
                    </div>
                  }

                </div>
              )
            })}


        </div>
        :
        <div>
          <h3>No hay Reseñas para mostrar</h3>

        </div>
      }
    </div>

  );
}

export default Testimonial;