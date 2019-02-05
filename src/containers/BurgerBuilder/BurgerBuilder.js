import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurderBuilder extends Component {
    state = {
        ingredients: {
            salad: {
                amount: 0,
                price: 0.5,
            },
            bacon: {
                amount: 0,
                price: 0.7,
            },
            cheese: {
                amount: 0,
                price: 0.4,
            },
            meat: {
                amount: 0,
                price: 1.3,
            },
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key].amount)
            .reduce((sum, item) => {
                return sum + item;
            }, 0);

        this.setState({
            purchasable: sum > 0,
        });
    }

    changeIngredientAmount(type, mark) {
        if (!this.state.ingredients[type]) {
            return;
        }
        let updatedTotalPrice, newAmount;
        const oldAmount = this.state.ingredients[type].amount;
        const ingredientPrice = this.state.ingredients[type].price;

        switch (mark) {
            case '+':
                newAmount = oldAmount + 1;
                updatedTotalPrice = this.state.totalPrice + ingredientPrice;
                break;
            case '-':
                if (oldAmount > 0) {
                    newAmount = oldAmount - 1;
                    updatedTotalPrice = this.state.totalPrice - ingredientPrice;
                } else {
                    newAmount = oldAmount;
                    updatedTotalPrice = this.state.totalPrice;
                }
                break;
            default:
                return;
        }
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type].amount = newAmount;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedTotalPrice,
        });
        this.updatePurchaseState(updatedIngredients);
    }

    addIngredientHandler(type) {
        this.changeIngredientAmount(type, '+');
    }

    removeIngredientHandler(type) {
        this.changeIngredientAmount(type, '-');
    }

    purchaseHandler() {
        this.setState({ purchasing: true });
    }

    purchaseClosedHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        const ingredients = Object.keys(this.state.ingredients).reduce(
            (acc, key) => {
                acc[key] = this.state.ingredients[key].amount;

                return acc;
            },
            {},
        );

        const queryString = Object.keys(ingredients)
            .map((key) => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(ingredients[key])}`
            })
            .concat([`price=${this.state.totalPrice}`])
            .join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`,
        })
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key].amount <= 0;
        }

        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseClosed={this.purchaseClosedHandler}
                purchaseContinue={this.purchaseContinueHandler}
            />
        );
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseClosedHandler}
                >
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    ingredientAdded={type => this.addIngredientHandler(type)}
                    ingredientRemoved={type =>
                        this.removeIngredientHandler(type)
                    }
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={() => this.purchaseHandler()}
                />
            </>
        );
    }
}

export default BurderBuilder;
