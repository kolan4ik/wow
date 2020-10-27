import React, {Component} from 'react';
import Moment from 'react-moment';

import {Link} from 'react-router-dom';

import {ACTIVITY_TITLE_PAGE, ACTIVITY_LIVE} from '../../text';
import {LINKS_HOME} from '../../links';

import Header from '../../componets/Header';
import Loader from '../../componets/Loader';
import {ThemeLanguageContext} from '../../context'

import {connect} from 'react-redux'

import {getActivity} from '../../AC'

class Activity extends Component {
static contextType = ThemeLanguageContext;

    componentDidMount() {
        if (!this.props.isLoaded) {
            this.props.getActivity()
        }
    }

    mapToArr(obj) {
        return obj.valueSeq().toArray()
    }

    render() {
        const {activity} = this.props;
        if (!activity.isLoaded) {
            return <Loader/>
        }
        return (
            <div>
                <Header title={ACTIVITY_TITLE_PAGE}/>
                <div className="bidding-list">
                    {
                        this.mapToArr(activity.entities).map((item) => {
                            return <div key={item.details.id} className="bidding-item">
                                <div className="preview">
                                    <img src={item.details.photo} alt={item.details.name}/>
                                </div>
                                <div className="center">
                                    <div className="status">{ACTIVITY_LIVE}</div>
                                    <div className="product">{item.details.name}</div>
                                    <div className="cash">
                                        <div
                                            className="last-cash">{item.details.currency}{item.details.full_price}</div>
                                        {item.details.currency}{item.details.current_price}
                                    </div>
                                </div>
                                <div className="bidding-item_history">
                                    <ul>
                                        {
                                            item.my_bids.map((bid) => {
                                                return <li key={bid.timestamp}>
                                                    <div className="name">
                                                        <Moment format="MMM D, YYYY h:mm:ss" unix>{bid.timestamp}</Moment></div>
                                                    <div className="cash">{item.details.currency}{bid.bid}</div>
                                                </li>
                                            })
                                        }
                                    </ul>
                                    {
                                        item.my_bids.length > 3 && <button className="btn btn-more">11{this.context.view_more}</button>
                                    }

                                </div>
                            </div>
                        })
                    }
                    {/*<div className="bidding-item">
                        <div className="preview">
                            <img src={productImg} alt="Iphone XS Max 256GB"/>
                        </div>
                        <div className="center">
                            <div className="status">{ACTIVITY_LIVE}</div>
                            <div className="product">Iphone XS Max 256GB</div>
                            <div className="cash">
                                <div className="last-cash">$1234.99</div>
                                $34.99
                            </div>
                        </div>
                        <div className="bidding-item_history">
                            <ul>
                                <li>
                                    <div className="name">June 07, 2019 15:34:05</div>
                                    <div className="cash">$32.54</div>
                                </li>
                                <li>
                                    <div className="name">June 07, 2019 15:34:05</div>
                                    <div className="cash">$32.54</div>
                                </li>
                                <li>
                                    <div className="name">June 07, 2019 15:34:05</div>
                                    <div className="cash">$32.54</div>
                                </li>
                            </ul>
                            <button className="btn btn-more">{this.context.view_more}</button>
                        </div>
                    </div>
                    <div className="bidding-item bidding-item--finished">
                        <div className="preview">
                            <img src={productImg} alt="Iphone XS Max 256GB"/>
                        </div>
                        <div className="center">
                            <div className="status">{ACTIVITY_FINISHED}</div>
                            <div className="product">Iphone XS Max 256GB</div>
                            <div className="cash">
                                <div className="last-cash">$1234.99</div>
                                $34.99
                            </div>
                        </div>

                        <div className="bidding-item_history">
                            <ul>
                                <li>
                                    <div className="name">June 07, 2019 15:34:05</div>
                                    <div className="cash">$32.54</div>
                                </li>
                                <li>
                                    <div className="name">June 07, 2019 15:34:05</div>
                                    <div className="cash">$32.54</div>
                                </li>
                            </ul>
                        </div>
                    </div>*/}
                </div>
                <Link className="btn btn-blue" to={LINKS_HOME}>{this.context.back_to_auction}</Link>
            </div>
        );
    }
}

export default connect((state) => {
        return {
            activity: state.activity
        }
    }, {getActivity}, null
)(Activity);
