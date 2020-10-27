import {LOAD_ACTIVITY, SUCCESS} from '../constants.js'
import {OrderedMap, Map, Record} from 'immutable';


const ActivityRecord = Record({
    details: {
        photo: null,
        name: null,
        full_price: null,
        current_price: null,
        total_bidders: null,
        endtime: null,
        currency: null,
        id: null
    },
    my_bids: null
});

const ActivityState = Record({
    entities: new OrderedMap({}),
    isLoaded: false
});

const arrToMap = function (arr, DataRecord = Map) {
    return arr.reduce((acc, item) =>
            acc.set(item.details.id, new DataRecord(item))
        , new OrderedMap({}))
};

export default (activity = new ActivityState(), action) => {
    const {type, payload} = action;
    switch (type) {
        case LOAD_ACTIVITY + SUCCESS:
            return activity
                .update('entities', entities => arrToMap(payload.response.data, ActivityRecord).merge(entities))
                .set('isLoaded', true);
        default:
            return activity;
    }
}

