import React, {Component} from 'react';
import {ThemeLanguageContext} from '../../context'

import {Link} from 'react-router-dom'

import {FOOTER_COPYRIGHT} from '../../text'
import {LINKS_LEGAL_TERMS, LINKS_LEGAL_POLIT} from '../../links'


class Footer extends Component {
  static contextType = ThemeLanguageContext;

  render() {
    return (
      <footer className="footer">
        {FOOTER_COPYRIGHT} | <Link to={LINKS_LEGAL_TERMS}>{this.context.tos_page}</Link> | <Link to={LINKS_LEGAL_POLIT}>{this.context.privacy_policy_page}</Link>
      </footer>
    );
  }
}

export default Footer;
