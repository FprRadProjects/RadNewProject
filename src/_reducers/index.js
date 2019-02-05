import { combineReducers } from 'redux';

import { alert } from './Alert';
import { Common } from './General';
import { dashboards } from './Secretariat';
import { authentication , users } from './Users';
import { projects } from './Projects';

const rootReducer = combineReducers({
    alert,
    Common,
    dashboards,
    authentication, users,
    projects
});

export default rootReducer;