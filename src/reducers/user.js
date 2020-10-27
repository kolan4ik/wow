import {LOAD_USER, SUCCESS} from '../constants.js'
import {OrderedMap, Record} from 'immutable';


const UsersRecord = Record({
    email: "",
    username: "",
    photo: "",
    language: "",
    password: "pass",
    bids_left: ""
});

const UsersState = Record({
    entities: new OrderedMap({}),
    isLoaded: false
});

const defaultState = new UsersState();


export default (user = defaultState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOAD_USER + SUCCESS:
            return user
                .update('entities', entities => new UsersRecord(payload.response.data).merge(entities))
                .set('isLoaded', true);

        default:
            return user;
    }
}