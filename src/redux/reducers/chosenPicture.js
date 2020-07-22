export const choose_picture = "choose_picture";

export default (chosenPicture = null, action) => {
    switch(action.type)
    {
        case choose_picture:
            return action.picture;
        default:
            return chosenPicture;
    }
}