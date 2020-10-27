import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";

import {connect} from 'react-redux'
import {getAuсtionList} from '../../AC'
import {ThemeLanguageContext} from '../../context'

import Header from '../../componets/Header';
import Footer from '../../componets/Footer';
import Loader from '../../componets/Loader';
import {mapToArr} from '../../helpers';

import {
    LINKS_CATALOG, LINKS_LANDING_AUCTION
} from '../../links';

class Landing extends Component {
    static contextType = ThemeLanguageContext;

    componentDidMount() {
        if (!this.props.auctions.isLoaded) {
            this.props.getAuсtionList();
        }
    }


    render() {
        const settings = {
            infinite: false,
            arrows: false,
            slidesToScroll: 1,
            variableWidth: true,
        };

        const {auctions} = this.props;

        if (!auctions.isLoaded) {
            return (
                <Loader/>
            )
        }
        else {
            return (
                <div>
                    <Header title={this.context.title_wowbids_auctions}/>
                    <div className="landing">

                        <h1>{this.context.landing_auctions_text}</h1>
                        <div className="landing-list">
                            <Slider {...settings} className="landing-carousel">
                                {
                                    mapToArr(auctions.entities).map((auction) =>
                                        <div key={auction.id} className="carousel-item">
                                            <Link to={`${LINKS_LANDING_AUCTION}/${auction.id}`}>
                                                <span><img src={auction.photo} alt={auction.name}/></span>
                                                <div className="name">{auction.name}</div>
                                                <div className="last-cash">{auction.currency}{auction.full_price}</div>
                                                <div className="cash">{auction.currency}{auction.current_price}</div>
                                            </Link>
                                        </div>
                                    )
                                }
                            </Slider>
                            <Link className="btn btn-blue" to={LINKS_CATALOG}>{this.context.learn_more}</Link>
                        </div>

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
)(Landing);
