import React, {Component} from 'react';
import PropTypes from "prop-types";
import './styles.scss'
import Icon from "../Icon/Icon";
import {dateFormater, makePicSize} from "../../utils";
import t from '../../constants/ru';

const ONE_SECOND = 1000;

export default class Modal extends Component{

    static propTypes = {
        open: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired,
        picture: PropTypes.object.isRequired
    };

    state = {
        show: false,
        loader: '.',
    };

    componentDidMount() {
        const {open, picture} = this.props;

        if (open && picture && picture.hdurl) {
            this.interval = setInterval(this.updateLoader, ONE_SECOND*0.5);
            this.setState(this.makeDate(this.props.picture.date))
        }

        let app = document.getElementsByClassName('App')[0];
        if (app) {
            app.addEventListener('wheel', this.scroll)
        }
    }

    scroll = (e) => {

        if (e.path.some(el => (el.className || '').includes('modal'))) {
            let el = e.path.find(el => el.className === 'picture-info');

            if (el) {
                let stop = el.scrollHeight -el.scrollTop;
                let direction = e.wheelDeltaY > 0;

                if ((stop === el.clientHeight && !direction) || (el.scrollTop === 0 && direction) ) {
                    e.preventDefault()
                }
            } else {
                e.preventDefault()
            }
        }
    };

    updateLoader = () => {
        if (this.state.loader.length === 3) {
            this.setState({loader: ''})
        } else {
            this.setState({loader: `${this.state.loader}.`})
        }
    };

    componentWillUnmount() {
        clearInterval(this.interval)
        let app = document.getElementsByClassName('App')[0];
        if (app) {
            app.removeEventListener('wheel', this.scroll)
        }
    }

    ghostLoad = () => {
        makePicSize(this.img, this.picContainer, value => this.setState(value));
    };

    close = async () => {
        const {close} = this.props;

        if (close) {
            close();
        }
    };

    makeDate = (date) => {
        const [year, month, day] = date.split('-');

        let _date = new Date(year, month-1, day);
        let _month =  _date.toLocaleString('ru', {month: 'long'});
        let dayPic = dateFormater(new Date()) === dateFormater(new Date(year, month-1, day));

        return {date:`${_month} ${day}, ${year}`, dayPic}
    };

    content = (img, video) => {
        const {show, vertical, loader} = this.state;

        if (img) {
            return  (
                <>
                    {
                        show && vertical !== undefined ? null :
                            <div className={'loader'}>{loader}</div>
                    }

                    <img className={'ghost-pic'} alt={''} ref={img => this.img = img} src={img} onLoad={this.ghostLoad}/>
                    <img className={`picture${vertical ? ' vertical' : ''}${show && vertical !== undefined ? ' load' : ''}`}
                         alt={''}
                         src={img}
                         onLoad={() => this.setState({show: true})}
                    />
                </>
            )
        } else {
            return (
                <iframe
                    width={'100%'}
                    height={'100%'}
                    src={video} frameBorder="0"
                        allowFullScreen
                />
            )
        }

    };

    render() {
        const {open, close, picture} = this.props;
        if (!open) {
            return null
        }
        const {hdurl, url, title, explanation, copyright} = picture;
        const {date, dayPic} = this.state;

        return (
            <div className={'modal'}>
                <div className={'backdrop'} onClick={close}/>
                <div className={'modal-container'}>
                    <div className={'close'} onClick={close}>
                        <Icon name={'cross'} color={'#FFB100'} size={16}/>
                    </div>
                    <div className={'picture-container'} ref={container => this.picContainer = container}>
                        {
                            this.content(hdurl, url)
                        }
                    </div>
                    <div className={'picture-info'}>
                        <div className={'title-and-date'}>
                            <div className={'title'}>{title}</div>
                            {
                                !dayPic ? null :
                                    <div className={'day-picture'}>{t.picture_of_the_day}</div>
                            }
                            <div className={'picture-date'}>{date}</div>
                        </div>
                        <div className={'description'}>{explanation}</div>
                        <div className={'copyright'}>{`© ${copyright}`}</div>
                    </div>
                </div>
            </div>
        )
    }
}