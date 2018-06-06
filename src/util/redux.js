import { createStore } from "redux";
import * as ActionTypes from "../constants/ActionTypes";

const initialState = {
    venues: [],
    isLoadingData: false,
    location: "",
    error: "",
    filter: { radius: 2000, section: '' }
};

const reducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ActionTypes.LIST_DATA:
            newState = Object.assign({}, state, {
                venues: action.data,
                location: action.data.response.headerFullLocation
            });
            return newState;
        case ActionTypes.START_LOADING:
            newState = Object.assign({}, state, { isLoadingData: true });
            return newState;
        case ActionTypes.STOP_LOADING:
            newState = Object.assign({}, state, { isLoadingData: false });
            return newState;
        case ActionTypes.SET_ERROR:
            newState = Object.assign({}, state, { error: action.error });
            return newState;
        case ActionTypes.SET_FILTER:
            newState = Object.assign({}, state, { filter: action.filter });
            return newState;
        default:
            return state;
    }
};

export default function create() {
    let store = createStore(reducer);

    // store.subscribe(function () {
    //     console.log("store changed", store.getState());
    // });

    return store;
}
