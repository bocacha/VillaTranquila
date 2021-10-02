import axios from "axios";

export const GET_CABINS = "GET_CABINS";
export const FILTER_BY_CAPACITY = "FILTER_BY_CAPACITY";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const SEND_EMAIL = "SEND_EMAIL";
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
export const EDIT_RESERVATIONS = "EDIT_RESERVATIONS";
export const EDIT_USER = "EDIT_USER";
export const EDIT_SERVICES = "EDIT_SERVICES";
export const EDIT_PAYMENT = "EDIT_PAYMENT";
export const EDIT_PICTURES = "EDIT_PICTURES";
export const LOG_USER= "LOG_USER"

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

export function filterCabinsByCapacity(payload) {
  return {
    type: FILTER_BY_CAPACITY,
    payload,
  };
}

export function filterCabinsByPrice(payload) {
  return {
    type: FILTER_BY_PRICE,
    payload,
  };
}

export function sendEmail(payload) {
  return (dispatch) => {
    const json = axios.post("/sendEmail", payload);
    return json;
  };
}
export function createReservation(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/reservations/NewReservation", payload);
    return response;
  };
}

export function createServices(payload ,{token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/services/NewService", payload, config);
    return response;
  };
}

export function createUsers(payload) {

  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/users/Singup", payload);
    return response;
  };
}

export function createPayment(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/payments/NewPayment", payload);
    return response;
  };
}

export function createimage(payload , {token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/pictures/NewPicture", payload,config);
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
    return json;
  };
}

export function readPayment({token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/payments/", config);
      return dispatch({
        type: READ_PAYMENT,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readReservation({token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/reservations/", config);
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
      var json = await axios.get("http://localhost:3001/pictures/");
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
      var json = await axios.get("http://localhost:3001/users/", config);
      return dispatch({
        type: READ_USERS,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function readServices(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/services/");
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
      var json = await axios.get("http://localhost:3001/cabins");
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
      var json = await axios.put("http://localhost:3001/users/EditUser", payload);
      return dispatch({
        type: EDIT_USER,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function editServices(payload, {token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    try {
      var json = await axios.put("http://localhost:3001/services/EditService", payload,config);
      return dispatch({
        type: EDIT_SERVICES,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function editPayments(payload, {token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    try {
      var json = await axios.put("http://localhost:3001/payments/EditPayment", payload, config);
      return dispatch({
        type: EDIT_PAYMENT,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function editPictures(payload, {token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    try {
      var json = await axios.put("http://localhost:3001/pictures/EditPicture", payload, config);
      return dispatch({
        type: EDIT_PICTURES,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function editReservation(payload, {token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    const response = await axios.put("http://localhost:3001/reservations/NewReservation", payload, config);
    return response;
  };
}
export function editCabains(payload, {token}) {
  const config={
    headers:{
    Authorization: `Bearer ${token}`,
  }
  }
  return async function (dispatch) {
    const response = await axios.put("http://localhost:3001/cabins/EditCabin", payload, config);
    return response;
  };
}
export function Loguser(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post("http://localhost:3001/login", payload);
      return dispatch({
        type: LOG_USER,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
