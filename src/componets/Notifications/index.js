import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ThemeLanguageContext} from '../../context'

import {
    LINKS_HOME
} from '../../links';

import {connect} from 'react-redux'
import {getSetting, setNotification} from '../../AC'

import Header from '../../componets/Header';
import Loader from '../../componets/Loader';


class Notifications extends Component {
    static contextType = ThemeLanguageContext;

    constructor(props) {
        super(props);

        this.state = {
            push_notifications: "",
            email_notifications: "",
            email_news: "",
            homescreen: "",
            isLoadSetting: false,
        };

        this.handleChangeNotification = this.handleChangeNotification.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    };

    componentDidMount() {
        if (!this.props.setting.isLoaded) {
            this.props.getSetting()
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        const {
            push_notifications,
            email_notifications,
            email_news,
            homescreen
        } = this.state;
        if (prevState.push_notifications !== "") {
            this.props.setNotification({
                push_notifications: push_notifications,
                email_notifications: email_notifications,
                email_news: email_news,
                homescreen: homescreen,
            })
        }

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!this.state.isLoadSetting) {
            this.setState({
                push_notifications: nextProps.setting.entities.push_notifications,
                email_notifications: nextProps.setting.entities.email_notifications,
                email_news: nextProps.setting.entities.email_news,
                homescreen: nextProps.setting.entities.homescreen,
                isLoadSetting: true
            })
        }
    }

    handleChangeNotification(e) {
        var $target = e.target;
        var $targetName = $target.name;
        this.setState((prevState) => {
            return {
                ...prevState,
                [$targetName]: !prevState[$targetName]
            }
        })
    };

    handleSubmit(e) {
        e.preventDefault()
    };

    getStatus(param) {
        return param ? this.context.enabled : this.context.disabled
    }

    render() {
        const {setting} = this.props;

        const {push_notifications, email_notifications, email_news, homescreen} = this.state;

        if (!setting.isLoaded) {
            return (
                <Loader/>
            )
        }

        return (
            <div>
                <Header title={this.context.notifications}/>
                <div className="notification-list">
                    <form onSubmit={this.handleSubmit} action="">
                        <ul>
                            <li>
                                <input type="checkbox" id="push_notifications" name="push_notifications"
                                       checked={push_notifications} onChange={this.handleChangeNotification}/>
                                <label htmlFor="push_notifications"
                                       className={`notification_toggle ${push_notifications ? 'active' : ''}`}>
                                    <i></i>
                                </label>
                                {this.context.notifications_push}

                                <span>
                                    {
                                        this.getStatus(push_notifications)
                                    }
                                </span>
                            </li>
                            <li>
                                <input type="checkbox" id="email_notifications" name="email_notifications"
                                       checked={email_notifications} onChange={this.handleChangeNotification}/>
                                <label htmlFor="email_notifications"
                                       className={`notification_toggle ${email_notifications ? 'active' : ''}`}>
                                    <i></i>
                                </label>
                                {this.context.notifications_email}
                                <span>
                                    {
                                        this.getStatus(email_notifications)
                                    }
                                </span>
                            </li>
                            <li>
                                <input type="checkbox" id="email_news" name="email_news"
                                       checked={email_news} onChange={this.handleChangeNotification}/>
                                <label htmlFor="email_news"
                                       className={`notification_toggle ${email_news ? 'active' : ''}`}>
                                    <i></i>
                                </label>
                                {this.context.notifications_news}
                                <span>
                                    {
                                        this.getStatus(email_news)
                                    }
                                </span>
                            </li>
                            <li>
                                <input type="checkbox" id="homescreen" name="homescreen"
                                       checked={homescreen} onChange={this.handleChangeNotification}/>
                                <label htmlFor="homescreen"
                                       className={`notification_toggle ${homescreen ? 'active' : ''}`}>
                                    <i></i>
                                </label>
                                {this.context.notifications_homescreen}
                                <span>
                                    {
                                        this.getStatus(homescreen)
                                    }
                                </span>

                            </li>
                        </ul>
                    </form>
                    <Link className="btn btn-blue" to={LINKS_HOME}>{this.context.back_to_auction}</Link>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
        return {
            setting: state.setting,
        }
    }, {getSetting, setNotification}, null
)(Notifications)