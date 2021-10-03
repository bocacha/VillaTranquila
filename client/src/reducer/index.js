import { 
  GET_CABINS,
  FILTER_CABINS,
  SEND_EMAIL }
  from "../actions";

const initialState = {
  cabins: [],
  allCabins: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case GET_CABINS:
      return {
        ...state,
        cabins: action.payload,
        allCabins: action.payload,
      };

    case FILTER_CABINS:
      let cabinsFiltered = state.allCabins;
      // Filter by capacity:
      let capacity = action.payload.capacity;
      cabinsFiltered = capacity === 'all' ?
        cabinsFiltered :
        cabinsFiltered.filter(el => el.Capacity >= capacity);
      // Filter by wifi:
      let wifi = action.payload.wifi;
      cabinsFiltered = wifi === '' || wifi === 'false' ?
        cabinsFiltered :
        cabinsFiltered.filter(el => el.Wifi);
      // Filter by barbecue:
      let barbecue = action.payload.barbecue;
      cabinsFiltered = barbecue === '' || barbecue === 'false' ?
        cabinsFiltered :
        cabinsFiltered.filter(el => el.Barbecue);
      // Filter by cleaning:
      let cleaning = action.payload.cleaning;
      cabinsFiltered = cleaning === '' || cleaning === 'false' ?
        cabinsFiltered :
        cabinsFiltered.filter(el => el.Cleaning);
      // Filter by parking:
      let parking = action.payload.parking;
      cabinsFiltered = parking === '' || parking === 'false' ?
        cabinsFiltered :
        cabinsFiltered.filter(el => el.Parking);
      return {
        ...state,
        cabins: cabinsFiltered
      }

    case SEND_EMAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}

