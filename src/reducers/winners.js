import {LOAD_WINNERS, SUCCESS} from '../constants.js'
import {arrToMap} from '../helpers'
import {OrderedMap, Record} from 'immutable';

const WinnersRecord = Record({
    details: null,
    user: null,
    comment: null
});

const WinnersState = Record({
    entities: new OrderedMap({}),
    isLoaded: false
});

const defaultState = new WinnersState();


export default (winners = defaultState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOAD_WINNERS + SUCCESS:
            return winners
                .update('entities', entities => arrToMap(payload.response.data, WinnersRecord).merge(entities))
                .set('isLoaded', true);
        default:
            return winners;
    }
}