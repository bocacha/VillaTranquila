import {
    GET_CABINS,
    FILTER_BY_CAPACITY,
    FILTER_BY_PRICE,
    FILTER_BY_SERVICES,
} from '../actions';

const initialState = {
    cabins: [],
    allCabins: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CABINS:
            return {
                ...state,
                cabins: action.payload,
                allCabins: action.payload,
            }
        case FILTER_BY_CAPACITY:
            var allCabins = state.allCabins;
            const cabinsFilteredCapacity = action.payload === 'all' ?
                allCabins :
                allCabins.filter(el => el.capacity >= action.payload);
            return {
                ...state,
                cabins: cabinsFilteredCapacity,
            }
        case FILTER_BY_PRICE:
            const cabinsFilteredPrice = action.payload === 'all' ?
                allCabins :
                allCabins.filter(el => el.price <= action.payload);
            return {
                ...state,
                cabins: cabinsFilteredPrice,
            }
        case FILTER_BY_SERVICES:
            let toFilter = state.allCabins;
            let servicesWanted = action.payload;
            let cabinsFilteredServices = [];
            if(servicesWanted.length){
                for(let i = 0; i < servicesWanted.length; i++){
                    toFilter = toFilter.filter(el => el[servicesWanted[i]] === true)
                    cabinsFilteredServices.concat(toFilter);
                }
            } else cabinsFilteredServices = toFilter;
            return {
                ...state,
                cabins: cabinsFilteredServices,
            }
        default:
            return state;
    }
}

export default rootReducer;