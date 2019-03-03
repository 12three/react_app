import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];

    if (props.invalid) {
        inputClasses.push(classes.Invalide);
    }
    inputClasses = inputClasses.join(' ');

    switch (props.inputType) {
        case 'input':
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'textarea':
            inputElement = <textarea
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case 'select':
            let options = props.elementConfig.options.map(opt => {
                return (
                    <option
                        value={opt.value}
                        key={opt.value}>
                        {opt.displayValue}
                    </option>
                )
            })

            inputElement = <select
                className={inputClasses}
                value={props.value}
                onChange={props.changed}>
                    { options }
                </select>
            break;
        default:
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    let error = null;
    if (props.invalid && props.errorMessage) {
        error = <p className={classes.ValidationError}>{ props.errorMessage }</p>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{ props.label }</label>
            { inputElement }
            { error }
        </div>
    )
}

export default Input;