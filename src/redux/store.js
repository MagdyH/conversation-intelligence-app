import {createStore, combineReducers, applyMiddleware} from "redux";
import playerReducer from './reducers/playerReducer';
import thunk from 'redux-thunk';

const combined =  combineReducers({playerReducer})  ; 
const store = createStore(combined,applyMiddleware(thunk));

export default store;