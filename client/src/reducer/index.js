import {
  GET_CABINS,
  FILTER_CABINS,
  SEND_EMAIL,
  SEND_NOTIFICATION,
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
  READ_PAYMENT_OCULTADOS,
  READ_RESERVATIONS_OCULTADOS,
  READ_PICTURES_OCULTADOS,
  READ_USERS_OCULTADOS,
  READ_SERVICES_OCULTADOS,
  READ_CABINS_OCULTADOS,
  READ_FECHASNODISPONIBLES,
  READ_WEATHER,
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
  REMOVE_USERS,
  GET_USER_DATA,
  SEND_PASSWORD_EMAIL,
  SELECTED_CABIN,
  FILTER_RESERVATIONS

} from "../actions";
import fechas from "../components/Reserva/Linkreserva/algoritmofechas"

const initialState = {
  selectedcabin:[],
  cabins: [],
  allCabins: [],
  pagos: [],
  C: [],
  fotos: [],
  usuarios: [],
  servicios: [],
  cabañas: [],
  user: {},
  reservaciones: [],
  allReservations: [],
  fechasnodisponibles:[],
  userData: {},
  weather:[]
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case GET_CABINS:
      return {
        ...state,
        cabins: action.payload,
        allCabins:action.payload,
      };

    case FILTER_CABINS:
      let cabinsFiltered = state.allCabins;
      // Filter by availability:
      let inDate = action.payload.inDate.split('-').reverse().join('/');
      let outDate = action.payload.outDate.split('-').reverse().join('/');
      const obj ={
        Checkin: inDate,
        Checkout: outDate
      }
      console.log(obj)
      const fechasintermedias = fechas(obj)
      console.log(fechasintermedias)
      var nomostrar = []
      cabinsFiltered.map(el => {
        el.Available.map(e=>{
          for(let i=0;i<e.length;i++){
            for(let j=0;j<fechasintermedias.length;j++){
              if(
                e[i] === fechasintermedias[j]
              ){
                nomostrar.push(el)
              }
            }
          }
        })
        })
         cabinsFiltered = cabinsFiltered.filter(el=> {
          return !nomostrar.includes(el)

        })
        console.log(cabinsFiltered)

      // cabinsFiltered = cabinsFiltered.filter(el => {
      //   var hitDates = el.Available || [];
      //   hitDates = Object.keys(hitDates);
      //   var hitDateMatchExists = hitDates.some(date => {
      //     var newDate = new Date(date);
      //     return newDate >= inDate && newDate <= outDate
      //   });
      //   return hitDateMatchExists;
      // });
      // Filter by capacity:
      let capacity = action.payload.capacity;
      cabinsFiltered = capacity === 'all' ?
        cabinsFiltered :
        cabinsFiltered.filter(el => el.Capacity >= capacity);
      // Filter by priceMin and priceMax:
      let priceMin = action.payload.priceMin;
      let priceMax = action.payload.priceMax;
      cabinsFiltered = priceMin === 'all'  ||priceMin === "" ?
        cabinsFiltered :
        cabinsFiltered.filter(el => el.Price >= parseInt(priceMin));
      cabinsFiltered = priceMax === 'all'||priceMax ===  "" ?
        cabinsFiltered :
        cabinsFiltered.filter(el => el.Price <= parseInt(priceMax));
      // Filter by wifi:
      let wifi = action.payload.wifi;
      cabinsFiltered = wifi === '' || wifi === 'false' ?
        cabinsFiltered :
        cabinsFiltered.filter(el => el.Wifi);
      // Filter by barbecue:
      let barbecue = action.payload.barbecue;
      cabinsFiltered = barbecue === '' || barbecue === 'false' ?
        cabinsFiltered :
        cabinsFiltered.filter(el => el.Parrilla);
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
        user: action.payload
      };
    case SEND_EMAIL:
      return {
        ...state,
      };
      case SEND_NOTIFICATION:
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
        allReservations: action.payload
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
      case READ_PAYMENT_OCULTADOS:
        return {
          ...state,
          pagos: action.payload,
        };
      case READ_RESERVATIONS_OCULTADOS:
        return {
          ...state,
          reservaciones: action.payload,
        };
      case READ_PICTURES_OCULTADOS:
        return {
          ...state,
          fotos: action.payload,
        };
      case READ_USERS_OCULTADOS:
        return {
          ...state,
          usuarios: action.payload,
        };
      case READ_SERVICES_OCULTADOS:
        return {
          ...state,
          servicios: action.payload,
        };
      case READ_CABINS_OCULTADOS:
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
        cabañas: state.cabañas.filter((cabaña) => cabaña.id !== action.payload)
      };
    case REMOVE_RESERVATIONS:
      return {
        ...state,
        reservaciones: state.reservaciones.filter((reserva) => reserva.id !== action.payload)
      };
    case REMOVE_SERVICES:
      return {
        ...state,
        servicios: state.servicios.filter((reserva) => reserva.id !== action.payload)
      };
    case REMOVE_PICTURES:
      return {
        ...state,
        fotos: state.fotos.filter((foto) => foto.id !== action.payload)
      };
    case REMOVE_PAYMENTS:
      return {
        ...state,
        pagos: state.pagos.filter((pago) => pago.id !== action.payload)
      };
    case REMOVE_USERS:
      return {
        ...state,
        usuarios: state.usuarios.filter((usuario) => usuario.id !== action.payload)
      };
    case READ_FECHASNODISPONIBLES:
      return {
        ...state,
        fechasnodisponibles:action.payload,
      };
    case GET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      }
    case SELECTED_CABIN:
        return{
          ...state,
          selectedcabin: action.payload,
        }
    case SEND_PASSWORD_EMAIL:
          return {
            ...state,
          }
    case READ_WEATHER:
      return {
        ...state,
        weather: action.payload
      }

    case FILTER_RESERVATIONS:
      let allReservations = state.allReservations;
      // Filter by username:
      let username = action.payload.username;
      let userID = state.usuarios.find(el => el.UserName === username)?.ID;
      allReservations = username === '' ?
        allReservations :
        !userID ?
          alert('Usuario no encontrado') :
          allReservations.filter(el => el.UserId === userID);
      // Filter by cabinNumber:
      let cabinNumber = action.payload.cabinNumber;
      let cabinID = state.cabins.find(el => el.Number === cabinNumber)?.ID;
      allReservations = cabinNumber === '' ?
        allReservations :
        !cabinID ?
          alert('Cabaña no encontrada') :
          allReservations.filter(el => el.Cabinid === cabinID);
      // Filter by date:
      let date = action.payload.date.split('-').reverse().join('/');
      allReservations = date === '' ?
        allReservations :
        allReservations.filter(el => el.Checkin === date);
      return {
        ...state,
        reservaciones: allReservations
      }


    default:
      return state;
  }
}
