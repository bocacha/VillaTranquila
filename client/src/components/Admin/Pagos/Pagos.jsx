// import React, { useState, useEffect } from "react";
// import styles from "./Pagos.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createPayment,
//   readPayment,
//   editPayments,
//   Logeduser,
//   readPaymentocultados,
// } from "../../../actions";
// import PagosDetail from "./PagosDetail";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Link } from "react-router-dom";
// import NavAdmin from '../NavAdmin/NavAdmin';
// import Navbar from "../../Navbar/Navbar";
// // import { Link } from "react-router-dom";

// export default function Pagos() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(Logeduser());
//   }, [dispatch]);
//   const [habilitar, setHabilitar] = useState(false);
//   const logeduser = useSelector((state) => state.user);
//   const { token } = logeduser;

//   useEffect(() => {
//     dispatch(readPayment({ token }));
//   }, [dispatch, token]);

//   const allPayments = useSelector((state) => state.pagos);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const [input, setInput] = useState({
//     user: "",
//     status: "",
//     status_detail: "",
//     transaction_detail: {
//         pagoTotal: "",
//         pagoNeto: ""
//     },
//     id_reserva: "",
//     fecha: ""
    
//   });
//   const [mostrar, setMostrar] = useState(false);

//   const [edit, setEdit] = useState({
//     user: "",
//     status: "",
//     status_detail: "",
//     transaction_detail: {
//         pagoTotal: "",
//         pagoNeto: ""
//     },
//     id_reserva: "",
//     fecha: ""
//   });

//   function handleChange(e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   }
//   function handleChangeEdit(e) {
//     //console.log(e.target.name);
//     //console.log(e.target.value);
//     setEdit({
//       ...edit,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleSubmit(e) {
//     const { token } = logeduser;
//     e.preventDefault();
//     dispatch(createPayment(input));
//     alert("Pago creado con éxito");
//     setInput({
//     ...input,
//         user: "",
//         status: "",
//         status_detail: "",
//         transaction_detail: {
//             pagoTotal: "",
//             pagoNeto: ""
//         },
//         id_reserva: "",
//         fecha: ""
//     });

//     //window.location.reload();
//   }
//   function handleSubmitEdit(e, ID,
//     user,
//     status,
//     status_detail,
//     transaction_detail,
//     id_reserva,
//     fecha,) {
//     e.preventDefault();
//     setMostrar(true);
//     setEdit({ ...edit, id: ID,status:status,transaction_detail:transaction_detail,fecha:fecha,id_reserva:id_reserva});
//     //dispatch(editPayments(edit, { token }));
//     setMostrar(true);
//   }

//   function handlePrueba(e, ID) {
//     //console.log(edit)
//     const { token } = logeduser;
//     e.preventDefault();
    
//     setMostrar(true);
//     //console.log(edit);
//     //setEdit({ ...edit, id: ID });
//     dispatch(editPayments(edit, { token }));

//    // window.location.reload();
//   }
//   const ocultadas = () => {
//     const { token } = logeduser;
//     dispatch(readPaymentocultados({ token }));
//     setHabilitar(true);
//   };
//   const showtrue = () => {
//     const { token } = logeduser;
//     dispatch(readPayment({ token }));
//     setHabilitar(false);
//   };
//   const changeFechas=(e)=>{
//     if(e === null){
//       return
//     }
//     setSelectedDate(e)
//     mostrarFecha(e);
//   }
//   const mostrarFecha = selectedDate =>{
//     //console.log(selectedDate);
//     const options = {year:'numeric', month:'numeric', day:'2-digit'}
//     setEdit({...edit,  Date: selectedDate.toLocaleDateString('es-ES', options)})
//   }
  
//   return (
//     <div className={styles.container}>
//       <div className={styles.navs2}>
//         <div className={styles.navs}>
//           <Navbar />
//           <NavAdmin className={styles.navAdmin} />
//         </div>
//         <div className={styles.navRsp}>
//           <Navbar />
//         </div>
//       </div>
//       <div className={styles.btnsContainer}>
//         {!habilitar ? (
//           <button onClick={ocultadas} className={styles.btnSup}>
//             Mostrar ocultadas
//           </button>
//         ) : (
//           <button onClick={showtrue} className={styles.btnSup}>
//             Mostrar habilitadas
//           </button>
//         )}
//       </div>
//       <div className={styles.containerDetalles}>
//           {/* VER */}
//             {allPayments.length !== 0 ?
//             allPayments.sort((a, b) => {
//               let fechaA = a.fecha.slice(0,10).split("-").reverse().join("/")
//               let fechaB = b.fecha.slice(0,10).split("-").reverse().join("/")
//               if(fechaA < fechaB) {
//                 return 1
//               } 
//               if(fechaA > fechaB) {
//                 return -1
//               }
//               return 1
//             }).map((el) => {
//               return (
//                 <div className={styles.detalles} key={el.ID}>
//                   <PagosDetail
//                     ID={el.ID}
//                     user ={el.user}
//                     status={el.status}
//                     status_detail={el.status_detail}
//                     transaction_detail={el.transaction_detail}
//                     id_reserva={el.id_reserva}
//                     fecha={el.fecha}
//                     handlePrueba={handlePrueba}
//                     handleSubmitEdit={handleSubmitEdit}
//                     restaurar={habilitar}
//                   />
//                 </div>
//               );
//             }): <div>No se realizó ningún pago aún</div>}
//         </div>
//     </div>
//   );
// }

       
import React, { useState, useEffect } from "react";
import styles from "./Pagos.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createPayment,
  readPayment,
  editPayments,
  Logeduser,
  readPaymentocultados,
} from "../../../actions";
import PagosDetail from "./PagosDetail";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import NavAdmin from '../NavAdmin/NavAdmin';
import Navbar from "../../Navbar/Navbar";
// import { Link } from "react-router-dom";

export default function Pagos() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  const [habilitar, setHabilitar] = useState(false);
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;

  useEffect(() => {
    dispatch(readPayment({ token }));
  }, [dispatch, token]);

  const allPayments = useSelector((state) => state.pagos);
  const [selectedDate, setSelectedDate] = useState(null);

  const [input, setInput] = useState({
    user: "",
    status: "",
    status_detail: "",
    transaction_detail: {
        pagoTotal: "",
        pagoNeto: ""
    },
    id_reserva: "",
    fecha: ""
    
  });
  const [mostrar, setMostrar] = useState(false);

  const [edit, setEdit] = useState({
    user: "",
    status: "",
    status_detail: "",
    transaction_detail: {
        pagoTotal: "",
        pagoNeto: ""
    },
    id_reserva: "",
    fecha: ""
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleChangeEdit(e) {
    //console.log(e.target.name);
    //console.log(e.target.value);
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    const { token } = logeduser;
    e.preventDefault();
    dispatch(createPayment(input));
    alert("Pago creado con éxito");
    setInput({
    ...input,
        user: "",
        status: "",
        status_detail: "",
        transaction_detail: {
            pagoTotal: "",
            pagoNeto: ""
        },
        id_reserva: "",
        fecha: ""
    });

    //window.location.reload();
  }
  function handleSubmitEdit(e, ID,
    user,
    status,
    status_detail,
    transaction_detail,
    id_reserva,
    fecha,) {
    e.preventDefault();
    setMostrar(true);
    setEdit({ ...edit, id: ID,status:status,transaction_detail:transaction_detail,fecha:fecha,id_reserva:id_reserva});
    //dispatch(editPayments(edit, { token }));
    setMostrar(true);
  }

  function handlePrueba(e, ID) {
    //console.log(edit)
    const { token } = logeduser;
    e.preventDefault();
    
    setMostrar(true);
    //console.log(edit);
    //setEdit({ ...edit, id: ID });
    dispatch(editPayments(edit, { token }));

   // window.location.reload();
  }
  const ocultadas = () => {
    const { token } = logeduser;
    dispatch(readPaymentocultados({ token }));
    setHabilitar(true);
  };
  const showtrue = () => {
    const { token } = logeduser;
    dispatch(readPayment({ token }));
    setHabilitar(false);
  };
  const changeFechas=(e)=>{
    if(e === null){
      return
    }
    setSelectedDate(e)
    mostrarFecha(e);
  }
  const mostrarFecha = selectedDate =>{
    //console.log(selectedDate);
    const options = {year:'numeric', month:'numeric', day:'2-digit'}
    setEdit({...edit,  Date: selectedDate.toLocaleDateString('es-ES', options)})
  }
  
  return (
    <div className={styles.container}>
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
        {!habilitar ? (
          <button onClick={ocultadas} className={styles.btnSup}>
            Mostrar ocultadas
          </button>
        ) : (
          <button onClick={showtrue} className={styles.btnSup}>
            Mostrar habilitadas
          </button>
        )}
      </div>
      <div className={styles.containerDetalles}>
          {/* VER */}
            {allPayments.length !== 0 ?
            allPayments.sort((a, b) => {
              let fechaA = a.fecha.slice(0,10).split("-").reverse().join("/")
              let fechaB = b.fecha.slice(0,10).split("-").reverse().join("/")
              if(fechaA < fechaB) {
                return 1
              } 
              if(fechaA > fechaB) {
                return -1
              }
              return 1
            }).map((el) => {
              return (
                <div className={styles.detalles} key={el.ID}>
                  <PagosDetail
                    ID={el.ID}
                    user ={el.user}
                    status={el.status}
                    status_detail={el.status_detail}
                    transaction_detail={el.transaction_detail}
                    id_reserva={el.id_reserva}
                    fecha={el.fecha}
                    handlePrueba={handlePrueba}
                    handleSubmitEdit={handleSubmitEdit}
                    restaurar={habilitar}
                  />
                </div>
              );
            }): <div>No se realizó ningún pago aún</div>}
        </div>
    </div>
  );
}