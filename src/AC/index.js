import axios from 'axios'

import {
    LOAD_USER,
    LOAD_AUCTION_INFO,
    LOAD_WINNERS,
    LOAD_SETTING,
    LOAD_SETNOTIFICATION,
    LOAD_LANGUAGE,
    LOAD_ACTIVITY,
    LOAD_AUCTION_LIST,
    LOAD_BIDPACKS,
    LOAD_AUTORIZATION,
    LOAD_REG,
    SUCCESS,
    LOAD_UPDATEPHOTO,
    LOAD_SET_USER_INFO,
    BUY_PACKS,
    FAIL
} from '../constants'

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = 'https://test.wowbids.club';
const userInfo = '/user/info';
const auctionInfo = '/auctions';
const winners = '/winners';
const setting = '/user/settings';
const activity = '/user/activity';
const bidpacks = '/bidpacks';
const authorization = '/user/login';
const registration = '/user/register';
const language = '/language';
const updatePhoto = '/user/updatephoto';
const changeNotification = '/user/settings';
const buyBidUrl = '/order/bids_checkout';

export function getLogin() {
    return (dispatch) => {
        axios.get(proxyurl + url + userInfo)
            .then(response => dispatch({
                type: LOAD_USER + SUCCESS,
                payload: {response}
            }))
            .catch((error) => {
                dispatch({
                    type: LOAD_USER + FAIL,
                })
            })
    }

}

export function getAuсtionList() {

    return (dispatch) => {
        axios.get(proxyurl + url + auctionInfo)
            .then(response => dispatch({
                type: LOAD_AUCTION_LIST + SUCCESS,
                payload: {response}
            }))
            .catch((error) => {
                dispatch({
                    type: LOAD_AUCTION_LIST + FAIL,
                })
            })
    }

}

export function getAuсtionInfo(id) {
    const idResult = !id ? '' : '/' + id;

    return (dispatch) => {
        axios.get(proxyurl + url + auctionInfo + idResult)
            .then(response => dispatch({
                type: LOAD_AUCTION_INFO + SUCCESS,
                payload: {id, response}
            }))
            .catch((error) => {
                dispatch({
                    type: LOAD_AUCTION_INFO + FAIL,
                })
            })
    }

}

export function getWinners() {
    return (dispatch) => {
        axios.get(proxyurl + url + winners)
            .then(response => dispatch({
                type: LOAD_WINNERS + SUCCESS,
                payload: {response}
            }))

            .catch((error) => {
                dispatch({
                    type: LOAD_WINNERS + FAIL,
                })
            })
    }

}

export function getSetting() {
    return (dispatch) => {
        axios.get(proxyurl + url + setting)
            .then(response => dispatch({
                type: LOAD_SETTING + SUCCESS,
                payload: {response}
            }))

            .catch((error) => {
                dispatch({
                    type: LOAD_WINNERS + FAIL,
                })
            })
    }

}

export function getActivity() {
    return (dispatch) => {
        axios.get(proxyurl + url + activity)
            .then(response => dispatch({
                type: LOAD_ACTIVITY + SUCCESS,
                payload: {response}
            }))

            .catch((error) => {
                dispatch({
                    type: LOAD_ACTIVITY + FAIL,
                })
            })
    }

}

export function getBids() {
    return (dispatch) => {
        axios.get(proxyurl + url + bidpacks)
            .then(response => dispatch({
                type: LOAD_BIDPACKS + SUCCESS,
                payload: {response}
            }))

            .catch((error) => {
                dispatch({
                    type: LOAD_BIDPACKS + FAIL,
                })
            })
    }

}

export function logIn(email, password) {
    return (dispatch) => {
        axios.post(proxyurl + url + authorization, {
            "email": "user@example.com",
            "password": "string"
        })
            .then(response => dispatch({
                type: LOAD_AUTORIZATION + SUCCESS,
                payload: {response}
            }))

            .catch((error) => {
                dispatch({
                    type: LOAD_AUTORIZATION + FAIL,
                })
            })
    }
}

export function registrationUser(user) {
    return (dispatch) => {
        axios.post(proxyurl + url + registration, user)
            .then(response => dispatch({
                type: LOAD_REG + SUCCESS,
                payload: {response}
            }))

            .catch((error) => {
                dispatch({
                    type: LOAD_REG + FAIL,
                })
            })
    }

}

export function getLanguage(lang = 'eng') {
    return (dispatch) => {
        axios.get(proxyurl + url + language + "/" + lang)
            .then(response => {
                dispatch({
                    type: LOAD_LANGUAGE + SUCCESS,
                    payload: {
                        response: response
                    }
                })
            })
            .catch((error) => {
                dispatch({
                    type: LOAD_LANGUAGE + FAIL,
                })
            })
    }
}

export function changePhoto(urlImg) {
    return (dispatch) => {
        axios.post(proxyurl + url + updatePhoto + '?photo=' + urlImg)
            .then(response => dispatch({
                type: LOAD_UPDATEPHOTO + SUCCESS,
                payload: {response}
            }))
            .catch((error) => {
                dispatch({
                    type: LOAD_UPDATEPHOTO + FAIL,
                })
            })
    }
}

export function setNotification(notification) {
    return (dispatch) => {
        axios.put(proxyurl + url + changeNotification, notification)
            .then(response => dispatch({
                    type: LOAD_SETNOTIFICATION + SUCCESS,
                    payload: {response}
                })
            )
            .catch((error) => {
                dispatch({
                    type: LOAD_SETNOTIFICATION + FAIL,
                })
            })
    }
}

export function setSetting(newEmail, newName, oldPass, newPass) {
    return (dispatch) => {
        axios.put(proxyurl + url + userInfo + "?email=" + newEmail + "&username=" + newName + "&old_password=" + oldPass + "&new_password=" + newPass)
            .then((response) => {
                return dispatch({
                    type: LOAD_SET_USER_INFO + SUCCESS,
                    payload: {response}
                })
            })

            .catch((error) => {
                dispatch({
                    type: LOAD_SET_USER_INFO + FAIL,
                })
            })
    }
}

export function buyBid(id, count) {
    return (dispatch) => {
        axios.post(proxyurl + url + buyBidUrl, {
            "id": id,
            "count": count
        })
            .then(response => dispatch({
                type: BUY_PACKS + SUCCESS,
                payload: {response}
            }))

            .catch((error) => {
                dispatch({
                    type: LOAD_AUTORIZATION + FAIL,
                })
            })
    }
}

