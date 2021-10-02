import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCabains, readCabains,editCabains, Logeduser } from "../../../actions";
import styles from "./Cabañas.module.css";
import CabañasDetail  from "../Cabañas/CabañasDetail";
import { Link } from "react-router-dom";


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
  const [edit, setEdit] = useState({
    id: "",
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


  useEffect(() => {
    dispatch(Logeduser());
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

  const handleCheckBox = (e) => {
    setCabain({
      ...cabain,
      [e.target.name]: true,
    });
  };
  const handleeditCheckBox = (e) => {
    setEdit({
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
  const handleeditSubmit = (e) => {
    const {token} = logeduser
    e.preventDefault();
    alert("su cabaña fue creada con exito");
    dispatch(editCabains(edit,{token}));
  };

  return (
    <div>
      <div className={styles.btnVolver}>
        <Link to="/admin"><button>Volver</button></Link>
      </div>
      Crear Cabaña
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
       {/* EDITAR */}
       Editar Cabaña
       <form onSubmit={handleeditSubmit}>
       <div>
          <label>id</label>
          <input
            type="text"
            name="id"
            value={edit.id}
            onChange={handleChangeEdit}
          />
        </div>
        <div>
          <label>Numero de Personas</label>
          <input
            type="text"
            name="Number"
            value={edit.Number}
            onChange={handleChangeEdit}
          />
        </div>
        <div>
          <label>Capacidad</label>
          <input
            type="number"
            name="Capacity"
            value={edit.Capacity}
            onChange={handleChangeEdit}
          />
        </div>
        <div>
          <label>Disponibilidad</label>
          <input
            type="text"
            name="Available"
            value={edit.Available}
            onChange={handleChangeEdit}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            name="Price"
            value={edit.Price}
            onChange={handleChangeEdit}
          />
        </div>
        <div>
          <label>Descripcion</label>
          <input
            type="text"
            name="Description"
            value={edit.Description}
            onChange={handleChangeEdit}
          />
        </div>
        <div>
          <label>Cafe</label>
          <input
            type="checkbox"
            name="Coffe"
            value={edit.Coffe}
            onChange={handleeditCheckBox}
          />
          <label>Microondas</label>
          <input
            type="checkbox"
            name="Microondas"
            value={edit.Microondas}
            onChange={handleeditCheckBox}
          />
          <label>Calefaccion</label>
          <input
            type="checkbox"
            name="Calefaccion"
            value={edit.Calefaccion}
            onChange={handleeditCheckBox}
          />
          <label>Parrilla</label>
          <input
            type="checkbox"
            name="Barbecue"
            value={edit.Barbecue}
            onChange={handleeditCheckBox}
          />
          <label>Wifi</label>
          <input
            type="checkbox"
            name="Wifi"
            value={edit.Wifi}
            onChange={handleeditCheckBox}
          />
          <label>Limpieza</label>
          <input
            type="checkbox"
            name="Cleaning"
            value={edit.Cleaning}
            onChange={handleeditCheckBox}
          />
          <label>Heladera</label>
          <input
            type="checkbox"
            name="Refrigerator"
            value={edit.Refrigerator}
            onChange={handleeditCheckBox}
          />
          <label>Cocina</label>
          <input
            type="checkbox"
            name="Stove"
            value={edit.Stove}
            onChange={handleeditCheckBox}
          />
          <label>Estacionamiento</label>
          <input
            type="checkbox"
            name="Parking"
            value={edit.Parking}
            onChange={handleeditCheckBox}
          />
        </div>
        <div>
          <input type="submit" value="Edit" />
        </div>
      </form>


      {/* VER */}
      <div>
        {allCabains?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <CabañasDetail
                ID={el.ID}
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