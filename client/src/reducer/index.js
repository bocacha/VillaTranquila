import {
  GET_CABINS,
  FILTER_BY_CAPACITY,
  FILTER_BY_PRICE,
  SEND_EMAIL,
  CREATE_RESERVATION,
  CREATE_SERVICES,
  CREATE_USERS,
  CREATE_PAYMENT,
  READ_PAYMENT,
  CREATE_IMAGE,
  CREATE_CABAINS,
  READ_RESERVATIONS,
  READ_PICTURES,
  READ_USERS,
  READ_SERVICES,
  READ_CABINS,
  EDIT_USER,
  EDIT_RESERVATIONS,
  EDIT_SERVICES,
  EDIT_PAYMENT,
  EDIT_PICTURES,
} from "../actions";
const initialState = {
  cabins: [],
  allCabins: [],
  pagos: [],
  C: [],
  fotos: [],
  usuarios: [],
  servicios: [],
  cabañas: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CABINS:
      return {
        ...state,
        cabins: action.payload,
        allCabins: action.payload,
      };
    case FILTER_BY_CAPACITY:
      var allCabins = state.allCabins;
      const cabinsFilteredCapacity =
        action.payload === "all"
          ? allCabins
          : allCabins.filter((el) => el.capacity >= action.payload);
      return {
        ...state,
        cabins: cabinsFilteredCapacity,
      };
    case FILTER_BY_PRICE:
      const cabinsFilteredPrice =
        action.payload === "all"
          ? allCabins
          : allCabins.filter((el) => el.price <= action.payload);
      return {
        ...state,
        cabins: cabinsFilteredPrice,
      };
    case SEND_EMAIL:
      return {
        ...state,
      };
    case CREATE_RESERVATION:
      return {
        ...state,
      };
    case CREATE_SERVICES:
      return {
        ...state,
      };
    case CREATE_USERS:
      return {
        ...state,
      };
    case CREATE_PAYMENT:
      return {
        ...state,
      };
    case CREATE_IMAGE:
      return {
        ...state,
      };
    case CREATE_CABAINS:
      return {
        ...state,
      };
    case READ_PAYMENT:
      return {
        ...state,
        pagos: action.payload,
      };
    case READ_RESERVATIONS:
      return {
        ...state,
        reservaciones: action.payload,
      };
    case READ_PICTURES:
      return {
        ...state,
        fotos: action.payload,
      };
    case READ_USERS:
      return {
        ...state,
        usuarios: action.payload,
      };
    case READ_SERVICES:
      return {
        ...state,
        servicios: action.payload,
      };
    case READ_CABINS:
      return {
        ...state,
        cabañas: action.payload,
      };
    case EDIT_USER:
      return {
        ...state,
      };
    case EDIT_RESERVATIONS:
      return {
        ...state,
      };
    case EDIT_SERVICES:
      return {
        ...state,
      };
    case EDIT_PAYMENT:
      return {
        ...state,
      };
    case EDIT_PICTURES:
      return {
        ...state,
      };
    default:
      return state;
  }
}
