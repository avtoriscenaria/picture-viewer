import React, {Component} from 'react';
import './styles.scss';
import DatePicker, {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";
import ajax from "../../utils/ajax";
import {api} from "../../constants/api";
import connect from "react-redux/es/connect/connect";
import {setPictures} from "../../redux/actions";
import dateFormater from "../../utils/dateFormater";

registerLocale('ru', ru);

class Header extends Component{

    state = {
        startDate: new Date(),
        endDate: new Date()
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

        let start_date = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
        let end_date = `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`;

        let res = await ajax(api.get_pictures, {start_date, end_date});

        if (res.ok) {
            setPictures(res.data)
        }
    };

    dateButton = ({ value, onClick }) => {
        const [month, day, year] = value.split('/');
        return <div className="date-button" onClick={onClick}>
            {`${day}/${month}/${year}`}
        </div>
    };


    render() {
        const {startDate, endDate} = this.state;

        return (
            <div className='header'>
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
                        locale="ru"
                        selected={endDate}
                        onChange={date => this.handleChange('endDate', date)}
                        customInput={<this.dateButton />}
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
    setPictures: pictures => dispatch(setPictures(pictures))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)