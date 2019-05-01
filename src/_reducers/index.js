import { combineReducers } from 'redux';

import { alert } from './Alert';
import { Design } from './Design';
import { Common,Auto_WorkAction,Auto_WorkBasic } from './General';
import { Auto_BasicInfo,Diagram } from './General';
import { dashboards } from './Secretariat';
import { authentication , users } from './Users';
import { projects } from './Projects';
import { MainPage } from './MainPage';
import { loading } from './Loading';
import {i18nState} from 'redux-i18n'
import { BasicInfo } from './BaseInfo';
import { ArchiveAction,ArchiveBasic } from './Archives';

const rootReducer = combineReducers({
    alert,
    loading,
    Design,
    Common,
    dashboards,
    authentication, users,
    projects,
    i18nState,
    MainPage,
    BasicInfo,
    Auto_BasicInfo,
    Auto_WorkAction,
    Auto_WorkBasic,
    Diagram,
    ArchiveAction,
    ArchiveBasic
});

export default rootReducer;
