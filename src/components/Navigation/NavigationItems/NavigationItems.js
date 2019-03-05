import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

export default function NavigationItems(props) {
    return <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active exact>Burger Builder</NavigationItem>
        { props.isAuthenticated
            ? <NavigationItem link="/orders">Orders</NavigationItem>
            : null }
        {
            props.isAuthenticated
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authenticate</NavigationItem>
        }
    </ul>;
}
