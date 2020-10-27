import React, {Component} from 'react';
import Header from '../../componets/Header';

import {ThemeLanguageContext} from '../../context'
import {Link} from 'react-router-dom'
import {LINKS_HOME} from "../../links"


import iconDone from './icon-done.svg'

class thankReg extends Component {
    static contextType = ThemeLanguageContext;
    render() {
        return (
            <div>
                <Header title={this.context.title_wowbids_signup}/>
                <div className="reg-done">
                    <img src={iconDone} alt="done"/>
                    <div className="title">Congratulations,
                        Now you have access
                        to our auctions</div>
                    <p>Please check your email and confirm your registration to make sure your email  address is correct</p>
                    <Link className="btn btn-blue" to={LINKS_HOME}>View auctions</Link>
                </div>
            </div>
        );
    }
}

export default thankReg;
