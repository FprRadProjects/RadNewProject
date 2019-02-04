import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App/App';
import './content/css/bootstrap-rtl.min.css'
import './content/css/main.css'

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);