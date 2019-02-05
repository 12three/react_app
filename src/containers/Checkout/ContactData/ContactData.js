import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
            },
            nastreetme: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                },
                value: '',
            },
            method: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest', displayValue: 'Fastest',
                        },
                        {
                            value: 'cheapest', displayValue: 'Cheapest',
                        },
                    ]
                },
                value: '',
            },
        },
        loading: false,
    };

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        };


        axios
            .post('orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        const formElements = Object.keys(this.state.orderForm).map(key => {
            const type = this.state.orderForm[key].elementType;
            const config = this.state.orderForm[key].elementConfig;
            const value = this.state.orderForm[key].value;

            return <Input
                key={key}
                inputType={type}
                elementConfig={config}
                value={value} />
        })
        let form = (
            <form>
                { formElements }
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner show="true"/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data:</h4>
                { form }
            </div>
        )
    }
}

export default ContactData;