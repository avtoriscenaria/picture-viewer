const makePicSize = (img, container, setState) => {
    let height = img.clientHeight;
    let width = img.clientWidth;

    let Height = container.clientHeight;
    let Width = container.clientWidth;

    let w = width/Width;
    let h = height/Height;

    let vertical = height > width;

    if (vertical) {
        vertical = Width > width/h
    } else {
        vertical = Height < height/w
        //console.log(Height, height/w)
    }

    setState({vertical})
};

export default makePicSize