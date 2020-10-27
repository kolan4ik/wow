import {LOAD_AUCTION_INFO, SUCCESS} from '../constants.js'
import {OrderedMap, Record} from 'immutable';

const AuctionRecord = Record({
    photo_array: [],
    name: "",
    description: "",
    full_price: 0,
    current_price: 0,
    total_bidders: 0,
    endtime: 0,
    currency: "",
    color_variants: [],
    compact_history: [],
});

const AuctionState = Record({
    entities: new OrderedMap({}),
    isLoaded: false
});

const defaultState = new AuctionState();

export default (auction = defaultState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOAD_AUCTION_INFO + SUCCESS:
            return auction
                .update('entities', entities => new AuctionRecord(payload.response.data).merge(entities))
                .set('isLoaded', true);
        default:
            return auction;
    }
}