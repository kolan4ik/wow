import {LOAD_AUTORIZATION, LOAD_REG, SUCCESS} from '../constants.js'

import {Record} from 'immutable';


const LoginState = Record({
    entities: null,
    isLoaded: false
});


export default (login = new LoginState(), action) => {
    const {type, payload} = action;
    switch (type) {
        case LOAD_AUTORIZATION + SUCCESS:
            return login
                .set('entities', payload.response.data)
                .set('isLoaded', true);

        case LOAD_REG + SUCCESS:
            return login
                .set('entities', payload.response.data)
                .set('isLoaded', true);
        default:
            return login;
    }
}