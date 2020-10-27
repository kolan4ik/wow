import React, {Component} from 'react';
import Slider from "react-slick";
import {connect} from 'react-redux'
import {getAuсtionInfo} from '../../AC'
import {Redirect} from "react-router-dom";
import {  CSSTransition, TransitionGroup } from 'react-transition-group';
import Swipe from 'react-easy-swipe';

import {ThemeLanguageContext} from '../../context'

import {LINKS_LOGIN_DIFFERENT} from "../../links"

import Header from '../../componets/Header';
import Footer from '../../componets/Footer';
import Loader from '../../componets/Loader';

import sliderImg from "./slider-1.png";


class Home extends Component {
    static contextType = ThemeLanguageContext;

    constructor(props) {
        super(props);

        this.state = {
            auction_id: '',
            bid: null,
            historyUser: [],
            seconds: null,
            minutes: null,
            hours: null,
            counterVisibleUser: 4,
            visibleNotification: true,
            lastBid: false,
            clearLastBid: null,
            isActiveHistory: '',
            isLast: false,
            socket: false,
            isActiveColor: "",
        };

        this.handleHideNotification = this.handleHideNotification.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
        this.handleBid = this.handleBid.bind(this);
        this.handleActiveColor = this.handleActiveColor.bind(this);
        this.onSwipeMove = this.onSwipeMove.bind(this);
    };

    componentDidMount() {
        const _th = this;
        clearTimeout(_th.timerInitSocet)
        if(!this.state.hours && _th.props.auction.isLoaded){
            this.getTime(_th.props.auction.entities.endtime)
            _th.isTimer = setInterval(() => {
                _th.setState(prevState => (
                    {
                        seconds: prevState.seconds > 0 ? parseInt(prevState.seconds) < 11 ? "0" + (parseInt(prevState.seconds) - 1) : parseInt(prevState.seconds) - 1 : 60,
                    }
                ))
            }, 1000)
        }

        if (!_th.props.auction.isLoaded) {
            _th.props.getAuсtionInfo(1);
        }

        _th.timerInitSocet = setTimeout(() => {
            this.initSocket();
        }, 100)

    }

    componentWillUnmount() {
        this.socket.close();
        clearTimeout(this.clearLastBid);
        clearTimeout(this.state.clearLastBid);
        clearInterval(this.isTimer);
        clearTimeout(this.timerInitSocet)
    }

    initSocket() {
        this.socket = new WebSocket("wss://test.wowbids.club/ws/1");
        const _th = this;

        this.socket.onmessage = function (event) {
            clearInterval(_th.isTimer);
            const newHistory = _th.state.historyUser;
            const socedData = JSON.parse(event.data);
            const bidsArr = socedData.bids[0];
            _th.getTime(bidsArr.timestamp);
            _th.setState({
                isActiveHistory: '',
                auction_id: socedData.auction_id,
                bid: socedData.bids[0].bid,
                historyUser: [Object.assign({}, bidsArr)].concat(newHistory),
                lastBid: bidsArr,
                isLast: false,
            })

            _th.setState({
                clearLastBid: setTimeout(function () {
                    _th.setState({
                        lastBid: false
                    })
                }, 999)
            });


            _th.isTimer = setInterval(() => {
                _th.setState(prevState => (
                    {
                        seconds: prevState.seconds > 0 ? parseInt(prevState.seconds) < 11 ? "0" + (parseInt(prevState.seconds) - 1) : parseInt(prevState.seconds) - 1 : 60,
                    }
                ))
            }, 1000)

        };


    }

    getTime(time) {

        const compareDate = new Date(time * 1000);
        compareDate.setDate(compareDate.getDate());

        const now = new Date();
        const difference = compareDate.getTime() - now.getTime();

        if (difference > 0) {
            const seconds = Math.floor(difference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            //const days = Math.floor(hours / 24);


            this.setState({
                seconds: seconds % 60 < 11 ? "0" + (seconds % 60) : seconds % 60,
                minutes: minutes % 60 < 11 ? "0" + minutes % 60 : minutes % 60,
                hours: hours % 24,
            })
        }
    }

    handleShowMore() {
        this.setState({
            counterVisibleUser: this.state.counterVisibleUser + 10
        })
    }

    handleHideNotification() {
        localStorage.setItem('showNotification', false);
        this.setState({
            visibleNotification: false
        })
    }

    handleActiveHistory = id => {
        clearTimeout(this.ActiveVisibleInfo)
        this.setState({
            isActiveHistory: id
        })

        this.ActiveVisibleInfo = setTimeout(()=> {
            this.setState({
                isActiveHistory: ''
            })
        }, 2000)
    }

    getHistory() {
        const {historyUser, counterVisibleUser, isActiveHistory} = this.state;
        const {auction} = this.props;
        const allHistory = historyUser.concat(auction.entities.compact_history)
        return (
            <div className="bidding-history">
                <div className="title">{this.context.bidding_history}</div>
                <TransitionGroup component="ul">
                    {
                        allHistory.slice(0, counterVisibleUser).map((user) => {
                            var {timestamp} = user;
                            return (
                                <CSSTransition
                                    timeout={200}
                                    classNames="history-item"
                                    key={user.timestamp}
                                >
                                    <li className="history-item">
                                        <div className="cash">{auction.entities.currency}{user.bid || user.price}</div>
                                        <div onClick={e => this.handleActiveHistory(timestamp)} className="photo"><img
                                            src={user.photo} alt={user.username}/></div>
                                        <div onClick={e => this.handleActiveHistory(timestamp)}
                                             className="name">{user.username}</div>


                                        <CSSTransition
                                            in={isActiveHistory === timestamp}
                                            timeout={200}
                                            unmountOnExit
                                            classNames="drop-info-user">
                                            <div className="drop-info-user">
                                                <ul>
                                                    <li><i
                                                        className="icon-bids"></i><b>233</b> {this.context.userinfo_bids_made}
                                                    </li>
                                                    <li><i
                                                        className="icon-auctions"></i><b>12</b> {this.context.auctions}
                                                    </li>
                                                    <li><i
                                                        className="icon-wins"></i><b>2</b> {this.context.userinfo_wins}
                                                    </li>
                                                </ul>
                                            </div>
                                        </CSSTransition>
                                    </li>
                                </CSSTransition>
                            )
                        }, this)
                    }
                </TransitionGroup>
                {
                    allHistory.length > counterVisibleUser
                    && <button onClick={this.handleShowMore} className="btn btn-more">{this.context.view_more}</button>

                }
            </div>
        )
    }

    getLastBid() {
        const {lastBid} = this.state;
        const {auction} = this.props;
        return (
            lastBid.username &&
            <div className="last-bid">
                <div className="preview">
                    <i className="icon-info"></i>
                </div>
                <div className="cash">{auction.entities.currency}{lastBid.bid}</div>
                <div className="last-bid-name">{lastBid.username}</div>
            </div>
        )
    }

    getNotification() {
        return <CSSTransition classNames="my-node"
            in={this.state.visibleNotification && !localStorage.getItem('showNotification')}
            unmountOnExit
            timeout={11300}>
            <div className="notification">
                <i onClick={this.handleHideNotification} className="icon-close"></i>
                <div dangerouslySetInnerHTML={{__html: this.context.new_popup}}></div>
            </div>
        </CSSTransition>
    }

    handleBid() {
        if (this.state.isLast) return
        const _th = this;
        _th.setState({
            isLast: true,
            historyUser: [Object.assign({}, {
                bid: _th.state.bid,
                id: _th.props.user.entities.email,
                photo: _th.props.user.entities.email,
                timestamp: new Date().getTime(),
                username: "You"
            })].concat(_th.state.historyUser)
        })

    }

    handleActiveColor(color) {
        this.setState({
            isActiveColor: color
        })

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const _th = this;
        clearTimeout(this.isTimer);
        if (nextProps.auction.entities.endtime !== this.props.auction.entities.endtime) {
            _th.setState({
                bid: nextProps.auction.entities.current_price
            });
            _th.getTime(nextProps.auction.entities.endtime)
        }
        _th.isTimer = setInterval(() => {
            _th.setState(prevState => (
                {
                    seconds: prevState.seconds > 0 ? parseInt(prevState.seconds) < 11 ? "0" + (parseInt(prevState.seconds) - 1) : parseInt(prevState.seconds) - 1 : 60,
                }
            ))
        }, 1000)

    }

    onSwipeMove() {
       this.setState({
           lastBid: false
       })
    }

    getBody() {
        const {auction, user} = this.props;
        const settings = {
            infinite: true,
            arrows: false,
            slidesToScroll: 1,
            variableWidth: true,
        };

        if (!auction.isLoaded) {
            return <Loader/>
        }

        if (this.state.isLast && !user.isLoaded) {
            return <Redirect to={LINKS_LOGIN_DIFFERENT}/>
        }

        return (
            <div className="auction-in">

                <Swipe
                    onSwipeMove={this.onSwipeMove}
                >
                    {this.getLastBid()}
                </Swipe>

                <div className="name">{auction.entities.name}</div>
                <div className="color">
                    <p>{this.context.colors_text}</p>
                    <ul>
                        {
                            auction.entities.color_variants.map(color => {
                                const divStyle = {
                                    backgroundColor: color.hex_color,
                                };
                                return <li className={this.state.isActiveColor === color.hex_color ? 'active': ''} style={divStyle} onClick={e => this.handleActiveColor(color.hex_color)} key={color.id}></li>
                            }, this)
                        }
                    </ul>
                </div>
                <Slider {...settings} className="auction-carousel">
                    <div className="carousel-item">
                        <span><img src={sliderImg} alt="sldierImg"/></span>
                    </div>
                    <div className="carousel-item">
                        <span><img src={sliderImg} alt="sldierImg"/></span>
                    </div>
                    <div className="carousel-item">
                        <span><img src={sliderImg} alt="sldierImg"/></span>
                    </div>
                    <div className="carousel-item">
                        <span><img src={sliderImg} alt="sldierImg"/></span>
                    </div>
                    <div className="carousel-item">
                        <span><img src={sliderImg} alt="sldierImg"/></span>
                    </div>
                </Slider>
                <div className="auction-in_cash">
                    <div className="total">
                        {auction.entities.currency}{!this.state.bid ? auction.entities.current_price: this.state.bid}

                        {
                            this.getNotification()
                        }

                    </div>
                    <div
                        className="full-price">{this.context.instead_price.replace('{price}', `${auction.entities.currency}${auction.entities.full_price}`)}</div>
                </div>
                <div className="text">{auction.entities.description}</div>
                <div className="action-timer">
                    <ul>
                        <li>{this.context.timer_hrs}&nbsp;&nbsp;&nbsp; <span>{this.state.hours}:</span></li>
                        <li>{this.context.timer_min}&nbsp;&nbsp;&nbsp; <span>{this.state.minutes}:</span></li>
                        <li>{this.context.timer_sec} <span>{this.state.seconds}</span></li>
                    </ul>
                </div>

                <button
                    onClick={this.handleBid}
                    className={`${this.state.isLast && 'active'} btn btn-blue`}>
                    {
                        this.state.isLast ? "You are the last bidder" : `${this.context.bid_button} ${auction.entities.currency}${!this.state.bid ? auction.entities.current_price: this.state.bid}`
                    }
                </button>

                {this.getHistory()}
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header title={this.context.title_wowbids_auction}/>
                {this.getBody()}
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auction: state.auction,
        user: state.user
    }
}

export default connect(mapStateToProps, {getAuсtionInfo}
)(Home)