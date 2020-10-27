
import React, {Component} from 'react';
import {ThemeLanguageContext} from '../../context'

import Header from '../../componets/Header';

import {LINKS_LEGAL_TERMS,
    LINKS_LEGAL_POLIT,
    LINKS_LEGAL_COOKIE} from '../../links';

import banner from './rules-banner.png'

import {Link} from 'react-router-dom'


class Legal extends Component {
  static contextType = ThemeLanguageContext;
  render() {
        return (
            <div>
                <Header title={this.context.rules_policies_page}/>
                <div className="text-in">
                    <Link to={LINKS_LEGAL_TERMS} className="legal-item">
                        <img src={banner} alt={this.context.rules_policies_page}/>
                        <span className="name">{this.context.rules_policies_page}</span>
                    </Link>
                    <Link to={LINKS_LEGAL_POLIT} className="legal-item">
                        <img src={banner} alt={this.context.privacy_policy_page}/>
                        <span className="name">{this.context.privacy_policy_page}</span>
                    </Link>
                    <Link to={LINKS_LEGAL_COOKIE} className="legal-item">
                        <img src={banner} alt={this.context.cookie_policy}/>
                        <span className="name">{this.context.cookie_policy}</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Legal;

