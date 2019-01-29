import React, { Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: true,
    };

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    toggleSideDrawerHandler = () => {
        this.setState((state, props) => { return {
            showSideDrawer: !state.showSideDrawer,
         }})
    }

    render() {
        return <>
                <Toolbar drawerToggleClicked={this.toggleSideDrawerHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>;
    }
};

export default Layout;