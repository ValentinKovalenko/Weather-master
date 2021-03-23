import {applyMiddleware, createStore, compose} from "redux";
import {mainReducer} from "./reducers/mainReducer";
import thunk from "redux-thunk";

export const store = createStore(mainReducer, compose(applyMiddleware(thunk)))