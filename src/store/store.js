import {createStore, combineReducers, applyMiddleware} from 'redux';
import { DashboardReducer } from './reducers/DashboardReducer';
import { AuthenticationReducer } from './reducers/AuthenticationReducer';
import thunk from 'redux-thunk'


export const rootReducer = combineReducers({
dashboard: DashboardReducer,
authentication: AuthenticationReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;