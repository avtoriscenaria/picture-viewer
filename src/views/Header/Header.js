import React, {Component} from 'react';
import './styles.scss';
import DatePicker, {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";
import {ajax, dateFormater} from "../../utils";
import {api} from "../../constants/api";
import connect from "react-redux/es/connect/connect";
import {setPictures, choosePicture} from "../../redux/actions";
import {Button} from "../../components";
import t from '../../constants/ru';
import Icon from "../../components/Icon/Icon";

registerLocale('ru', ru);

const dataPic = [
    {"copyright":"Zixuan LinBeijing Normal U.","date":"2020-07-22","explanation":"What is creating the structure in Comet NEOWISE's tails? Of the two tails evident, the blue ion tail on the left points directly away from the Sun and is pushed out by the flowing and charged solar wind. Structure in the ion tail comes from different rates of expelled blue-glowing ions from the comet's nucleus, as well as the always complex and continually changing structure of our Sun's wind. Most unusual for Comet C/2020 F3 (NEOWISE), though, is the wavy structure of its dust tail. This dust tail is pushed out by sunlight, but curves as heavier dust particles are better able to resist this light pressure and continue along a solar orbit.  Comet NEOWISE's impressive dust-tail striations are not fully understood, as yet, but likely related to rotating streams of sun-reflecting grit liberated by ice melting on its 5-kilometer wide nucleus.  The featured 40-image conglomerate, digitally enhanced, was captured three days ago through the dark skies of the Gobi Desert in Inner Mongolia, China. Comet NEOWISE will make it closest pass to the Earth tomorrow as it moves out from the Sun. The comet, already fading but still visible to the unaided eye, should fade more rapidly as it recedes from the Earth.    Notable NEOWISE Images Submitted to APOD: July  21 || 20 || 19  || 18   || 17   || 16   || 15  || 14  || 13  || 12  || 11  || 10 & earlier ||","hdurl":"https://apod.nasa.gov/apod/image/2007/Neowise_Lin_3884.jpg","media_type":"image","service_version":"v1","title":"The Structured Tails of Comet NEOWISE","url":"https://apod.nasa.gov/apod/image/2007/Neowise_Lin_960.jpg"}
];


class Header extends Component{

    state = {
        startDate: new Date(),
        endDate: new Date(),
        disabled: false
    };

    componentDidMount() {
        let date = localStorage.getItem('date');

        if (date) {
            date = JSON.parse(date);
            if (!date.today) {
                this.setState({
                    startDate: new Date(date.start_date),
                    endDate: new Date(date.end_date)
                })
            }
        }
    }

    handleChange = async (param, date) => {
        const {[param]: prevDate} = this.state;
        if (
            dateFormater(prevDate) !== dateFormater(date)
        ) {
            await this.setState({
                [param]: date
            });

            this.saveToLocalStorage();
            this.getPictures()
        }
    };

    saveToLocalStorage = () => {
        const {startDate, endDate} = this.state;
        let equal = dateFormater(new Date()) === dateFormater(startDate);
        let oneDay = dateFormater(startDate) === dateFormater(endDate);

        localStorage.setItem(
            'date',
            JSON.stringify({
                start_date: this.state.startDate.getTime(),
                end_date:  this.state.endDate.getTime(),
                today: equal && oneDay
            })
        );
    };

    getPictures = async () => {
        const {setPictures} = this.props;
        const {startDate: start, endDate: end} = this.state;

        let start_date = `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`;
        let end_date = `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`;

        let res = await ajax(api.get_pictures, {start_date, end_date});

        if (res.ok) {
            setPictures(res.data)
        } else {
            alert('REQUEST ERROR')
        }
    };

    dateButton = ({ value, onClick }) => {
        const [month, day, year] = value.split('/');
        return <div className="date-button" onClick={onClick}>
            {`${day}/${month}/${year}`}
        </div>
    };

    getDayPicture = async () => {
        const {choosePicture} = this.props;
        this.setState({disabled: true});

        let res = await ajax(api.get_pictures);

        if (res.ok) {
            await choosePicture(res.data)
        } else {
            await choosePicture(dataPic[0])
        }

        this.setState({disabled: false})
    };


    render() {
        const {startDate, endDate, disabled} = this.state;

        return (
            <div className='header'>
                <div className={'left-part'}>
                    <Button label={t.picture_of_the_day}/>
                </div>
                <div className={'center-part'}>
                    <div className={'date-picker start-date'}>
                        <DatePicker
                            maxDate={endDate}
                            locale="ru"
                            selected={startDate}
                            onChange={date => this.handleChange('startDate', date)}
                            customInput={<this.dateButton />}
                        />
                    </div>
                    -
                    <div className={'date-picker end-date'}>
                        <DatePicker
                            minDate={startDate}
                            maxDate={new Date()}
                            locale="ru"
                            selected={endDate}
                            onChange={date => this.handleChange('endDate', date)}
                            customInput={<this.dateButton />}
                        />
                    </div>
                </div>
                <div className={'right-part'}>
                    <Button label={t.picture_of_the_day} disabled={disabled} onClick={this.getDayPicture}
                            icon={<Icon name={'today'} color={'white'} size={14}/>}
                            />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pictures: state.pictures
});

const mapDispatchToProps = dispatch => ({
    setPictures: pictures => dispatch(setPictures(pictures)),
    choosePicture: picture => dispatch(choosePicture(picture))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)