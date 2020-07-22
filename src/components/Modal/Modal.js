import React, {Component} from 'react';
import PropTypes from "prop-types";
import './styles.scss'


export default class Modal extends Component{

    static propTypes = {
        open: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired,
        picture: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className={'modal'}>

            </div>
        )
    }
}