import {LOAD_LANGUAGE, SUCCESS} from '../constants.js'
import {Record} from 'immutable';


const LanguageState = Record({
    entities: null,
    isLoaded: false
});

export default (language = new LanguageState(), action) => {
    const {type, payload} = action;
    switch (type) {
        case LOAD_LANGUAGE + SUCCESS:
            return language
                .set('entities', payload.response.data)
                .set('isLoaded', true);
        default:
            return language;
    }
}

