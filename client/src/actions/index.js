import axios from 'axios';

export const GET_CABINS = 'GET_CABINS';
export const FILTER_BY_CAPACITY = 'FILTER_BY_CAPACITY';
export const FILTER_BY_PRICE = 'FILTER_BY_PRICE';
export const FILTER_BY_SERVICES = 'FILTER_BY_SERVICES';

export function getCabins(){
    return async function(dispatch){
        try{
            let json = await axios.get('http://localhost:3001/cabins/');
            return dispatch({
                type: GET_CABINS,
                payload: json.data,
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export function filterCabinsByCapacity(payload){
    return {
        type: FILTER_BY_CAPACITY,
        payload,
    }
}

export function filterCabinsByPrice(payload){
    return {
        type: FILTER_BY_PRICE,
        payload,
    }
}

export function filterCabinsByServices(payload){
    return {
        type: FILTER_BY_SERVICES,
        payload,
    }
}