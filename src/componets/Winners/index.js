import React, {Component} from 'react';
import Moment from 'react-moment';
import {ThemeLanguageContext} from '../../context'


import Header from '../../componets/Header';
import Loader from '../../componets/Loader';

import {Link} from 'react-router-dom';

import {LINKS_HOME} from '../../links';

import {getWinners} from '../../AC'
import {connect} from 'react-redux'

class Winners extends Component {
    static contextType = ThemeLanguageContext;

    componentDidMount() {
        if (!this.props.winners.isLoaded) {
            this.props.getWinners()
        }
    }

    render() {
        const {winners} = this.props;

        if (!this.props.winners.isLoaded) {
            return <Loader/>
        }
        return (
            <div>
                <Header title={this.context.title_wowbids_winners}/>
                <div className="winners-list">
                    {
                        winners.entities.map(win => {
                            return (
                                <div key={win.details.endtime} className="winners-item">
                                    <div className="preview">
                                        <div className="date">
                                            <Moment format="MMM D, YYYY" unix>{win.details.endtime}</Moment>
                                        </div>
                                        <div className="product">{win.details.name}</div>
                                        <div className="cash">{win.details.currency}{win.details.current_price}</div>
                                        <div className="last-cash">instead of {win.details.full_price} regular price
                                        </div>
                                        <img src={win.details.photo} alt={win.details.name}/>
                                    </div>
                                    <div className="winners-comments">
                                        <div className="winners-comments_top">
                                            <div className="photo"><img src={win.user.photo} alt={win.user.username}/>
                                            </div>
                                            <div className="name">{win.user.username}</div>
                                        </div>
                                        <p>{win.comment}</p>
                                        <Link to="#">{this.context.continue_reading} <i className="icon-link-arr"></i></Link>
                                    </div>
                                </div>
                            )
                        }).toList()
                    }
                </div>
                <div className="text-in">
                    <Link to={LINKS_HOME} className="btn btn-blue">{this.context.back_to_auction}</Link>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
        return {
            winners: state.winners,
        }
    }, {getWinners}
)(Winners);