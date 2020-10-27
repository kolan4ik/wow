import React, {Component} from 'react';

import Header from '../../componets/Header';
import Loader from '../../componets/Loader';
import {ThemeLanguageContext} from '../../context'

import {connect} from "react-redux"
import {changePhoto, setSetting, getLogin} from "../../AC"

class Setting extends Component {
    static contextType = ThemeLanguageContext;

    constructor(props) {
        super(props);

        this.state = {
            email: props.user.entities.email,
            username: props.user.entities.username,
            photo: props.user.entities.photo,
            old_password: props.user.entities.password,
            password: '',
            confirmPassword: '',
            validPass: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);

    }


    componentDidMount() {
        this.props.getLogin();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.user.isLoaded !== nextProps.user.isLoaded) {
            this.setState({
                email: nextProps.user.entities.email,
                photo: nextProps.user.entities.photo,
                username: nextProps.user.entities.username,
                old_password: nextProps.user.entities.password,
            })
        }
    }


    handleSubmit(event) {
        event.preventDefault();
        const {password, confirmPassword, email, username, old_password} = this.state;

        this.setState({validPass: password === confirmPassword})

        if (password === confirmPassword) this.props.setSetting(email, username, old_password, password)

    }

    handleConfirmPassword(even) {
        this.setState({
            confirmPassword: even.target.value
        })
    }

    handlePassword(even) {
        this.setState({
            password: even.target.value
        })
    }

    onChangePhoto(e) {
        const _th = this;
        const file = e.target.files[0];
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            _th.setState({
                photo: [reader.result]
            })
        };

        if (!url) this.props.changePhoto(e.target.value);

    }

    render() {
        const {user} = this.props;
        if (!user.isLoaded) {
            return <Loader/>
        }
        return (
            <div>
                <Header title={this.context.title_wowbids_profile} color='white'/>
                <div className="edit-profile">
                    <form onSubmit={this.handleSubmit}>
                        <div className="edit-photo">
                            <label htmlFor="fieldFile" className="avatar">
                                <img src={this.state.photo} alt=""/>
                                <i className="icon-photo"></i>
                            </label>
                            <input
                                id="fieldFile"
                                type="file"
                                name="photo"
                                onChange={this.onChangePhoto}/>

                        </div>
                        <div className="form-item">
                            <label htmlFor="profile-name">{this.context.full_name}</label>
                            <input
                                type="text"
                                id="profile-name"
                                defaultValue={this.state.username}/>
                        </div>
                        <div className="form-item">
                            <label htmlFor="profile-email">{this.context.email}</label>
                            <input
                                type="email"
                                id="profile-email"
                                defaultValue={this.state.email}/>
                        </div>
                        <div className="form-item">
                            <label htmlFor="profile-pass">{this.context.password}</label>
                            <input
                                type="password"
                                onChange={this.handlePassword}
                                id="profile-pass"
                                defaultValue={this.state.password}/>
                        </div>
                        <div className={`form-item ${!this.state.validPass && 'error'}`}>
                            <label htmlFor="profile-pass2">{this.context.confirm_password}</label>
                            <input
                                type="password"
                                onChange={this.handleConfirmPassword}
                                id="profile-pass2"
                                defaultValue={this.state.confirmPassword}/>
                        </div>
                        <button className="btn btn-blue">{this.context.save_changes}</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps, {changePhoto, setSetting, getLogin})(Setting);