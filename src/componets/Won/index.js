import React, {Component} from 'react';
import {ThemeLanguageContext} from '../../context'


import {Link} from "react-router-dom";
import Header from '../../componets/Header';
import {LINKS_WON_SHIPPING} from '../../links';

import icon from './icon.svg';
import product from './product.png';

class Won extends Component {
    static contextType = ThemeLanguageContext;



    render() {
        return (
            <div>
                <Header title={this.context.congrats}/>
                <div className="action-won_in">
                    <div className="icon"><img src={icon} alt="won"/></div>
                    <div className="title" dangerouslySetInnerHTML={{__html:  this.context.congrats_text}}>
                    </div>
                    <div className="action-product-small">
                        <div className="preview">
                            <img src={product} alt="iPhone XS Max 256GB"/>
                        </div>
                        <div className="center">
                            <div className="name">iPhone XS Max 256GB</div>
                            <div className="cash">$34.99</div>
                        </div>
                    </div>
                    <div className="action-won_cash">
                        <div className="action-won_sub">{this.context.sub_total} <span>$34.99</span> </div>
                        <div className="action-won_taxes">{this.context.taxes} <span>+$10.00</span></div>
                        <div className="action-won_total">{this.context.total} <span>$44.99</span></div>
                    </div>
                    <Link to={LINKS_WON_SHIPPING} className="btn btn-blue">{this.context.checkout}</Link>
                </div>
            </div>
        );
    }
}

Won.propTypes = {};

export default Won;
