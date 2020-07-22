import React, {Component} from "react";
import Header from "../Header/Header";
import Body from "../Body/Body";
import ajax from "../../utils/ajax";
import {api} from "../../constants/api";
import connect from "react-redux/es/connect/connect";
import {setPictures} from "../../redux/actions";
import pictures from "../../redux/reducers/pictures";


const dataPic = [
    {"copyright":"Zixuan LinBeijing Normal U.","date":"2020-07-22","explanation":"What is creating the structure in Comet NEOWISE's tails? Of the two tails evident, the blue ion tail on the left points directly away from the Sun and is pushed out by the flowing and charged solar wind. Structure in the ion tail comes from different rates of expelled blue-glowing ions from the comet's nucleus, as well as the always complex and continually changing structure of our Sun's wind. Most unusual for Comet C/2020 F3 (NEOWISE), though, is the wavy structure of its dust tail. This dust tail is pushed out by sunlight, but curves as heavier dust particles are better able to resist this light pressure and continue along a solar orbit.  Comet NEOWISE's impressive dust-tail striations are not fully understood, as yet, but likely related to rotating streams of sun-reflecting grit liberated by ice melting on its 5-kilometer wide nucleus.  The featured 40-image conglomerate, digitally enhanced, was captured three days ago through the dark skies of the Gobi Desert in Inner Mongolia, China. Comet NEOWISE will make it closest pass to the Earth tomorrow as it moves out from the Sun. The comet, already fading but still visible to the unaided eye, should fade more rapidly as it recedes from the Earth.    Notable NEOWISE Images Submitted to APOD: July  21 || 20 || 19  || 18   || 17   || 16   || 15  || 14  || 13  || 12  || 11  || 10 & earlier ||","hdurl":"https://apod.nasa.gov/apod/image/2007/Neowise_Lin_3884.jpg","media_type":"image","service_version":"v1","title":"The Structured Tails of Comet NEOWISE","url":"https://apod.nasa.gov/apod/image/2007/Neowise_Lin_960.jpg"}
];

class Content extends Component{

    componentDidMount() {
        let lsDate = localStorage.getItem('date');
        let date = {};
        if (lsDate !== null) {
            const {start_date, end_date, today} = JSON.parse(lsDate);

            if (!today) {
                let start = new Date(start_date);
                let end = new Date(end_date);

                date = {
                    start_date: `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`,
                    end_date: `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`
                }
            }
        }
        this.getPicture(date)
    }

    getPicture = async (date) => {

        let res = await ajax(api.get_pictures, date);

        if (res.ok) {
            if (Array.isArray(res.data)) {
                this.props.setPictures(res.data)
            } else {
                this.props.setPictures([{...res.data}])
            }

        } else {
            this.props.setPictures(dataPic)
        }
    };


    render() {

        return (
            <div className={'content'}>
                <Header/>
                <Body/>
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
)(Content)
