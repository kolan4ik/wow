import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux'
import {getBids} from '../../AC'
import {ThemeLanguageContext} from '../../context'

import Header from '../../componets/Header';
import Loader from '../../componets/Loader';
import {LINKS_BIDS_ID} from '../../links';
import {mapToArr} from '../../helpers';

import coin from './coin.svg'


class Buy extends Component {

    static contextType = ThemeLanguageContext;

    renderStarList(count) {
        switch (count) {

            case 5:
                return (
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                );
            case 4:
                return (
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                );
            case 3:
                return (
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                );
            case 2:
                return (
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                );
            default:
                return (
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                )
        }

    }


    componentDidMount() {
        if (!this.props.bidpacks.isLoaded) {
            this.props.getBids();
        }
    }

    render() {
        const {bidpacks} = this.props;
        if (!bidpacks.isLoaded) {
            return <Loader/>
        }
        return (
            <div>
                <Header title={this.context.buy_bids}/>
                <div className="bid-packs-list">
                    <h2>{this.context.bid_packs}</h2>
                    {
                        mapToArr(bidpacks.entities).map((bids) => {

                                return <Link to={`${LINKS_BIDS_ID}/${bids.id}`} key={bids.id} className="bid-packs_item">
                                    <div className="preview">
                            <span>
                                <i><img width="34px" src={coin} alt=""/></i>
                                {bids.coin}
                            </span>
                                    </div>
                                    <span className="name">{bids.name}</span>
                                    <span className="cash">{bids.cash}</span>
                                    <div className="star-list">
                                        {
                                            this.renderStarList(bids.stars)
                                        }
                                    </div>
                                </Link>
                            }
                        )
                    }


                </div>
            </div>
        );
    }
}

export default connect((state) => {
        return {
            bidpacks: state.bidpacks,
        }
    }, {getBids}, null
)(Buy);
