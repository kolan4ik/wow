import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {ThemeLanguageContext} from '../../context'
import { CSSTransition } from 'react-transition-group';

import {
    NOT_AUTHORIZED_NAME,
    NOT_AUTHORIZED_ID,
} from '../../text'


import {
    LINKS_LOGIN_DIFFERENT,
    LINKS_REGISTRATION,
    LINKS_BUY,
    LINKS_ACTIVITY,
    LINKS_NOTIFICATIONS,
    LINKS_WINNERS,
    LINKS_LEGAL,
    LINKS_SETTING,
} from '../../links'


import {getLogin} from '../../AC'
import {connect} from 'react-redux'
import ava from './ava.svg'


import flagEn from './flag.svg';
import flagRu from './flagRu.svg';
import coin from './coin.svg';

class Menu extends Component {
    static contextType = ThemeLanguageContext;

    constructor(props) {
        super(props);
        this.state = {
            isVisibleNav: false,
            isLoggedIn: false,
            isOpenLanguage: false,
        };

        this.handleCloseLanguage = this.handleCloseLanguage.bind(this);
        this.handleOpenLanguage = this.handleOpenLanguage.bind(this);
        this.handleOpenNav = this.handleOpenNav.bind(this);
        this.handleCloseNav = this.handleCloseNav.bind(this);
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (!this.props.user.isLoaded && this.props.isLogin) {
            this.props.getLogin();
        }
    }

    handleCloseNav(e) {
        this.setState({isVisibleNav: false});
    }

    handleOpenNav() {
        this.setState({isVisibleNav: true});
    }

    handleOpenLanguage(e) {
        if (this.state.isOpenLanguage) {
            this.props.setLanguage(e.target.dataset.language)
        }
        this.setState({isOpenLanguage: !this.state.isOpenLanguage});
    }

    handleCloseLanguage() {
        this.setState({isOpenLanguage: false});
    }

    render() {
        const {user} = this.props;
        const {isOpenLanguage, isVisibleNav} = this.state;
        return (
            <div className="nav">

                <i className="icon-burger" onClick={this.handleOpenNav}></i>
                <CSSTransition
                    in={isVisibleNav}
                    timeout={200}
                    classNames="nav-menu"
                    unmountOnExit
                >
                    <nav className="nav-menu">
                        <div onClick={this.handleCloseNav} className="nav-overlay"></div>
                        <div className="nav-menu_wrap">
                            {
                                !this.props.isLogin && (
                                    <div>
                                        <div className="user-photo">
                                            <img src={ava} alt={NOT_AUTHORIZED_NAME}/>
                                        </div>
                                        <div className="name">{NOT_AUTHORIZED_NAME}</div>

                                        <div className="user-identification">{NOT_AUTHORIZED_ID}</div>

                                        <div className="text">
                                            <p>{this.context.sidebar_punchline}</p>
                                            <p>{this.context.sidebar_please_login}</p>
                                        </div>
                                        <Link onClick={this.handleCloseNav} className="btn btn-blue" to={LINKS_LOGIN_DIFFERENT}>
                                            {this.context.signin}
                                        </Link>
                                        <Link onClick={this.handleCloseNav} className="btn btn-blue" to={LINKS_REGISTRATION}>
                                            {this.context.signup}
                                        </Link>
                                    </div>
                                )
                            }
                            {
                                this.props.isLogin && (
                                    <div>
                                        <Link onClick={this.handleCloseNav} className="user-photo" to={LINKS_SETTING}>
                                            <img src={user.entities.photo} alt={user.entities.username}/>
                                        </Link>
                                        <Link onClick={this.handleCloseNav} className="name" to={LINKS_SETTING}>{user.entities.username}</Link>

                                        <div className="user-identification">ID: delta-cow-maroon</div>

                                        <div className="user-info-cash">
                                            <p><img width="20px" src={coin}
                                                    alt="coin"/> {user.entities.bids_left} {this.context.bids_left}</p>
                                            <Link onClick={this.handleCloseNav} to={LINKS_BUY}>
                                                buy more
                                            </Link>
                                        </div>

                                        <ul className="nav-menu_in">

                                            <li><Link onClick={this.handleCloseNav} to={LINKS_NOTIFICATIONS}><i
                                                className="icon-notifications"></i>{this.context.notifications}</Link>
                                            </li>
                                            <li><Link onClick={this.handleCloseNav} to={LINKS_ACTIVITY}><i
                                                className="icon-activity"></i>{this.context.activity}</Link></li>
                                            <li><Link onClick={this.handleCloseNav} to={LINKS_WINNERS}><i
                                                className="icon-wins"></i>{this.context.title_wowbids_winners}</Link>
                                            </li>
                                            <li><Link onClick={this.handleCloseNav} to={LINKS_LEGAL}><i className="icon-legal"></i>Legal</Link></li>

                                        </ul>
                                    </div>
                                )
                            }

                        </div>
                        <div className={`language ${isOpenLanguage && 'change-language'}`}>
                            <div onClick={this.handleCloseLanguage} className="overlay-language"></div>
                            <ul>
                                <li>
                                    <p className={this.props.language === "ru" ? 'active' : ''}
                                       data-language="ru"
                                       onClick={this.handleOpenLanguage}
                                    ><i className="flag"><img width="20px" src={flagRu}
                                                              alt="Flag"/></i>Русский</p>
                                </li>
                                <li>
                                    <p className={this.props.language === "eng" ? 'active' : ''}
                                       data-language="eng"
                                       onClick={this.handleOpenLanguage}
                                    ><i className="flag"><img width="20px" src={flagEn} alt="Flag"/></i>
                                        English</p>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </CSSTransition>
            </div>

        )
    }
}

export default connect((state) => {
        return {
            user: state.user,
            isLogin: state.login.isLoaded,
        }
    }, {getLogin}
)(Menu);

