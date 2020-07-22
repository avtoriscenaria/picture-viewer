export const set_pictures = "set_pictures";

export default (pictures = null, action) => {
    switch(action.type)
    {
        case set_pictures:
            return action.pictures;
        default:
            return pictures;
    }
}