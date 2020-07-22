import {set_pictures} from "../reducers/pictures";
import {choose_picture} from "../reducers/chosenPicture";


export const setPictures = pictures => ({
    type: set_pictures,
    pictures
});

export const choosePicture = picture => ({
    type: choose_picture,
    picture
});