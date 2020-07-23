import { combineReducers } from 'redux';

import pictures from "./pictures";
import chosenPicture from "./chosenPicture";

export default combineReducers({
    pictures,
    chosenPicture
});