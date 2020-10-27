import React, {Component} from 'react';
import {ThemeLanguageContext} from '../../context'
import {logIn} from '../../AC'
import {connect} from 'react-redux'

import {Link, Redirect} from 'react-router-dom';
import Header from '../../componets/Header';
import {LINKS_LOGIN_DIFFERENT, LINKS_HOME} from '../../links';
import users from "./user.png"

class Login extends Component {
    static contextType = ThemeLanguageContext;

    onSubmit(e) {
        e.preventDefault();
        this.props.logIn({
            email: this.props.user.entities.email,
            password: this.state.password
        })
    }

    render() {
        const {
            title_wowbids_login,
            login_welcome,
            login_please,
            password,
            login_continue,
            login_different_user} = this.context;
        if (this.props.isLogin) {
            return <Redirect to={LINKS_HOME}/>
        }
        return (
            <div>
                <Header title={title_wowbids_login}/>
                <div className="login_in login_in--last">
                    <div>
                        <div className="photo-user">
                            <img src={users} alt="John"/>
                        </div>
                        <div className="title">{login_welcome} {this.props.user.entities.username}, <br/>
                            {login_please}</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-item">
                                <input type="password" placeholder={password}/>
                            </div>
                            <button className="btn btn-blue">{login_continue}</button>
                            <Link to={LINKS_LOGIN_DIFFERENT}>{login_different_user}</Link>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect((state) => {
        return {
            user: state.user,
            isLogin: state.login.isLoaded,
        }
    }, {logIn}
)(Login);

