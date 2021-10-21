import axios from "axios";
import fechas from "../components/Reserva/Linkreserva/algoritmofechas"

export const GET_CABINS = "GET_CABINS";
export const SEND_PASSWORD_EMAIL ="SEND_PASSWORD_EMAIL"
export const SEND_EMAIL = "SEND_EMAIL";
export const SEND_NOTIFICATION = "SEND_NOTIFICATION";
export const FILTER_CABINS = 'FILTER_CABINS';
export const FILTER_BY_CAPACITY = "FILTER_BY_CAPACITY";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const CREATE_RESERVATION = "CREATE_RESERVATION";
export const CREATE_SERVICES = "CREATE_SERVICES"; 
export const CREATE_USERS = "CREATE_USERS"; 
export const CREATE_PAYMENT = "CREATE_PAYMENT"; 
export const CREATE_IMAGE = "CREATE_IMAGE"; 
export const CREATE_CABAINS = "CREATE_CABAINS"; 
export const READ_PAYMENT = "READ_PAYMENT"; 
export const READ_RESERVATIONS = "READ_RESERVATIONS"; 
export const READ_PICTURES = "READ_PICTURES"; 
export const READ_USERS = "READ_USERS"; 
export const READ_SERVICES = "READ_SERVICES"; 
export const READ_CABINS = "READ_CABINS"; 
export const READ_PAYMENT_OCULTADOS = "READ_PAYMENT_OCULTADOS"; 
export const READ_RESERVATIONS_OCULTADOS = "READ_RESERVATIONS_OCULTADOS"; 
export const READ_PICTURES_OCULTADOS = "READ_PICTURES_OCULTADOS"; 
export const READ_USERS_OCULTADOS = "READ_USERS_OCULTADOS"; 
export const READ_SERVICES_OCULTADOS = "READ_SERVICES_OCULTADOS"; 
export const READ_CABINS_OCULTADOS = "READ_CABINS_OCULTADOS"; 
export const READ_WEATHER = "READ_WEATHER";
export const EDIT_RESERVATIONS = "EDIT_RESERVATIONS";
export const EDIT_USER = "EDIT_USER";
export const EDIT_SERVICES = "EDIT_SERVICES";
export const EDIT_PAYMENT = "EDIT_PAYMENT";
export const EDIT_PICTURES = "EDIT_PICTURES";
export const LOG_USER= "LOG_USER"
export const REMOVE_CABAINS= "REMOVE_CABAINS";
export const REMOVE_RESERVATIONS= "REMOVE_RESERVATIONS";
export const REMOVE_SERVICES= "REMOVE_SERVICES";
export const REMOVE_PICTURES= "REMOVE_PICTURES";
export const REMOVE_PAYMENTS= "REMOVE_PAYMENTS";
export const REMOVE_USERS= "REMOVE_USERS";
export const READ_FECHASNODISPONIBLES = "READ_FECHASNODISPONIBLES";
export const GET_USER_DATA = "GET_USER_DATA";
export const SELECTED_CABIN = "SELECTED_CABIN";
export const FILTER_RESERVATIONS = 'FILTER_RESERVATIONS';
export const GET_TESTIMONIAL = 'GET_TESTIMONIAL';
export const POST_TESTIMONIAL = 'POST_TESTIMONIAL';
export const FIND_USER = 'FIND_USER';
export const FILTER_PAYMENT='FILTER_PAYMENT';
export const FILTER_PAGOS = 'FILTER_PAGOS';
export const READ_CAMBIOS = "READ_CAMBIOS";
export const READ_CAMBIOS_DONE= "READ_CAMBIOS_DONE";
export const REMOVE_FEEDBACK = "REMOVE_FEEDBACK";
export const RESTORE_SERVICES = "RESTORE_SERVICES";
export const READ_FEEDBACK_OCULTADOS = "READ_FEEDBACK_OCULTADOS";
export const CANCELAR_RESERVA= "CANCELAR_RESERVA";
export function getCabins() {
  return async function (dispatch) {
    try {
      let json = await axios.get("/cabins");
      return dispatch({
        type: GET_CABINS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function filterCabins(payload) {
  return {
    type: FILTER_CABINS,
    payload,
  }
}

export function sendEmail(payload) {
  return (dispatch) => {
    const json = axios.post("/sendEmail", payload);
    return json;
  };
}

export function readWeather() {
  return async function (dispatch) {
    try {
      var json = await axios.get("/weather");
      
      return dispatch({
        type: READ_WEATHER,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function createReservation(payload) {
  return async function (dispatch) {
    const response = await axios.post("/reservations/NewReservation", payload);
    return (dispatch({
      type: CREATE_RESERVATION,
      payload: response.data    
     }));
  }
}

export function createServices(payload, { token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    const response = await axios.post("/services/NewService", payload, config);
    return response;
  };
}

export function createUsers(payload) { 
  return async function (dispatch) {
   try{ const response = await axios.post("/users/Singup", payload);
    return response;
    }catch (err) {
      alert("Error Nombre de usuario no disponible")
    }
  };
}

export function createPayment(payload) {
  return async function (dispatch) {
    const response = await axios.post("/payments/NewPayment", payload);
    return response;
  };
}

export function createimage(payload, { token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    const formData = new FormData()
    formData.append('file', payload.file)
    formData.append('upload_preset', 'bxxbrwfk')
    
    const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/vt-cabin/image/upload', formData)
    
    const Url = cloudinaryResponse.data.secure_url 
    

    const response = await axios.post("/pictures/NewPicture", {
      Description: payload.description,
      Url: Url,
      CabainNumber: payload.cabainNumber
    }, config);
    return response;
  };
}

export function createCabains(payload, {token}) {
  
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async (dispatch) => {
    const json = await axios.post("/cabins/NewCabin", payload, config);
    return ( json);
  };
}

export function readPayment({ token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    try {
      var json = await axios.get("/payments/", config);
      return dispatch({
        type: READ_PAYMENT,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function filterPayment({token},mes){
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }

  return async function(dispatch){
    try {
      var json = await axios.get("/payments/", config);

      const pagoFiltrado=json.data.filter((e)=>{
        let miDato=formato(e.fecha);
        let miMes=miDato.substr(5,2);
        return miMes===mes;        
      })
      return dispatch({
        type: FILTER_PAYMENT,
        payload: pagoFiltrado,
      });
    } catch (err) {
      console.error(err);
    }    
  }
}

export function readReservation() {
  return async function (dispatch) {
    try {
      var json = await axios.get("/reservations/");
      return dispatch({
        type: READ_RESERVATIONS,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readPictures(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/pictures/");
      return dispatch({
        type: READ_PICTURES,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readUsers() {

  return async function (dispatch) {
    try {
      var json = await axios.get("/users/");
      return dispatch({
        type: READ_USERS,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readServices() {
  return async function (dispatch) {
    try {
      var json = await axios.get("/services/");
      return dispatch({
        type: READ_SERVICES,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readCabains(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/cabins");
      return dispatch({
        type: READ_CABINS,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readPaymentocultados({token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    try {
      var json = await axios.get("/payments/ocultados", config);
      return dispatch({
        type: READ_PAYMENT,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readReservationocultados() {
  
  return async function (dispatch) {
    try {
      var json = await axios.get("/reservations/ocultadas");
      return dispatch({
        type: READ_RESERVATIONS,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readPicturesocultados(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/pictures/ocultadas");
      return dispatch({
        type: READ_PICTURES,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readUsersocultados({token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    try {
      var json = await axios.get("/users/ocultados", config);
      return dispatch({
        type: READ_USERS,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readServicesocultados() {
  return async function (dispatch) {
    try {
      var json = await axios.get("/services/ocultados");
      return dispatch({
        type: READ_SERVICES,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readCabainsocultados(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/cabins/ocultadas");
      return dispatch({
        type: READ_CABINS,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function editUsers(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.put("/users/EditUser", payload);
      return dispatch({
        type: EDIT_USER,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function editProfile(payload, ID) {
  return async function (dispatch) {
    try {
      var json = await axios.put("/users/EditProfile/" + ID, payload);
      return dispatch({
        type: EDIT_USER,
        payload: json.data,
      });
    } catch (err) {
      window.alert("Contraseña incorrecta")
      console.error(err);
    }
  };
}

export function editServices(payload, { token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    try {
      var json = await axios.put("/services/EditService", payload, config);
      return (dispatch({
        type: EDIT_SERVICES,
        payload: json.data,
      }),window.location.reload())
    } catch (err) {
      console.error(err);
    }
  };
}

export function editPayments(payload, { token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    try {
      var json = await axios.put("/payments/EditPayment", payload, config);
      return dispatch({
        type: EDIT_PAYMENT,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function editPictures(payload, { token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    try {
      var json = await axios.put("/pictures/EditPicture", payload, config);
      return dispatch({
        type: EDIT_PICTURES,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function editReservation(payload, { token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    try {
      var cabins = await axios.get("/cabins")
      var reserva = await axios.get("/reservations")
      var filtrada = reserva.data.filter(e=> e.ID === payload.id)
      var cabinfiltrada = cabins.data.filter(e=>e.ID === filtrada[0].Cabinid)
      var Avaliable2 = cabinfiltrada[0].Available.filter((e)=> !e.includes(...fechas({Checkin:filtrada[0].Checkin,Checkout:filtrada[0].Checkout})))
      Avaliable2.push(fechas({Checkin:payload.Checkin,Checkout:payload.Checkout}))
    const response = await axios.put("/reservations/EditReservation", payload, config);
    return (dispatch({
      type: EDIT_RESERVATIONS,
      payload: response.data,
    }),dispatch(editAvailible({id:cabinfiltrada[0].ID , Available: Avaliable2})));
  } catch (err) {
    console.error(err);
  }
};
}

export function editCabains(payload, { token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    const response = await axios.put("/cabins/EditCabin", payload, config);
    return (response);
  };
}

export function editAvailible(payload) {
  return async function (dispatch) {
    const response = await axios.put("/cabins/EditCabin/available", payload);
    return response;
  };
}

export function Loguser(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post("/login", payload);
      localStorage.setItem("LogedUser", JSON.stringify(json.data));
      return dispatch({
        type: LOG_USER,
        payload: json.data,
      });
    } catch (err) {
      console.log(err)
      alert("Error Usuario o Contraseña mal ingresados/inexistentes");
    }
  };
}

export function Logeduser() {
  return async function (dispatch) {
    try {
      let json = localStorage.getItem("LogedUser");
      return dispatch({
        type: LOG_USER,
        payload: JSON.parse(json),
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeCabains(id) {
  return async function (dispatch) {
    var json = await axios.put("/cabins/RemoveCabin", id);
    return (dispatch({
      type: REMOVE_CABAINS,
      payload: id
    }))

  };
}

export function removeReservations(payload) {
  if(!payload.Available){
    payload.Available = fechas({Checkin:payload.Checkin,Checkout:payload.Checkout})
  }
  return async function (dispatch) {
    var cabins = await axios.get("/cabins")
    var reserva = await axios.get("/reservations")
    var json = await axios.put("/reservations/RemoveReservation", {id: payload.id});
    var filtrada = reserva.data.filter(e=> e.ID === payload.id)
    var cabinfiltrada = cabins.data.filter(e=>e.ID === filtrada[0].Cabinid )
    var Avaliable2 = cabinfiltrada[0].Available.filter(e=> !e.includes(...payload.Available))
    return (dispatch({
      type: REMOVE_RESERVATIONS,
      payload: payload.id

    }),dispatch(editAvailible({id:cabinfiltrada[0].ID , Available: Avaliable2})))

  };
}

export function removeServices(id) {
  return async function (dispatch) {
    var json = await axios.put("/services/RemoveService", id);
    return dispatch({
      type: REMOVE_SERVICES,
      payload: id
    })

  };
}

export function removePictures(id) {
  return async function (dispatch) {
    var json = await axios.put("/pictures/RemovePicture", id);
    return dispatch({
      type: REMOVE_PICTURES,
      payload: id
    })
  };
}
export function removePayments(id) {
  return async function (dispatch) {
    var json = await axios.put("/payments/RemovePayment", id);
    return dispatch({
      type: REMOVE_PAYMENTS,
      payload: id
    })

  };
}

export function removeUsers(id) {
  return async function (dispatch) {
    var json = await axios.put("/users/RemoveUser", id);
    return dispatch({
      type: REMOVE_USERS,
      payload: id
    })

  };
}

export function restoreCabains(id){
  return async function (dispatch) {
   var json = await axios.put("/cabins/RestoreCabin", id);
      return ( dispatch({
        type: REMOVE_CABAINS,
        payload: id
       }))
       
  };
}

export function restoreReservations(payload){
  return async function (dispatch) {
    var cabins = await axios.get("/cabins")
    var reserva = await axios.get("/reservations/ocultadas")
    var filtrada = reserva.data.filter(e=> e.ID === payload.id)
    var cabinfiltrada = cabins.data.filter(e=>e.ID === filtrada[0].Cabinid )
    var Avaliable2 = cabinfiltrada[0].Available
    Avaliable2.push(payload.Available)
      var json = await axios.put("/reservations/RestoreReservation", {id: payload.id});
      return (dispatch({
        type: REMOVE_RESERVATIONS,
        payload: payload.id
       }),dispatch(editAvailible({id:cabinfiltrada[0].ID , Available: Avaliable2})))
       
  };
}

export function restoreServices(id){
  return async function (dispatch) {
      var json = await axios.put("/services/RestoreService", id);
      return dispatch({
        type: REMOVE_SERVICES,
        payload: id
       })
       
  };
}

export function restorePictures(id){
  return async function (dispatch) {
      var json = await axios.put("/pictures/RestorePicture", id);
      return dispatch({
        type: REMOVE_PICTURES,
        payload: id   
       })
       
  };
}

export function restorePayments(id){
  return async function (dispatch) {
      var json = await axios.put("/payments/RestorePayment", id);
      return dispatch({
        type: REMOVE_PAYMENTS,
        payload: id
       })
  };
}

export function restoreUsers(id){
  return async function (dispatch) {
      var json = await axios.put("/users/RestoreUser", id);
      return dispatch({
        type: REMOVE_USERS,
        payload: id      
       })     
  };
}

export function readFechas(){
  const cabinId = localStorage.getItem("id_cabaña");
  return async function (dispatch) {  
      var json = await axios.get(`/cabins/${JSON.parse(cabinId)}`)
      return dispatch({
        type: READ_FECHASNODISPONIBLES,
        payload: json.data[0].Available      
       })      
  };
}

export function sendNotification(payload) {
return async function (dispatch) {
      const json = await axios.post("/sendNotification", payload)
      return dispatch({
          type: 'SEND_NOTIFICATION',
          payload: json.data
      })
    }
}

export function getUserData(username){
  return async function (dispatch) {
    try {
      let json = await axios.get("/users/" + username);
      return dispatch({
        type: GET_USER_DATA,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function selectcabin(id){
  return async function (dispatch) {
    try {
      let json = await axios.get(`/cabins/${id}`);
      return dispatch({
        type: SELECTED_CABIN,
        payload: json.data[0],
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function mailpassword(Email) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/users/");
      var useremail = json.data.filter((e)=> e.Email === Email)
      var lala = await axios.post("/sendNotificationpassword",{Email:Email,username: useremail[0].UserName})
      const cambiar={
        id: useremail[0].ID,
        UserPassword: "ax54sa5s4a"
      }
      return (dispatch({
        type: SEND_PASSWORD_EMAIL,
        payload: useremail,
      }),dispatch(editUsers(cambiar)));
    } catch (err) {
      console.error(err);
    }
  };
}

export function filterReservations(payload){
  return {
    type: FILTER_RESERVATIONS,
    payload
  }
}

export function getTestimonials(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.get("/feedback");
      return dispatch({
        type: GET_TESTIMONIAL,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postTestimonials(payload , {token}) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    const response = await axios.post("/feedback", payload, config);
    return response;
  }
}

export function removeTestimonials(id) {
  return async function (dispatch) {
    var json = await axios.put("/feedback/", id);
    return dispatch({
      type: REMOVE_PICTURES,
      payload: id
    })
  };
}

export function findUser(payload){
  return {
    type: FIND_USER,
    payload
  }
}

export function filterPagos(payload){
  return{
    type: FILTER_PAGOS,
    payload
  }
}

export function cambiarReserva(payload){
  return async function (dispatch) {
    try {
      let json = await axios.post("/CambiosReserva/Cambios",payload);
    } catch (err) {
      console.log(err);
    }
  };
}

export function aceptarCambios(payload, { token },ID){
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    try {
      var cabins = await axios.get("/cabins")
      var reserva = await axios.get("/reservations")
      var filtrada = reserva.data.filter(e=> e.ID === payload.id)
      var cabinfiltrada = cabins.data.filter(e=>e.Number === payload.CabinNumber )
      var Avaliable2 = cabinfiltrada[0].Available.filter((e)=> !e.includes(...fechas({Checkin:filtrada[0].Checkin,Checkout:filtrada[0].Checkout})))
      Avaliable2.push(fechas({Checkin:payload.Checkin,Checkout:payload.Checkout}))
      var json1 = await axios.get("/users/");
      var useremail = json1.data.filter((e)=> e.ID === payload.UserId)
      let json = await axios.put("/reservations/EditReservation", payload, config);
      let json2 = await axios.put("/CambiosReserva/Cambios/Done",ID)
      let lala = await axios.post("/sendNotificationCambios",{username:payload.UserName, name:payload.Anombrede, date:payload.Checkin,email:useremail[0].Email })
      return dispatch(editAvailible({id:cabinfiltrada[0].ID , Available: Avaliable2}))
    } catch (err) {
      console.log(err);
    }
  };
}

export function cancelarCambios(payload,ID){
  return async function (dispatch) {
    try {
      var json1 = await axios.get("/users/");
      var useremail = json1.data.filter((e)=> e.ID === payload.UserId)
      let json = await axios.put("/CambiosReserva/Cambios/Cancel",ID);
      let lala = await axios.post("/sendNotificationCambios/NO",{username:payload.UserName, name:payload.Anombrede, date:payload.Checkin,email:useremail[0].Email})
    } catch (err) {
      console.log(err);
    }
  };
}

export function RestaurarCambios(payload,ID,{token}){
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return async function (dispatch) {
    try {
      var cabins = await axios.get("/cabins")
      var reserva = await axios.get("/reservations")
      var filtrada = reserva.data.filter(e=> e.ID === payload.id)
      var cabinfiltrada = cabins.data.filter(e=>e.Number === payload.CabinNumber )
      var Avaliable2 = cabinfiltrada[0].Available.filter((e)=> !e.includes(...fechas({Checkin:filtrada[0].Checkin,Checkout:filtrada[0].Checkout})))
      Avaliable2.push(fechas({Checkin:payload.Checkin,Checkout:payload.Checkout}))
      var json1 = await axios.get("/users/");
      var useremail = json1.data.filter((e)=> e.ID === payload.UserId)
      let json = await axios.put("/reservations/EditReservation", payload, config);
      let json2 = await axios.put("/CambiosReserva/Cambios/Restore",ID);
      let lala = await axios.post("/sendNotificationCambios/Error",{username:payload.UserName, name:payload.Anombrede, date:payload.Checkin,email:useremail[0].Email})
      return dispatch(editAvailible({id:cabinfiltrada[0].ID , Available: Avaliable2}))
    } catch (err) {
      console.log(err);
    }
  };
}

export function getCambiosDone(){
  return async function (dispatch) {
    try {
      let json = await axios.get("/CambiosReserva/Done");
      return dispatch({
        type: READ_CAMBIOS_DONE,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getCambios(){
  return async function (dispatch) {
    try {
      let json = await axios.get("/CambiosReserva");
      return dispatch({
        type: READ_CAMBIOS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeFeedback(id) {
  return async function (dispatch) {

    var json = await axios.put("/feedback/RemoveFeedback", id);
    return dispatch({
      type: REMOVE_FEEDBACK,
      payload: id

    })

  };
}

export function restoreFeedback(id){
  return async function (dispatch) {
   
      var json = await axios.put("/feedback/RestoreFeedback", id);
      return dispatch({
        type: RESTORE_SERVICES,
        payload: id
       
       })
       
  };
}
export function readFeedbackocultados(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/feedback/ocultadas");
      return dispatch({
        type: READ_FEEDBACK_OCULTADOS,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
}}}

export function cancelarReserva(payload){
  return async function (dispatch) {
    try {
      let json = await axios.post("/CambiosReserva/Cambios",payload);
      return dispatch({
        type: CANCELAR_RESERVA,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function aceptarCancelacion(payload,ID){
  return async function (dispatch) {
    try {
      var json1 = await axios.get("/users/");
      var useremail = json1.data.filter((e)=> e.ID === payload.UserId)
      let lala = await axios.post("/sendNotificationCambios",{username:payload.UserName, name:payload.Anombrede, date:payload.Checkin,email:useremail[0].Email })
      let json = await axios.put("/CambiosReserva/Cambios/Done",ID)
      return dispatch({
        type: CANCELAR_RESERVA,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function restaurarCancelado(payload,ID,{token}){
  return async function (dispatch) {
    try {
      const Available = fechas({Checkin:payload.Checkin,Checkout:payload.Checkout})
      var json1 = await axios.get("/users/");
      var useremail = json1.data.filter((e)=> e.ID === payload.UserId)
      let lala = await axios.post("/sendNotificationCambios",{username:payload.UserName, name:payload.Anombrede, date:payload.Checkin,email:useremail[0].Email })
      let json = await axios.put("/CambiosReserva/Cambios/Restore",ID)
      return (dispatch({
        type: CANCELAR_RESERVA,
        payload: json.data,
      }),dispatch(restoreReservations({ id: payload.id, Available})));
    } catch (err) {
      console.log(err);
    }
  };
}