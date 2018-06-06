export const LIST_DATA = 'LIST_DATA';
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_ERROR = 'ERROR';
export const SET_FILTER = 'SET_FILTER';

export function listData(data) {
    return { type: LIST_DATA, data };
}

export function startLoading() {
    return { type: START_LOADING };
}

export function stopLoading() {
    return { type: STOP_LOADING };
}

export function setLocation(location) {
    return { type: SET_LOCATION, location };
}

export function error(error) {
    return { type: SET_ERROR, error };
}

export function setFilter(filter) {
    return { type: SET_FILTER, filter };
}
