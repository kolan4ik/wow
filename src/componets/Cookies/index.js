import React from 'react'
import {Link} from 'react-router-dom'
import {LINKS_LEGAL_COOKIE, LINKS_LEGAL_POLIT, LINKS_LEGAL} from '../../links'
import iconArr from "./icon.svg"

const Cookies = (props) => (
    <div className="cookies-bottom">
        <h2>We value Your Privacy</h2>
        <p>We use cookies to give you best online experience on our site. This includes cookies from third party social media sites.</p>
        <p><Link to={LINKS_LEGAL}>To find out more</Link>, read our <Link to={LINKS_LEGAL_POLIT}>privacy policy</Link> and <Link to={LINKS_LEGAL_COOKIE}>cookie policy</Link>.</p>
        <span onClick={props.handleHideCookie} className="btn btn-yellow">
            <i><img src={iconArr} alt=""/></i>I’m OK with that</span>
    </div>
)

export default Cookies


