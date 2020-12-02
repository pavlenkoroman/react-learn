import thunk from "redux-thunk";
import appReducer from "./app-reducer";

const { createStore, combineReducers, applyMiddleware } = require("redux");


let reducers = combineReducers({
    appReducer: appReducer
})

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store

export default store;