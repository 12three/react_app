import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummery/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
       return (
           <div>
                <CheckoutSummary
                   ingredients={this.props.ings}
                   checoutCancelled={this.checkoutCancelHandler}
                   checoutContinued={this.checoutContinueHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
           </div>
       )
   }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
}

export default connect(mapStateToProps )(Checkout);