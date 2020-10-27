import React from 'react'

import Home from '../componets/Home';
import Terms from '../componets/Terms';
import Buy from '../componets/Buy';
import Cart from '../componets/Cart';
import Setting from '../componets/Setting';
import Success from '../componets/Success';
import Won from '../componets/Won';
import Shipping from '../componets/Shipping';
import Placed from '../componets/Placed';
import LoginDifferent from '../componets/LoginDifferent';
import Login from '../componets/Login';
import Winners from '../componets/Winners';
import Activity from '../componets/Activity';
import Registration from '../componets/Registration';
import Notifications from '../componets/Notifications';
import Landing from '../componets/Landing';
import Auction from '../componets/Auction';
import Catalog from '../componets/Catalog';
import CatalogList from '../componets/CatalogList';
import Legal from '../componets/Legal';
import thankReg from '../componets/ThankReg';


import {
    LINKS_HOME,
    LINKS_LOGIN,
    LINKS_REGISTRATION,
    LINKS_WINNERS,
    LINKS_ACTIVITY,
    LINKS_NOTIFICATIONS,
    LINKS_LOGIN_DIFFERENT,
    LINKS_BIDS_ID,
    LINKS_LEGAL,
    LINKS_BUY,
    LINKS_LEGAL_TERMS,
    LINKS_SETTING,
    LINKS_SUCCESS,
    LINKS_WON,
    LINKS_LANDING_AUCTION,
    LINKS_WON_SHIPPING,
    LINKS_WON_SHIPPING_PLACED,
    LINKS_LANDING,
    LINKS_CATALOG
} from '../links';

import {Route, Switch, Redirect} from "react-router-dom";

function PrivateRoute({component: Component, authed,  ...rest}) {
    return (
        <Route
            {...rest}
            render={props => (
                authed
                    ? <Component {...props} />
                    : <Redirect to={LINKS_LOGIN_DIFFERENT} />
            )}
        />
    );
}

const Routing = (props) => (
    <Switch>
        <Route exact path={LINKS_HOME} component={Home}/>
        <Route exact path={LINKS_LOGIN} component={Login}/>
        <Route exact path={LINKS_REGISTRATION} component={Registration}/>
        <Route exact path={LINKS_WINNERS} component={Winners}/>
        <Route exact path={LINKS_LANDING} component={Landing}/>
        <Route exact path={LINKS_WON} component={Won}/>
        <Route exact path={LINKS_WON_SHIPPING} component={Shipping}/>
        <Route exact path={LINKS_CATALOG} component={Catalog}/>

        <Route path={LINKS_LOGIN_DIFFERENT} component={LoginDifferent}/>
        <Route path={LINKS_BUY} component={Buy}/>
        <Route path={`${LINKS_BIDS_ID}/:id`} component={Cart}/>
        <Route path={LINKS_SUCCESS} component={Success}/>
        <Route path={LINKS_WON_SHIPPING_PLACED} component={Placed}/>
        <Route path={`${LINKS_LANDING_AUCTION}/:id`} component={Auction}/>
        <Route path={`${LINKS_CATALOG}/list`} component={CatalogList}/>

        <PrivateRoute path={LINKS_SETTING} component={Setting} authed={props.isLogin}/>
        <PrivateRoute path={LINKS_NOTIFICATIONS} component={Notifications} authed={props.isLogin}/>
        <PrivateRoute exact path={LINKS_ACTIVITY} component={Activity} authed={props.isLogin}/>
        <PrivateRoute exact path={LINKS_LEGAL} component={Legal} authed={props.isLogin}/>
        <PrivateRoute path={LINKS_LEGAL_TERMS} component={Terms} authed={props.isLogin}/>
        <PrivateRoute path={`${LINKS_REGISTRATION}/done`} component={thankReg} authed={props.isLogin}/>

    </Switch>
);

export default Routing
