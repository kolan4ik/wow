import { combineReducers } from 'redux'
import user  from './user'
import auction  from './auction'
import winners  from './winners'
import setting  from './setting'
import activity  from './activity'
import auctions  from './auctions'
import bidpacks  from './bidpacks'
import login  from './login'
import language  from './language'

export default combineReducers({
    user,
    auction,
    winners: winners,
    setting,
    activity,
    auctions,
    bidpacks,
    login,
    language,
})