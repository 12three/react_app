import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummery/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    isEmptyOrder = (order) => {
        return Object.keys(order).reduce((acc, key) => {
            return !acc || order[key].amount > 0 ? false : true;
        }, true)
    }

    render() {
        let summary = <Redirect to="/" />
        if (!this.isEmptyOrder(this.props.ings)) {
            let purchasedRedirect = null;

            if (this.props.purchased) {
                purchasedRedirect = <Redirect to="/" />;
            }

            summary = (
                <div>
                    { purchasedRedirect }
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checoutCancelled={this.checkoutCancelHandler}
                        checoutContinued={this.checoutContinueHandler} />
                </div>
            )
        }

       return (
           <div>
               { summary }
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
           </div>
       )
   }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchase: () => dispatch(actions.resetIngredient()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);