import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Header from '../../componets/Header';
import Footer from '../../componets/Footer';
import Loader from '../../componets/Loader';
import {ThemeLanguageContext} from '../../context';

import {connect} from 'react-redux';
import {getAuсtionList} from '../../AC';
import {mapToArr} from '../../helpers';

import {
    LINKS_LANDING_AUCTION, LINKS_CATALOG
} from '../../links';

class Catalog extends Component {
  static contextType = ThemeLanguageContext;

  componentDidMount() {
        if (!this.props.auctions.isLoaded) {
            this.props.getAuсtionList();
        }
    }

    render() {
        const {auctions} = this.props;
        if (!auctions.isLoaded) {
            return (
                <Loader/>
            )
        }
        else {
            return (
                <div>
                    <Header title={this.context.title_active_auction}/>
                    <div className="catalog-list">
                        <h1>{this.context.landing_active_text_top}</h1>

                        <div className="catalog-list_in">
                            {
                                mapToArr(auctions.entities).map((auction) =>
                                    <Link key={auction.id} className="catalog-item" to={`${LINKS_LANDING_AUCTION}/${auction.id}`}>
                                        <span className="preview"><img src={auction.photo} alt={auction.name}/></span>
                                        <div className="name">{auction.name}</div>
                                        <div className="center">
                                            <div className="last-cash">{auction.currency}{auction.full_price}</div>
                                            <div className="cash">{auction.currency}{auction.current_price}</div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>

                        <p>{this.context.landing_active_text_bottom}</p>
                        <Link className="btn btn-blue" to={`${LINKS_CATALOG}/list`}>{this.context.go_to_auction}</Link>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
}

export default connect((state) => {
        return {
            auctions: state.auctions,
        }
    }, {getAuсtionList}, null
)(Catalog);
