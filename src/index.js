import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import { App } from './App/App';
import I18n from "redux-i18n"
import './_webservices/utils/interceptors';

import { translations } from "../src/locales/translations"

import { CookiesProvider } from 'react-cookie';

window.RenderApp = (config) => {
    render
        (
            <CookiesProvider>
                <Provider store={store}>
                    <I18n translations={translations}  >
                        <App _config={config} />
                    </I18n>
                </Provider>
            </CookiesProvider>,
            document.getElementById('root')
        )
};

