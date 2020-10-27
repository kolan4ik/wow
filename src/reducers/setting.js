import {LOAD_SETTING, SUCCESS} from '../constants.js'
import {OrderedMap, Record} from 'immutable';


const SettingRecord = Record({
    push_notifications: null,
    email_notifications: null,
    email_news: null,
    homescreen: null
});

const SettingState = Record({
    entities: new OrderedMap({}),
    isLoaded: false
});

const defaultState = new SettingState();


export default (setting = defaultState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOAD_SETTING + SUCCESS:
            return setting
                .update('entities', entities => new SettingRecord(payload.response.data).merge(entities))
                .set('isLoaded', true);
        default:
            return setting;
    }
}