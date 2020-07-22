import React, {Component} from 'react';
import PropTypes from "prop-types";
import './styles.scss'


export default class PictureCard extends Component {

    static propTypes = {
        picture: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired
    };


    onClick = () => {
        const {onClick, picture} = this.props;

        if (onClick) {
            onClick(picture.url)
        }
    };


    render() {
        const {picture, className} = this.props;
        const {url, explanation, title} = picture || {};


        return (
            <div className={`picture-card${className ? ` ${className}` : ''}`} onClick={this.onClick}>
                <div className={'picture-container'}>
                    <img alt={''} src={url}/>
                </div>
                <div className={'picture-title'}>
                    {title}
                </div>
                <div className={'picture-description'}>
                    {explanation}
                </div>
            </div>
        )
    }
}