import axios from "axios";

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
      var json = await axios.get("http://localhost:3001/weather/");
      console.log('json',json.data)
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
    const reserva = response.data
    const users= await axios.get("/users")
    const user = users.data.filter(e=> e.ID === payload.id)
    let reservas = []
    if(user[0].ReservationsHistory){
user[0].ReservationsHistory.map(e=>{
        reservas.push(e)
      })
      reservas.push(reserva)
    const cambiar={
      id: payload.id,
      ReservationsHistory: reservas
    }
    console.log(cambiar)
    return (dispatch({
      type: CREATE_RESERVATION,
      payload: response.data
     
     }),dispatch(editUsers(cambiar)));

    }else{
       reservas.push(reserva)
    const cambiar={
      id: payload.id,
      ReservationsHistory: reservas
    }
    console.log(cambiar)
    return (dispatch({
      type: CREATE_RESERVATION,
      payload: response.data
     
     }),dispatch(editUsers(cambiar))); 
    }    
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

    console.log(response)
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

export function readReservation() {
  // const config={
  //   headers:{
  //   Authorization: `Bearer ${token}`,
  // }
  // }
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

export function readUsers({token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    try {
      var json = await axios.get("/users/", config);
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
  // const config={
  //   headers:{
  //   Authorization: `Bearer ${token}`,
  // }
  // }
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
  console.log("action",payload)
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
  console.log("ID", ID);
  console.log("pay", payload);
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
    const response = await axios.put("/reservations/EditReservation", payload, config);
    return dispatch({
      type: EDIT_RESERVATIONS,
      payload: response.data,
    });
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
  console.log(payload)
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
      console.log(json)
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
  console.log('remove', payload.Available);
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
  console.log('remove', id);
  return async function (dispatch) {

    var json = await axios.put("/services/RemoveService", id);
    return dispatch({
      type: REMOVE_SERVICES,
      payload: id

    })

  };
}

export function removePictures(id) {
  console.log('remove', id);
  return async function (dispatch) {

    var json = await axios.put("/pictures/RemovePicture", id);
    return dispatch({
      type: REMOVE_PICTURES,
      payload: id

    })

  };
}
export function removePayments(id) {
  console.log('remove', id);
  return async function (dispatch) {

    var json = await axios.put("/payments/RemovePayment", id);
    return dispatch({
      type: REMOVE_PAYMENTS,
      payload: id

    })

  };
}

export function removeUsers(id) {
  console.log('remove', id);
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
  console.log(payload)
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
  console.log('remove',id);
  return async function (dispatch) {
   
      var json = await axios.put("/services/RestoreService", id);
      return dispatch({
        type: REMOVE_SERVICES,
        payload: id
       
       })
       
  };
}

export function restorePictures(id){
  console.log('remove',id);
  return async function (dispatch) {
   
      var json = await axios.put("/pictures/RestorePicture", id);
      return dispatch({
        type: REMOVE_PICTURES,
        payload: id
       
       })
       
  };
}
export function restorePayments(id){
  console.log('remove',id);
  return async function (dispatch) {
   
      var json = await axios.put("/payments/RestorePayment", id);
      return dispatch({
        type: REMOVE_PAYMENTS,
        payload: id
       
       })
       
  };
}

export function restoreUsers(id){
  console.log('remove',id);
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
  console.log(payload)
      const json = await axios.post("/sendNotification", payload)

      return dispatch({
          type: 'SEND_NOTIFICATION',
          payload: json.data
      })
 }
}

export function getUserData(username){
  console.log(username)
  return async function (dispatch) {
    try {
      let json = await axios.get("/users/" + username);
      console.log(json.data)
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
      let json = await axios.get("/cabins/"+id);
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
      var lala = await axios.post("/sendNotificationpassword",{Email:Email})
      var json = await axios.get("/users/");
      var useremail = json.data.filter((e)=> e.Email === Email)
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