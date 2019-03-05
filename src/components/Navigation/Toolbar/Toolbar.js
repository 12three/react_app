import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import DrawerToggler from '../../SideDrawer/DrawerToggler/DrawerToggler';
import classes from './Toolbar.css';

export default function Toolbar(props) {
    return <header className={classes.Toolbar}>
            <DrawerToggler clicked={props.drawerToggleClicked} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DisplayOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>;
}
