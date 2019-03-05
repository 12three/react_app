import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: null,
                errorMessage: null,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: null,
                errorMessage: null,
                touched: false,
            },
        },
        isSignup: true,
    }

    checkValidaty = (value, rules) => {
        let result = true;

        if (rules.required) {
            result = !!value;
        }
        if (rules.isEmail) {
            result = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
        }
        if (rules.minLength) {
            result = value.length > rules.minLength
        }

        return result
    }

    inputChangedHandler = (event, controlKey) => {
        const updatedControls = {
            ...this.state.controls,
            [controlKey]:  {
                ...this.state.controls[controlKey],
                value: event.target.value,
                valid: this.checkValidaty(
                    event.target.value,
                    this.state.controls[controlKey].validation),
                touched: true,
            }
        }

        this.setState({
            controls: updatedControls,
        });
    }

    submitHundler = e => {
        e.preventDefault();

        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup,
        )
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            if (prevState.isSignup) {
                this.props.onLogout();
            }

            return {
                isSignup: !prevState.isSignup,
            }
        });
    }

    componentWillUnmount() {
        this.props.onSetAuthRedirectPath()
    }

    render() {
        let form = Object.keys(this.state.controls).map(key => {
            const type = this.state.controls[key].elementType;
            const config = this.state.controls[key].elementConfig;
            const value = this.state.controls[key].value;
            const invalide = this.state.controls[key].valid !== null
                && !this.state.controls[key].valid;
            const errorMessage = this.state.controls[key].errorMessage;

            return <Input
                key={key}
                inputType={type}
                elementConfig={config}
                invalid={invalide}
                value={value}
                errorMessage={errorMessage}
                changed={(e) => this.inputChangedHandler(e, key)} />
        })

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={ this.props.authRedirectPath } />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHundler}>
                    { form }
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    SWITCH TO { this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.redirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onLogout: () => dispatch(actions.logout()),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect('/')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);