import React, {Component} from 'react';
import Header from '../../componets/Header';
import {ThemeLanguageContext} from '../../context'

import {Redirect} from 'react-router-dom';
import {LINKS_SUCCESS} from '../../links';

import coin from './coin.svg'
import axios from 'axios'


const bidArr = {
    id: 123124234,
    coin: 200,
    name: 200,
    cash: "$120.00",
    star: 5
};


class Cart extends Component {
    static contextType = ThemeLanguageContext;

    constructor(props) {
        super(props);
        this.state = {
            calc: 1,
            taxes: '$10.00',
            isRedirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
        this.handleClearCalc = this.handleClearCalc.bind(this);
        this.handleSendForm = this.handleSendForm.bind(this);
    }

    handleChange(event) {
        this.setState({calc: event.target.value});
    }

    handlePlus(event) {
        this.setState({
            calc: this.state.calc + 1
        });
    }

    handleMinus(event) {
        this.setState({
            calc: this.state.calc > 1 ? this.state.calc - 1 : 1
        });
    }

    getTotal() {
        return (this.state.calc * parseInt(bidArr.cash.split('$')[1]) + parseFloat(this.state.taxes.split('$')[1])).toFixed(2)
    }

    handleClearCalc() {
        this.setState({
            calc: 1
        });
    }

    handleSendForm(e) {
        axios.post('https://cors-anywhere.herokuapp.com/https://test.wowbids.club/order/bids_checkout', {
            "id": bidArr.id,
            "count": this.state.calc
        })
            .then((response) => {
                this.setState({
                    isRedirect: true
                })
            })
            .catch((error) => {
            })

    }

    render() {
        const subTotal = (parseInt(bidArr.cash.split('$')[1]) * this.state.calc).toFixed(2);
        if (this.state.isRedirect) {
            return <Redirect to={LINKS_SUCCESS}/>
        }
        return (
            <div>
                <Header title={this.context.cart}/>
                <div className="cart-bid">
                    <div className="cart-bid_top">
                        <i><img width="51px" src={coin} alt=""/></i>
                        <div className="calc">
                            <i onClick={this.handleClearCalc} className="calc-clear">x</i>
                            <div className="calc_in">
                                <i onClick={this.handleMinus}>-</i>
                                <i onClick={this.handlePlus}>+</i>
                                <div className="center">
                                    <input
                                        type="text"
                                        value={this.state.calc}
                                        onChange={this.handleChange}/>
                                </div>

                            </div>
                        </div>
                        <div className="name"> {bidArr.name} {this.context.bid_packs}</div>
                        <div className="cash">{bidArr.cash}</div>
                    </div>
                    <div className="cart-bid_in">
                        <div className="sub-total">{this.context.sub_total} <span>${subTotal}</span></div>
                        <div className="texas">{this.context.taxes} <span>+{this.state.taxes}</span></div>
                        <div className="total">{this.context.total} <span>${this.getTotal()}</span></div>
                        <div onClick={this.handleSendForm} className="btn btn-blue">{this.context.checkout}</div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Cart;
