import { GET_CABINS, FILTER_BY_CAPACITY, FILTER_BY_PRICE, SEND_EMAIL, LOG_USER } from "../actions";

const initialState = {
  cabins: [],
  allCabins: [],
  user:{}
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
      case LOG_USER:
        return {
          ...state,
          user: action.payload,
        };
    case SEND_EMAIL:
      return {
        ...state,
      };
      
    default:
      return state;
  }
}

