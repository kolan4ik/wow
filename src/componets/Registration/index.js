import React, {Component} from 'react';
import {ThemeLanguageContext} from '../../context'

import Header from '../../componets/Header';

import {connect} from 'react-redux'
import {registrationUser} from '../../AC'

import {
    LINKS_REGISTRATION,
} from '../../links';

import {Redirect} from 'react-router'

class Registration extends Component {
    static contextType = ThemeLanguageContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            login: '',
            password: '',
            confirmPassword: '',
            polit1: false,
            polit2: false,
            validPass: true,
            validPolit1: true,
            validPolit2: true,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handlePolit = this.handlePolit.bind(this);
    };

    onSubmit(e) {
        e.preventDefault();
        const {password, confirmPassword, polit1, polit2, email} = this.state;
        this.setState({
            validPass: password === confirmPassword,
            validPolit1: polit1,
            validPolit2: polit2
        })

        if (password === confirmPassword && polit1 && polit2) {
            this.props.registrationUser({
                "email": email,
                "password": password
            })
        }
    }

    handlePolit(e) {
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.props.isLogin) {
            return <Redirect to={`${LINKS_REGISTRATION}/done`}/>
        }
        return (

            <div>
                <Header title={this.context.title_wowbids_signup}/>
                <div className="reg-in">
                    <div className="title">{this.context.signup_punchline}</div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-item">
                            <input onChange={this.onChange} type="email" name="email" placeholder={this.context.email}/>
                        </div>
                        <div className="form-item">
                            <input onChange={this.onChange} type="text" name="login" placeholder={this.context.login}/>
                        </div>
                        <div className="form-item">
                            <input onChange={this.onChange} type="password" name="password"
                                   placeholder={this.context.password}/>
                        </div>
                        <div className={`form-item ${this.state.validPass ? '' : 'error'}`}>
                            <input onChange={this.onChange} type="password" name="confirmPassword"
                                   placeholder={this.context.confirm_password}/>
                        </div>
                        <div className="polit-group">
                            <div className={`polit ${this.state.validPolit1 ? '' : 'error'}`}>
                                <label htmlFor="polit1">
                                    <input type="checkbox" id="polit1" name="polit1" onChange={this.handlePolit}/>
                                    <span className="icon"></span>
                                    {/*<span>{REG_POLIT_P1} <Link to={LINKS_LEGAL_POLIT}>{REG_TERMS_LINK}</Link> {REG_POLIT_P2}  <Link to={LINKS_LEGAL_TERMS}>{REG_POLIT_LINK}</Link> {REG_POLIT_P3} </span>*/}
                                    <span dangerouslySetInnerHTML={{__html: this.context.signup_tos_agreement}}></span>
                                </label>
                            </div>

                            <div className={`polit ${this.state.validPolit2 ? '' : 'error'}`}>
                                <label htmlFor="polit2">
                                    <input type="checkbox" id="polit2" onChange={this.handlePolit} name="polit2"/>
                                    <span className="icon"></span>
                                    <span>{this.context.signup_news_agreement}</span>
                                </label>
                            </div>
                        </div>

                        <button className="btn btn-blue">{this.context.signup}</button>
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
    }, {registrationUser}
)(Registration);
