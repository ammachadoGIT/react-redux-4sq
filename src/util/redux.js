import { createStore } from "redux";
import { LIST_DATA, START_LOADING, STOP_LOADING, SET_ERROR, SET_FILTER } from "./actions";

const initialState = {
    venues: [],
    isLoadingData: false,
    location: "",
    error: "",
    filter: { radius: 2000 }
};

const reducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LIST_DATA:
            newState = Object.assign({}, state, {
                venues: action.data,
                location: action.data.response.headerFullLocation
            });
            return newState;
        case START_LOADING:
            newState = Object.assign({}, state, { isLoadingData: true });
            return newState;
        case STOP_LOADING:
            newState = Object.assign({}, state, { isLoadingData: false });
            return newState;
        case SET_ERROR:
            newState = Object.assign({}, state, { error: action.error });
            return newState;
        case SET_FILTER:
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

