import { combineReducers } from 'redux';

import * as reducers from './reducers';

//const allReducers = Object.assign({},alert, users, secretariat);

const rootReducer = combineReducers(reducers);

export default rootReducer;