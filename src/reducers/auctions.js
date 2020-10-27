import {LOAD_AUCTION_LIST, SUCCESS} from '../constants'
import {arrToMap} from '../helpers'

import {OrderedMap, Record} from 'immutable';

const AuctionsRecord = Record({
    id: '',
    currency: "",
    current_price: null,
    endtime: null,
    full_price: null,
    name: "",
    photo: [],
    total_bidders: null,
});

const AuctionsState = Record({
    entities: new OrderedMap({}),
    isLoaded: false
});

const defaultState = new AuctionsState();

export default (auctions = defaultState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOAD_AUCTION_LIST + SUCCESS:
            return auctions
                .update('entities', entities => arrToMap(payload.response.data, AuctionsRecord).merge(entities))
                .set('isLoaded', true);
        default:
            return auctions;
    }
}