import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './content/css/bootstrap-rtl.min.css'
import { store } from './_helpers';
import { App } from './App/App';
import I18n from "redux-i18n"
import './_services/utils/interceptors';

import {translations} from "../src/locales/translations"
render(
    <Provider store={store}>
        <I18n translations={translations}  >
            <App />
        </I18n>
    </Provider>,
    document.getElementById('root')
);