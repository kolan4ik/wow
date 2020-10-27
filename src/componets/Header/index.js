import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    headerColor() {
        if (!this.props.color) {
            return ''
        }
        else {
            return `header-${this.props.color}`
        }
    }

    render() {
        return (
            <header className={`header ${this.headerColor()}`}>
                <div className="title">{this.props.title}</div>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;

