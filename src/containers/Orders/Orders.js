import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    };


    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log(res);
                const fetchedOrders = Object.keys(res.data)
                    .map(key => {
                        let order = res.data[key];
                        order.id = key;

                        return order;
                    });

                this.setState({
                    loading: false,
                    orders: fetchedOrders,
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                });
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                })}
            </div>
        )
    }
}

export default Orders;