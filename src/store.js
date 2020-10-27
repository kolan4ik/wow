import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers'
import api from './middlewares/api'


const loggerMiddleware = createLogger();

const store  =  createStore(
    reducer,
    {},
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        api
    )
);

window.store = store;

export default store;