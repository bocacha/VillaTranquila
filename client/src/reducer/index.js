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
      let filters = action.payload;
      for(let filter of filters){
        if(filter){
          cabinsFiltered = cabinsFiltered.filter(el => el[filter] === filters[filter]);
        };
      };
      return {
        ...state,
        cabins: cabinsFiltered,
      }

    case SEND_EMAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}

