import axios from "axios";

export const GET_CABINS = "GET_CABINS";
export const SEND_EMAIL = "SEND_EMAIL";
export const FILTER_CABINS = 'FILTER_CABINS';

export function getCabins() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/cabins");
      return dispatch({
        type: GET_CABINS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

// export function filterCabinsByCapacity(payload) {
//   return {
//     type: FILTER_BY_CAPACITY,
//     payload,
//   };
// }

// export function filterCabinsByPrice(payload) {
//   return {
//     type: FILTER_BY_PRICE,
//     payload,
//   };
// }

// export function filterCabinsByServices(payload){
//   return {
//     type: FILTER_BY_SERVICES,
//     payload,
//   };
// }

export function filterCabins(payload){
  return {
    type: FILTER_CABINS,
    payload,
  }
}

export function sendEmail(payload) {
  return (dispatch) => {
    const json = axios.post("http://localhost:3001/sendEmail", payload);
    return json;
  };
}

