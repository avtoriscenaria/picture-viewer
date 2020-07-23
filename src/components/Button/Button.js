import React, {Component} from 'react';
import './styles.scss'
import PropTypes from "prop-types";


export default class Button extends Component{

    static propTypes = {
        onClick: PropTypes.func,
        label: PropTypes.string,
        disabled: PropTypes.bool,
        icon: PropTypes.object
    };

    onClick = () => {
        const {onClick, disabled} = this.props;

        if (onClick && !disabled) {
            onClick()
        }
    };

    render() {
        const {label, disabled, icon} = this.props;

        return (
            <div className={`button${disabled ? ' disabled' : ''}`} onClick={this.onClick}>
                <div className={'b-label'}>{label}</div>
                <div className={'b-icon'}>{icon}</div>
            </div>
        )
    }
}