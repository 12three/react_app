import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

class BurderBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key].amount)
            .reduce((sum, item) => {
                return sum + item;
            }, 0);

        return sum > 0
    }

    purchaseHandler() {
        this.setState({ purchasing: true });
    }

    purchaseClosedHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings,
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key].amount <= 0;
        }

        let orderSummary = (
            <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
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
                <Burger ingredients={this.props.ings} />
                <BurgerControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={() => this.purchaseHandler()}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurderBuilder);
