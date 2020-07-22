import React, {Component} from 'react';
import PropTypes from "prop-types";
import './styles.scss'
import {dateFormater} from "../../utils";
import t from '../../constants/ru';


export default class PictureCard extends Component {

    static propTypes = {
        picture: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        type: PropTypes.string
    };

    state = {
        show: false
    };

    isDayPic = (date) => {
        const [year, month, day] = date.split('-');

        return  dateFormater(new Date()) === dateFormater(new Date(year, month-1, day));
    };


    onClick = () => {
        const {onClick, picture} = this.props;

        if (onClick) {
            onClick(picture.url)
        }
    };

    render() {
        const {picture, className} = this.props;
        const {url, explanation, title, date} = picture || {};
        const {show} = this.state;

        let dayPic = this.isDayPic(date);

        return (
            <div className={`picture-card${className ? ` ${className}` : ''}${dayPic ? ' day-pic' : ''}`} onClick={this.onClick}>
                <div className={'picture-container'}>
                    {
                        !dayPic ? null :
                            <div className={'day-pic-header'}>
                                <div className={'dph-backdrop'}/>
                                <div className={'dph-title'}>
                                    {t[picture.hdurl ? 'picture_of_the_day' : 'video_of_the_day']}
                                </div>
                            </div>
                    }
                    {
                        picture.hdurl ?
                            <img className={`${show ? '' : 'not_load'}`} alt={''} src={url} onLoad={() => this.setState({show: true})}/>
                            :
                            <iframe
                                width={'100%'}
                                height={'100%'}
                                src={url} frameBorder="0"
                                allowFullScreen
                            />
                    }
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