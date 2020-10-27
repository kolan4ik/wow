import React, {Component} from 'react';
import Header from '../../componets/Header';
import banner from './rules-banner.png'
import {ThemeLanguageContext} from '../../context'

class Terms extends Component {
    static contextType = ThemeLanguageContext;

    render() {
        return (
            <div>
                <Header title={this.context.rules_policies_page}/>
                <div className="text-in">
                    <div className="terms-banner">
                        <img src={banner} alt="Rules & Policies"/>
                        <h2>{this.context.rules_policies_page}</h2>
                    </div>
                    <div dangerouslySetInnerHTML={{__html:  this.context.cookie_policy_text}}></div>
                </div>
            </div>
        );
    }
}


export default Terms;



