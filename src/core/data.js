const IMAGE_DATA_KEY = "Image_Data";
const EDITED_IMAGE_DATA_KEY = "Edited_Image_Data";

export function uploadEditedImageDataToStorage(editedImageDataURL) {
    localStorage.setItem(EDITED_IMAGE_DATA_KEY, editedImageDataURL);
}

export function getEditedImageDataFromStorage() {
    return localStorage.getItem(EDITED_IMAGE_DATA_KEY);
}

export function existsEditedImageDataInStorage() {
    return !!localStorage.getItem(EDITED_IMAGE_DATA_KEY);
}

export function uploadImageDataToStorage(imageDataArrayBuffer) {
    localStorage.setItem(
        IMAGE_DATA_KEY,
        btoa(
            [].reduce.call(
                new Uint8Array(imageDataArrayBuffer),
                function (p, c) {
                    return p + String.fromCharCode(c)
                },
                ''
            )
        )
    );
}

export function getImageDataFromStorageAsArrayBuffer() {
    const data = atob(localStorage.getItem(IMAGE_DATA_KEY));
    const imageArrayBuffer = new ArrayBuffer(data.length);
    for (let i = 0; i < data.length; i++) {
        imageArrayBuffer[i] = data[i];
    }
    return imageArrayBuffer;
}

export function getImageDataFromStorageAsBase64() {
    return localStorage.getItem(IMAGE_DATA_KEY);
}

export function existsImageDataInStorage() {
    return !!localStorage.getItem(IMAGE_DATA_KEY);
}

export function clearData() {
    localStorage.clear();
}