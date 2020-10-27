import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {ThemeLanguageContext} from '../../context'

import Header from '../../componets/Header';
import {LINKS_HOME} from '../../links';

class Placed extends Component {
    static contextType = ThemeLanguageContext;

    render() {
        return (
            <div>
                <Header title={this.context.order_placed}/>
                <div className="order-placed">
                    <i className="icon-success"></i>
                    <div>
                        <div className="title" dangerouslySetInnerHTML={{__html:  this.context.congrats_order}}></div>
                        <div className="text" dangerouslySetInnerHTML={{__html:  this.context.thanks_purchase}}></div>
                    </div>

                    <Link to={LINKS_HOME} className="btn btn-blue">{this.context.view_other_button}</Link>
                </div>
            </div>

        );
    }
}

export default Placed;
