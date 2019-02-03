import { combineReducers } from 'redux';

import { alert } from './Alert';
import { Common } from './General';
import { dashboards } from './Secretariat';
import { authentication , users } from './Users';

const rootReducer = combineReducers({
    alert,
    Common,
    dashboards,
    authentication, users
});

export default rootReducer;