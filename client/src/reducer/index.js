import {
  GET_CABINS,
  FILTER_CABINS,
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
  LOG_USER,
  REMOVE_CABAINS,
  REMOVE_RESERVATIONS,
  REMOVE_SERVICES,
  REMOVE_PICTURES,
  REMOVE_PAYMENTS,
  REMOVE_USERS
  
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
  user:{},
  reservaciones:[],
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
      case LOG_USER:
        return {
          ...state,
          user: action.payload,
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
      case REMOVE_CABAINS:
        return {
          ...state,
          cabañas: state.cabañas.filter((cabaña)=> cabaña.id !== action.payload)
        };
        case REMOVE_RESERVATIONS:
          return {
            ...state,
            reservaciones: state.reservaciones.filter((reserva)=> reserva.id !== action.payload)
          };
        case REMOVE_SERVICES:
          return {
            ...state,
            servicios: state.servicios.filter((reserva)=> reserva.id !== action.payload)
          };
        case REMOVE_PICTURES:
          return {
            ...state,
            fotos: state.fotos.filter((foto)=> foto.id !== action.payload)
          };
        case REMOVE_PAYMENTS:
          return {
            ...state,
            pagos: state.pagos.filter((pago)=> pago.id !== action.payload)
          };
        case REMOVE_USERS:
          return {
            ...state,
            usuarios: state.usuarios.filter((usuario)=> usuario.id !== action.payload)
          };
    default:
      return state;
  }
}
