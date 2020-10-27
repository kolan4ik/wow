import React, {Component} from 'react';
import {ThemeLanguageContext} from '../../context'

import Header from '../../componets/Header';
import {Link, Redirect} from 'react-router-dom'

import {LINKS_REGISTRATION, LINKS_HOME} from '../../links'

import {logIn} from '../../AC'
import {connect} from 'react-redux'

class LoginDifferent extends Component {
    static contextType = ThemeLanguageContext;

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    };

    onSubmit(e) {
        e.preventDefault()
        this.props.logIn({
            "email": this.state.login,
            "password": this.state.password
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render() {
        const {
            title_wowbids_login,
            login,
            password,
            signup,
            login_continue,
            login_noaccount} = this.context;

        if (this.props.isLogin) {
            return <Redirect to={LINKS_HOME}/>
        }

        //const {login, errors, password, isLoading,} = this.state;
        return (
            <div>
                <Header title={title_wowbids_login}/>
                <div className="login_in">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-item">
                            <input
                                onChange={this.onChange}
                                name="login"
                                type="text"
                                placeholder={login}/>
                        </div>
                        <div className="form-item">
                            <input
                                onChange={this.onChange}
                                name="password"
                                type="password"
                                placeholder={password}/>
                        </div>
                        <button className="btn btn-blue">{login_continue}</button>
                        <p>{login_noaccount} <Link to={LINKS_REGISTRATION}>{signup}</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
        return {
            isLogin: state.login.isLoaded,
        }
    }, {logIn}
)(LoginDifferent);
