import {LOAD_BIDPACKS, SUCCESS} from '../constants.js'
import {OrderedMap, Record} from 'immutable';

import {arrToMap} from '../helpers'


const BidsRecord = Record({
    id: null,
    photo: null,
    name: null,
    price: null,
    taxes: null,
    bids_value: null,
    stars: null,
    currency: null,

})

const BidsState = Record({
    entities: new OrderedMap({}),
    isLoaded: false
});

const defaultState = new BidsState();

export default (bidpacks = defaultState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOAD_BIDPACKS + SUCCESS:
            return bidpacks
                .update('entities', entities => arrToMap(payload.response.data, BidsRecord).merge(entities))
                .set('isLoaded', true);
        default:
            return bidpacks;
    }
}