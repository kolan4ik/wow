import React, {Component} from 'react';
import {ThemeLanguageContext} from '../../context'

import Header from '../../componets/Header';
import {Link} from 'react-router-dom';
import {LINKS_HOME} from '../../links';

class Success extends Component {
    static contextType = ThemeLanguageContext;

    render() {
        return (
            <div>
                <Header title={this.context.success}/>
                <div className="success-info">
                    <i className="icon-success"></i>
                    <div>
                        <div className="title">{this.context.you_bought.replace('{quantity}', '200')}</div>
                        <div className="subtitle">{this.context.thank_you}</div>
                    </div>
                    <Link className="btn btn-blue" to={LINKS_HOME}>{this.context.back_to_auction}</Link>
                </div>
            </div>
        );
    }
}

export default Success;
