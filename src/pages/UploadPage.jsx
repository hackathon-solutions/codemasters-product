import sceneCS from '../styles/common/Scene.module.css';
import uploadCS from '../styles/upload/Upload.module.css';
import addIcon from '../assets/add-icon.png';
import {useEffect, useState} from "react";
import {
    getImageDataFromStorageAsBase64,
    uploadImageDataToStorage,
    existsImageDataInStorage
} from '../core/data';
import {useNavigate} from "react-router-dom";

const UploadPage = () => {
    const nav = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        window.addEventListener("dragover", (e) => e.preventDefault());
        window.addEventListener("drop", (e) => e.preventDefault());
    });

    useEffect(() => {
        if (existsImageDataInStorage()) {
            setBase64DataImage();
        }
    }, [imageSrc]);

    function clickUploadArea() {
        const inp = document.createElement("input");
        inp.type = "file";
        inp.onchange = () => uploadImage(inp.files[0]);
        inp.click();
    }

    function dropUploadArea(e) {
        uploadImage(e.dataTransfer.files[0]);
    }

    function uploadImage(file) {
        if (validateFile(file)) {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => {
                uploadImageDataToStorage(reader.result);
                setBase64DataImage();
                nav("/edit");
            };
        } else {
            alert('Файл не может быть загружен');
        }
    }

    function setBase64DataImage() {
        setImageSrc(`data:image/png;base64,${getImageDataFromStorageAsBase64()}`);
    }

    function dragEnterUploadArea(e) {
        e.dataTransfer.dropEffect = 'copy';
    }

    function validateFile(file) {
        return file && (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) > -1) && file.size < 5**23;
    }

    return (
        <div className={sceneCS.full_screen_center_in_down}>
            <div onClick={clickUploadArea}
                 onDragEnter={dragEnterUploadArea}
                 onDrop={dropUploadArea}
                 className={sceneCS.full_screen_center_in_down + ' ' + uploadCS.drop_image_place}>
                <img className={uploadCS.add_icon} src={addIcon} alt="add icon"/>
                <span className={sceneCS.simple_text_bold}>Drop file to upload</span>
                <span className={sceneCS.simple_text}>or select file</span>
                <span className={sceneCS.simple_text_hint}>5 MB Max, JPEG, PNG</span>
                { imageSrc ? <img className={uploadCS.uploaded_image} src={imageSrc} /> : undefined}
            </div>
        </div>
    );
}

export default UploadPage;