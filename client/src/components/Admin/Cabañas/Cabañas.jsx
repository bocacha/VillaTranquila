import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCabains, readCabains } from "../../../actions";
import styles from "./Cabañas.module.css";
import CabañasDetail  from "../Cabañas/CabañasDetail";

const Cabañas = () => {
  const dispatch = useDispatch();
  const allCabains = useSelector((state) => state.cabañas);
  const logeduser = useSelector ((state) => state.user);
  
  const [cabain, setCabain] = useState({
    Number: "",
    Capacity: "",
    Available: "",
    Price: "",
    Description: "",
    Coffe: false,
    Microondas: false,
    Calefaccion: false,
    Barbecue: false,
    Wifi: false,
    Cleaning: false,
    Refrigerator: false,
    Stove: false,
    Parking: false,
  });

  useEffect(() => {
    dispatch(readCabains());
  }, [dispatch]);

  const handleChange = (e) => {
    setCabain({
      ...cabain,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckBox = (e) => {
    setCabain({
      ...cabain,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e) => {
    const {token} = logeduser
    e.preventDefault();
    alert("su cabaña fue creada con exito");
    dispatch(createCabains(cabain,{token}));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Numero de Personas</label>
          <input
            type="text"
            name="Number"
            value={cabain.Number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Capacidad</label>
          <input
            type="number"
            name="Capacity"
            value={cabain.Capacity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Disponibilidad</label>
          <input
            type="text"
            name="Available"
            value={cabain.Available}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            name="Price"
            value={cabain.Price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripcion</label>
          <input
            type="text"
            name="Description"
            value={cabain.Description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cafe</label>
          <input
            type="checkbox"
            name="Coffe"
            value={cabain.Coffe}
            onChange={handleCheckBox}
          />
          <label>Microondas</label>
          <input
            type="checkbox"
            name="Microondas"
            value={cabain.Microondas}
            onChange={handleCheckBox}
          />
          <label>Calefaccion</label>
          <input
            type="checkbox"
            name="Calefaccion"
            value={cabain.Calefaccion}
            onChange={handleCheckBox}
          />
          <label>Parrilla</label>
          <input
            type="checkbox"
            name="Barbecue"
            value={cabain.Barbecue}
            onChange={handleCheckBox}
          />
          <label>Wifi</label>
          <input
            type="checkbox"
            name="Wifi"
            value={cabain.Wifi}
            onChange={handleCheckBox}
          />
          <label>Limpieza</label>
          <input
            type="checkbox"
            name="Cleaning"
            value={cabain.Cleaning}
            onChange={handleCheckBox}
          />
          <label>Heladera</label>
          <input
            type="checkbox"
            name="Refrigerator"
            value={cabain.Refrigerator}
            onChange={handleCheckBox}
          />
          <label>Cocina</label>
          <input
            type="checkbox"
            name="Stove"
            value={cabain.Stove}
            onChange={handleCheckBox}
          />
          <label>Estacionamiento</label>
          <input
            type="checkbox"
            name="Parking"
            value={cabain.Parking}
            onChange={handleCheckBox}
          />
        </div>
        <div>
          <input type="submit" value="Crear" />
        </div>
      </form>
      {/* VER */}
      <div>
        {allCabains?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <CabañasDetail
                Number={el.Number}
                Capacity={el.Capacity}
                Available={el.Available}
                Price={el.Price}
                Description={el.Description}
                Coffe={el.Coffe}
                Microondas={el.Microondas}
                Calefaccion={el.Calefaccion}
                Barbecue={el.Barbecue}
                Wifi={el.Wifi}
                Cleaning={el.Cleaning}
                Refrigerator={el.Refrigerator}
                Stove={el.Stove}
                Parking={el.Parking}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cabañas;
