import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {PictureCard} from "../../components";
import './styles.scss';


class Body extends Component{

    state = {
        chosenPicture: null
    };


    onClick = (url) => {
        const {pictures} = this.props;

        let chosenPicture = pictures.find(p => p.url.trim() === url.trim());

        //console.log(chosenPicture)
    };

    render() {
        const {pictures} = this.props;
        //console.log(pictures)
        return pictures === null ? null : (
            <div className={'body'}>
                {
                    pictures.map((p, i) => <PictureCard key={`picture-${i}`} picture={p} onClick={this.onClick}/>)
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pictures: state.pictures
});

export default connect(
    mapStateToProps
)(Body)