import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {} from 'react-cookie';


import './index.css';
import App from './App';
import store from './store';


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));