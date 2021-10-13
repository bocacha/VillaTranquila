import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editProfile, editUsers, getUserData, Logeduser, Loguser } from "../../actions";
import styles from "./Profile.module.css";
import Navbar from "../Navbar/Navbar";
import { FaLongArrowAltRight, FaLock, FaUnlockAlt } from "react-icons/fa";
import { BsBook, BsPen, BsFillShieldLockFill } from "react-icons/bs";
import { ImCancelCircle } from 'react-icons/im';
import { GiCutDiamond } from 'react-icons/gi';
import { BiSave } from 'react-icons/bi';

export default function Profile(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Logeduser());
    }, [dispatch]);


    const user = useSelector((state) => state.user);
    const userid = user.userid;
    useEffect(() => {
        dispatch(getUserData(userid));
    }, [dispatch, userid]);

    const dataUser = useSelector((state) => state.userData);

    const [edit, setEdit] = useState({
        UserName: dataUser.UserName,
        FirstName: dataUser.FirstName,
        LastName: dataUser.LastName,
        Address: dataUser.Address,
        Phone: dataUser.Phone,
        Email: dataUser.Email,
        UserPassword: "",
    });

    const [mostrar, setMostrar] = useState(false);

    function handleMostrar(e) {
        e.preventDefault();
        if (mostrar) {
            setMostrar(false);
        } else {
            setMostrar(true);
        }
    }

    function handleSubmitEdit(e) {
        e.preventDefault();
        console.log("submit", edit)
        if (edit.UserPassword.length < 1) {
            return alert("Debe ingresar su contraseña para guardar los cambios");
        } else {
            const ID = user.userid;
            alert("Perfil editado con éxito");
            dispatch(editProfile(edit, ID));
            dispatch(Logeduser());
            setMostrar(false);
            alert("Edicion exitosa")
            window.location.reload();
        }
    }
    let objetosaArray =[]
if(dataUser.ReservationsHistory){
 const reservas = dataUser.ReservationsHistory.map(e=>{
   const {Show, ID, UserId, ...history} = e
   console.log(history)
   objetosaArray.push(Object.entries(history))
 })
}

    function handleChangeEdit(e) {
        setEdit({
            ...edit,
            UserName: edit.UserName || dataUser.UserName,
            FirstName: edit.FirstName || dataUser.FirstName,
            LastName: edit.LastName || dataUser.LastName,
            Address: edit.Address || dataUser.Address,
            Phone: edit.Phone || dataUser.Phone,
            Email: edit.Email || dataUser.Email,
            [e.target.name]: e.target.value,
        });
    }

    const [nuevaCont, setNuevaCont] = useState('');

    function handleChangeContraseña(e) {
        e.preventDefault();
        setNuevaCont(e.target.value);
    }

    const [repetida, setRepetida] = useState('');

    function handleChangeRepetida(e) {
        e.preventDefault();
        setRepetida(e.target.value)
    }

    // function handleConfirmarNuevaContraseña(e){
    //     if(nuevaCont === repetida){
    //         const cambios = {
    //             passwordNueva: nuevaCont,
    //             id: dataUser.ID,
    //         }
    //         dispatch(editUsers(cambios));
    //     }
    //     else{
    //         e.preventDefault();

    //         alert('Error de tipeo, vuelva a introducir su nueva contraseña');
    //     }
    // }

    const [mostrarContraseña, setMostrarContraseña] = useState(false);

    function handleMostrarContraseña(e) {
        e.preventDefault();
        if (mostrarContraseña) {
            setMostrarContraseña(false);
        } else {
            setMostrarContraseña(true);
        }
    }

    function handleConfirmarNuevaContraseña(e) {
        const cambios = {
            UserPassword: nuevaCont,
            id: dataUser.ID,
        }
        if (nuevaCont === repetida) {
            if (nuevaCont.length < 1) {
                return alert("Debe ingresar su contraseña para guardar la nueva contraseña");
            } else {
                alert("Contraseña modificada con éxito");
                dispatch(editUsers(cambios));
                // dispatch(Logeduser());
                setMostrar(false);
                //window.location.reload();
            }
        }
        else {
            e.preventDefault();
            alert('Error de tipeo, vuelva a introducir su nueva contraseña');
        }
    };

    return (
        <div className={styles.perfil}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.containerDatos}>
                    <div className={styles.botones}>
                        <button className={styles.editarPerfil} onClick={handleMostrar}>
                            {mostrar ? (
                                <div><strong>Cancelar <p><ImCancelCircle /></p></strong></div>
                            ) : (
                                <div>
                                    <strong>Editar datos <p><BsPen /></p></strong>
                                </div>
                            )}
                        </button>
                        <button className={styles.editarPerfil} onClick={handleMostrarContraseña}>
                            {mostrarContraseña ? (
                                <div><strong>Cancelar <p><FaUnlockAlt/></p></strong></div>
                            ) : (
                                <div><strong>Cambiar contraseña <p><FaLock /></p></strong></div>
                            )}
                        </button>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td className={styles.izqu}>Nombre de usuario:</td>
                                <td className={styles.der}>{dataUser.UserName}</td>
                            </tr>
                            <tr>
                                <td className={styles.izqu}>Nombre:</td>
                                <td className={styles.der}>{dataUser.FirstName}</td>
                            </tr>
                            <tr>
                                <td className={styles.izqu}>Apellido:</td>
                                <td className={styles.der}>{dataUser.LastName}</td>
                            </tr>
                            <tr>
                                <td className={styles.izqu}>Dirección:</td>
                                <td className={styles.der}>{dataUser.Address}</td>
                            </tr>
                            <tr>
                                <td className={styles.izqu}>Teléfono:</td>
                                <td className={styles.der}>{dataUser.Phone}</td>
                            </tr>
                            <tr>
                                <td className={styles.izqu}>E-mail:</td>
                                <td className={styles.der}>{dataUser.Email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <details>
                        <summary>Historial de reservas</summary>
                        <Link to={`/${user.user}/${user.userid}`}>
                        <button className={styles.editarPerfil} >Ver y editar mis reservaciones</button>
                         </Link>
                        {dataUser.ReservationsHistory &&
            dataUser.ReservationsHistory.length ? (
              <ul>
                {objetosaArray.map((el) => {
                return <ul>{el.map(e=>{
                  return <li>{e[0]}:{e[1]}</li>
                })}</ul>;
              })
}
              </ul>
              
            ) : (
              <div>
                <span>
                  Conviertete en cliente Premium completando tu primer reserva{" "}
                  <FaLongArrowAltRight />
                </span>
                <Link to="/reserva">
                  <button>
                    {" "}
                    <BsBook />{" "}
                  </button>
                </Link>
              </div>
            )}
                    </details>
                    <div className={styles.premium}>
                        {dataUser.Premium ? (
                            <span>Usuario Premium <GiCutDiamond className={styles.diamond} /></span>
                        ) : (
                            <div>
                                <span>
                                    Conviertete en cliente Premium completando tu primer reserva <FaLongArrowAltRight />
                                </span>
                                <Link to="/reserva">
                                    <button className={styles.botonPrem} >
                                        <BsBook />
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {mostrar ? (
                    <div className={styles.editarCont}>
                        <div className={styles.title}><strong> Editar perfil</strong></div>
                        <form className={styles.form} onSubmit={(e) => handleSubmitEdit(e)}>
                            <input
                                type="text"
                                defaultValue={dataUser.UserName}
                                name="UserName"
                                onChange={(e) => handleChangeEdit(e)}
                                placeholder="Nuevo nombre de usuario..."
                                className={styles.formInputs}
                                title='Debe contener mayusculas minusculas y numeros '
                                pattern='^[0-9a-zA-Z\s]+$'
                                required
                            />
                            <input
                                type="text"
                                defaultValue={dataUser.FirstName}
                                name="FirstName"
                                onChange={(e) => handleChangeEdit(e)}
                                placeholder="Nuevo nombre..."
                                className={styles.formInputs}
                                title='Solo letras'
                                pattern='[a-zA-Z ]{2,254}'
                                required
                            />
                            <input
                                type="text"
                                defaultValue={dataUser.LastName}
                                name="LastName"
                                onChange={(e) => handleChangeEdit(e)}
                                placeholder="Nuevo apellido..."
                                className={styles.formInputs}
                                title='Solo letras'
                                pattern='[a-zA-Z ]{2,254}'
                                required
                            />
                            <input
                                type="text"
                                defaultValue={dataUser.Address}
                                name="Address"
                                onChange={(e) => handleChangeEdit(e)}
                                placeholder="Nueva dirección..."
                                className={styles.formInputs}
                                title='Debe contener mayusculas minusculas y numeros '
                                pattern='^[0-9a-zA-Z\s]+$'
                                required
                            />
                            <input
                                type="text"
                                defaultValue={dataUser.Phone}
                                name="Phone"
                                onChange={(e) => handleChangeEdit(e)}
                                placeholder="Nuevo teléfono..."
                                className={styles.formInputs}
                                pattern="[+]{2}[0-9]{10-14}"
                                placeholder="+54 9 11 12345678" 
                                required
                            />
                            <input
                                type="text"
                                defaultValue={dataUser.Email}
                                name="Email"
                                onChange={(e) => handleChangeEdit(e)}
                                placeholder="Nuevo email..."
                                className={styles.formInputs}
                                pattern='^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$'
                                required
                            />
                            <input
                                type="password"
                                defaultValue={edit.UserPassword}
                                name="UserPassword"
                                onChange={(e) => handleChangeEdit(e)}
                                placeholder="Introduzca su contraseña actual"
                                className={styles.formInputs}
                                required
                            />
                            <button
                                type="submit"
                                className={styles.editarPerfil}
                                id={styles.guardar}
                            >
                                Guardar cambios <p><BiSave /></p>
                            </button>
                        </form>
                    </div>
                ) : null}
                {mostrarContraseña ?
                    (<div className={styles.editarCont}>
                        <form onSubmit={handleConfirmarNuevaContraseña}>
                            <label className={styles.title}><strong>Cambiar contraseña:</strong></label>
                            <input
                                type="password"
                                defaultValue={edit.UserPassword}
                                onChange={(e) => handleChangeEdit(e)}
                                placeholder="Introduzca su contraseña actual"
                                className={styles.formInputs}
                                required
                            />
                            <input
                                type='password'
                                className={styles.formInputs}
                                placeholder='Nueva contraseña...'
                                onChange={handleChangeContraseña}
                                required
                            />
                            <input
                                type='password'
                                className={styles.formInputs}
                                placeholder='Repetir nueva contraseña...'
                                onChange={handleChangeRepetida}
                                required
                            />
                            <button type='submit' className={styles.editarPerfil} id={styles.contra}>
                                Guardar nueva contraseña <p><BsFillShieldLockFill /></p>
                            </button>
                        </form>
                    </div>
                    ) : null}
            </div>
        </div>
    );
}
