import React, {Component} from 'react';
import {ThemeLanguageContext} from '../../context'
import axios from 'axios'
import {Redirect} from "react-router-dom";

import {LINKS_WON_SHIPPING_PLACED} from "../../links"

import RRS from 'react-responsive-select';
import "react-responsive-select/dist/ReactResponsiveSelect.css";

import Header from '../../componets/Header';

const county = [
    {text: 'USA', value: 'USA'},
    {text: 'USA2', value: 'USA2'},
    {text: 'USA3', value: 'USA3'},
    {text: 'USA4', value: 'USA4'},
    {text: 'USA5', value: 'USA5'},
    {text: 'USA6', value: 'USA6'},
    {text: 'USA7', value: 'USA7'},
    {text: 'USA8', value: 'USA8'},
    {text: 'USA9', value: 'USA9'},
    {text: 'USA10', value: 'USA10'},
    {text: 'USA11', value: 'USA11'}
];
const city = [
    {text: 'New York', value: 'New York', country: "USA"},
    {text: 'New York2', value: 'New York2', country: "USA2"},
    {text: 'New York3', value: 'New York3', country: "USA3"},
    {text: 'New York4', value: 'New York4', country: "USA4"},
    {text: 'New York5', value: 'New York5', country: "USA5"},
    {text: 'New York6', value: 'New York6', country: "USA6"},
    {text: 'New York7', value: 'New York7', country: "USA7"},
    {text: 'New York8', value: 'New York8', country: "USA8"},
    {text: 'New York9', value: 'New York9', country: "USA9"},
    {text: 'New York10', value: 'New York10', country: "USA10"},
    {text: 'New York11', value: 'New York11', country: "USA2"},
    {text: 'LA', value: 'LA', country: "USA"},
]
const typeDelivery = [
    {
        text: 'Standard Delivery (2 days for $07.00)',
        value: 'Standard Delivery (2 days for $07.00)',
        country: ["USA"],
        city: ["New York2", "New York"]
    },
    {
        text: 'Standard Delivery (2 days for $07.00) 2',
        value: 'Standard Delivery (2 days for $07.00) 2',
        country: ["USA2"],
        city: ["New York2", "New York"]
    },
    {
        text: 'Standard Delivery (2 days for $07.00) 3',
        value: 'Standard Delivery (2 days for $07.00) 3',
        country: ["USA3", "USA2", "USA"],
        city: ["LA"]
    }
]

class Shipping extends Component {
    static contextType = ThemeLanguageContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            full_name: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            country: '',
            optCountry: county,
            optCity: city,
            optTypeDelivery: typeDelivery,
            nameValid: true,
            addressValid: true,
            address2Valid: true,
            cityValid: true,
            deliveryTypeValid: true,
            countyValid: true,
            isRedirect: false
        };

        this.handleChangeFields = this.handleChangeFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeCountry = this.handleChangeCountry.bind(this)
        this.handleChangeCity = this.handleChangeCity.bind(this)
    };

    handleChange = ({name, value}) => {
        this.setState({
            [name]: value
        });
    };

    handleChangeFields(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const regexp = new RegExp(/^[a-z,',-]+(\s)[a-z,',-]+$/i);
        const {
            full_name,
            address_line_1,
            address_line_2,
            city,
            selectedOption,
            country,
        } = this.state;
        this.setState({
            nameValid: regexp.test(full_name),
            addressValid: address_line_1.length > 2,
            address2Valid: address_line_2.length > 2,
            cityValid: city.length > 2,
            deliveryTypeValid: selectedOption !== "",
            countyValid: country !== "",
        });

        if (full_name.length > 2 &&
            address_line_1.length > 2 &&
            address_line_2.length > 2 &&
            city.length > 2 &&
            selectedOption.length !== "" &&
            country.length !== "") {

            axios.get('https://cors-anywhere.herokuapp.com/https://test.wowbids.club/order/delivery_types/' + country)
                .then((response) => {
                    this.setState({
                        isRedirect: true
                    })
                })
                .catch((error) => {
                })
        }
    }


    handleChangeCountry = ({name, value}) => {
        const newOptCity = city.filter((item) => {
            return item.country === value
        });
        this.setState({
            [name]: value,
            optCity: newOptCity
        });
    };
    handleChangeCity = ({name, value}) => {
        const newOptDeliveryType = typeDelivery.filter((item) => {
            return item.city.indexOf(value) > -1
        });
        this.setState({
            [name]: value,
            optTypeDelivery: newOptDeliveryType
        });
    };
    render() {

        if (this.state.isRedirect) {
            return <Redirect to={LINKS_WON_SHIPPING_PLACED}/>
        }
        return (
            <div>
                <Header title={this.context.confirm_delivery}/>
                <div className="shipping-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className={`${!this.state.nameValid ? 'error' : ''} form-item`}>
                            <label htmlFor="shipping-name">{this.context.full_name}</label>
                            <input onChange={this.handleChangeFields} name="full_name" type="text"
                                   id="shipping-name" placeholder='Collins Nathaniel'/>
                        </div>
                        <div className={`${!this.state.addressValid ? 'error' : ''} form-item`}>
                            <label htmlFor="shipping-name">{this.context.address_line_1}</label>
                            <input onChange={this.handleChangeFields} name="address_line_1" type="text"
                                   id="shipping-name" placeholder='177 Waelchi Throughway Apt. 365'/>
                        </div>
                        <div className={`${!this.state.address2Valid ? 'error' : ''} form-item`}>
                            <label htmlFor="shipping-name">{this.context.address_line_2}</label>
                            <input onChange={this.handleChangeFields} name="address_line_2" type="text"
                                   id="shipping-name" placeholder='553 Friesen Extension'/>
                        </div>

                        <div className={`${!this.state.countyValid ? 'error' : ''} form-item`}>
                            <label htmlFor="shipping-name">{this.context.country}</label>

                            <RRS
                                name="country"
                                noSelectionLabel="USA"
                                options={this.state.optCountry}
                                onChange={this.handleChangeCountry}
                            />


                        </div>
                        <div className={`${!this.state.nameValid ? 'error' : ''} form-item`}>
                            <label htmlFor="shipping-name">{this.context.city}</label>

                            <RRS
                                name="city"
                                noSelectionLabel="New York"
                                disabled={this.state.country === ''}
                                options={this.state.optCity}
                                onChange={this.handleChangeCity}
                            />

                        </div>
                        <div className={`${!this.state.deliveryTypeValid ? 'error' : ''} form-item`}>
                            <label htmlFor="shipping-name">{this.context.delivery_type}</label>

                            <RRS
                                disabled={this.state.city === ''}
                                name="selectedOption"
                                noSelectionLabel="Standard Delivery (2 days for $07.00)"
                                options={this.state.optTypeDelivery}
                                onChange={this.handleChange}
                            />
                        </div>
                        <button className="btn btn-blue">{this.context.proceed_button}</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Shipping;
