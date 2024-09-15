let CANVAS = null;
let SELECTED_OBJECT = null;
let MAIN_IMAGE = null;

export function setCanvas(canvas) {
    CANVAS = canvas;
}

export function getCanvas() {
    return CANVAS;
}

export function setSelectedObject(selectedObject) {
    SELECTED_OBJECT = selectedObject;
}

export function getSelectedObject() {
    return SELECTED_OBJECT;
}

export function setMainImage(mainImage) {
    MAIN_IMAGE = mainImage;
}

export function getMainImage() {
    return MAIN_IMAGE;
}

export function getDimensionsByMedia() {
    if (matchMedia("screen and (min-width: 3000px)").matches) {
        return {width: 1900, height: 1200};
    } else if (matchMedia("screen and (min-width: 2500px) and (max-width: 2999px)").matches) {
        return {width: 1700, height: 1000};
    } else if (matchMedia("screen and (min-width: 2200px) and (max-width: 2499px)").matches) {
        return {width: 1500, height: 800};
    } else if (matchMedia("screen and (min-width: 1900px) and (max-width: 2199px)").matches) {
        return {width: 1300, height: 600};
    } else if (matchMedia("screen and (min-width: 1600px) and (max-width: 1899px)").matches) {
        return {width: 1100, height: 600};
    } else if (matchMedia("screen and (min-width: 1300px) and (max-width: 1599px)").matches) {
        return {width: 900, height: 500};
    } else if (matchMedia("screen and (min-width: 1000px) and (max-width: 1299px)").matches) {
        return {width: 700, height: 400};
    } else if (matchMedia("screen and (min-width: 700px) and (max-width: 999px)").matches) {
        return {width: 500, height: 300};
    } else {
        return {width: 2000, height: 2000};
    }
}