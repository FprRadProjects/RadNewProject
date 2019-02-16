import { combineReducers } from 'redux';

import { alert } from './Alert';
import { Common } from './General';
import { dashboards } from './Secretariat';
import { authentication , users } from './Users';
import { projects } from './Projects';
import { MainPage } from './MainPage';
import {i18nState} from 'redux-i18n'

const rootReducer = combineReducers({
    alert,
    Common,
    dashboards,
    authentication, users,
    projects,
    i18nState,
    MainPage,
});

export default rootReducer;