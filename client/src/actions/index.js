import axios from "axios";

export const GET_CABINS = "GET_CABINS";
export const FILTER_BY_CAPACITY = "FILTER_BY_CAPACITY";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const SEND_EMAIL = "SEND_EMAIL"

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
    const json = axios.post("http://localhost:3001/sendEmail", payload);
    return json;
  };
}
