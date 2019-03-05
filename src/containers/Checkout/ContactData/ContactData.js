import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import * as actions from '../../../store/actions/index';


const ERROR_MESSAGES = {
    empty: 'Please enter a valid value.',
    required: 'This field is required.',
}

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
                validation: {
                    required: true,
                },
                valid: null,
                errorMessage: null,
            },
            nastreetme: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                valid: null,
                errorMessage: null,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                valid: null,
                errorMessage: null,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                valid: null,
                errorMessage: null,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                },
                value: '',
                valid: null,
                errorMessage: null,
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
                value: 'cheapest',
                valid: null,
                errorMessage: null,
            },
        },
    };

    orderHandler = (e) => {
        e.preventDefault();
        // this.setState({ loading: true });
        const orderData = Object.keys(this.state.orderForm).reduce((acc, key) => {
            acc[key] = this.state.orderForm[key].value;

            return acc;
        }, {})

        const convertedIngs = Object.keys(this.props.ings).reduce((acc, key) => {
            return {
                ...acc,
                [key]: this.props.ings[key].amount,
            }
        }, {})

        const order = {
            ingredients: convertedIngs,
            price: this.props.price,
            orderData,
        };

        this.checkFormValidaty()
            .then(isValidForm => {
                if (isValidForm) {
                    this.props.onOrderBurger(this.props.token, order);
                }
            })
    }

    checkFieldValidaty = (value, rules) => {
        let result = {
            isValid: true,
            errorMessage: null,
        };

        if (rules.required) {
            const isValid = value !== '';

            result.isValid = isValid;
            result.errorMessage = isValid ? null : ERROR_MESSAGES.required;
        }

        return result
    }

    checkFormValidaty() {
        return new Promise((resolve, reject) => {
            let isValidForm = true;
            const updatedOrderForm = {
                ...this.state.orderForm,
            }

            Object.keys(updatedOrderForm).forEach(key => {
                const updatedFormElement = { ...updatedOrderForm[key] }

                if (!updatedFormElement.valid && typeof updatedFormElement.valid === "boolean") {
                    isValidForm = false;
                }
                if (updatedFormElement.validation && updatedFormElement.valid === null) {
                    updatedFormElement.valid = false;
                    updatedFormElement.errorMessage = ERROR_MESSAGES.empty;
                    isValidForm = false;
                }

                updatedOrderForm[key] = updatedFormElement;
            })
            this.setState({
                orderForm: updatedOrderForm,
            });

            resolve(isValidForm);
        })
    }

    inputChangedHandler = (e, key) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        };
        const updatedFormElement = { ...updatedOrderForm[key] };

        updatedFormElement.value = e.target.value;
        updatedOrderForm[key] = updatedFormElement;
        if (updatedOrderForm[key].validation) {
            const fieldValidResult = this.checkFieldValidaty(
                e.target.value,
                updatedOrderForm[key].validation)

            updatedOrderForm[key].valid = fieldValidResult.isValid;
            updatedOrderForm[key].errorMessage = fieldValidResult.errorMessage;
        }
        this.setState({
            orderForm: updatedOrderForm,
        });
    }

    render() {
        const formElements = Object.keys(this.state.orderForm).map(key => {
            const type = this.state.orderForm[key].elementType;
            const config = this.state.orderForm[key].elementConfig;
            const value = this.state.orderForm[key].value;
            const invalide = this.state.orderForm[key].valid !== null
                && !this.state.orderForm[key].valid;
            const errorMessage = this.state.orderForm[key].errorMessage;

            return <Input
                key={key}
                inputType={type}
                elementConfig={config}
                invalid={invalide}
                value={value}
                errorMessage={errorMessage}
                changed={(e) => this.inputChangedHandler(e, key)}/>
        })
        let form = (
            <form>
                { formElements }
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (token, orderData) => dispatch(actions.purchaseBurger(token, orderData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);