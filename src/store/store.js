import {createStore, combineReducers, applyMiddleware} from 'redux';
import { DashboardReducer } from './reducers/DashboardReducer';
import thunk from 'redux-thunk'


export const rootReducer = combineReducers({
dashboard: DashboardReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;