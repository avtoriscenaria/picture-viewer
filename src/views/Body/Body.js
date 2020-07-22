import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {Modal, PictureCard} from "../../components";
import './styles.scss';
import {choosePicture} from "../../redux/actions";


class Body extends Component{

    state = {
        chosenPicture: null
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chosenPicture !== this.props.chosenPicture) {
            this.setState({chosenPicture: this.props.chosenPicture})
        }
    }


    onClick = (url) => {
        const {pictures, choosePicture} = this.props;

        let chosenPicture = pictures.find(p => p.url.trim() === url.trim());

        if (chosenPicture) {
            choosePicture(chosenPicture)
        }
    };

    render() {
        const {chosenPicture} = this.state;
        const {pictures, choosePicture} = this.props;

        return (
            <div className={'body'}>
                {
                    pictures === null ? null :
                        <>
                            {
                                pictures.map((p, i) => <PictureCard key={`picture-${i}`} picture={p} onClick={this.onClick}/>)
                            }
                            {
                                chosenPicture === null ? null :
                                    <Modal open={chosenPicture !== null}
                                           close={() => choosePicture(null)}
                                           picture={chosenPicture}
                                    />
                            }
                        </>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pictures: state.pictures,
    chosenPicture: state.chosenPicture
});

const mapDispatchToProps = dispatch => ({
    choosePicture: picture => dispatch(choosePicture(picture))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Body)