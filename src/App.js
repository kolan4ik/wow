import React, {Component} from 'react';


import Loader from './componets/Loader';
import Routing from './Routing';
import Menu from './componets/Menu';
import CookiesConsent from './componets/Cookies';
import { createBrowserHistory } from 'history';


import './App.scss';

import {withCookies, CookiesProvider} from 'react-cookie';

import {connect} from 'react-redux'
import {getLanguage} from './AC'

import {ThemeLanguageContext} from './context';

import {BrowserRouter, HashRouter as Router} from "react-router-dom";


class App extends Component {
    constructor(props) {
        super(props);
        const {cookies} = props;

        this.state = {
            language: 'eng',
            isLoginned: false,
            isVisibleCookie: cookies.get('We_value_Your_Privacy') !== "true"
        };

        this.setLanguage = this.setLanguage.bind(this);
        this.handleHideCookie = this.handleHideCookie.bind(this);
    };

    setLanguage(land) {
        this.setState({
            language: land
        });
        this.props.getLanguage(land);
    }

    handleHideCookie() {
        const {cookies} = this.props;
        cookies.set('We_value_Your_Privacy', true, {path: '/'});

        this.setState({
            isVisibleCookie: false
        });
    }


    componentDidMount() {
        if (!this.props.isLoaded) {
            this.props.getLanguage(this.state.language);
        }
    }

    render() {
        const {isLoaded, language} = this.props;

        if (!isLoaded) {
            return <Loader/>
        }

        return (
            <ThemeLanguageContext.Provider value={language}>
                <CookiesProvider>
                    <div className="App">
                        <BrowserRouter history={createBrowserHistory}>
                            <Router>
                                <Menu
                                    setLanguage={this.setLanguage}
                                    language={this.state.language}
                                />
                                <Routing
                                    isLogin={this.props.isLogin}
                                />

                                {this.state.isVisibleCookie &&
                                <CookiesConsent handleHideCookie={this.handleHideCookie}/>}
                            </Router>
                        </BrowserRouter>
                    </div>
                </CookiesProvider>
            </ThemeLanguageContext.Provider>
        );
    }
}

export default connect((state) => {
        return {
            language: state.language.entities,
            isLoaded: state.language.isLoaded,
            isLogin: state.login.isLoaded,
        }
    }, {getLanguage}
)(withCookies(App))