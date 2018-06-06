import * as ActionTypes from "../constants/ActionTypes";

export function listData(data) {
    return { type: ActionTypes.LIST_DATA, data };
}

export function startLoading() {
    return { type: ActionTypes.START_LOADING };
}

export function stopLoading() {
    return { type: ActionTypes.STOP_LOADING };
}

export function error(error) {
    return { type: ActionTypes.SET_ERROR, error };
}

export function setFilter(filter) {
    return { type: ActionTypes.SET_FILTER, filter };
}
