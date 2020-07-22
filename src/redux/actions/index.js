import {set_pictures} from "../reducers/pictures";


export const setPictures = pictures => ({
    type: set_pictures,
    pictures
});