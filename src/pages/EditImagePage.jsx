import sceneCS from '../styles/common/Scene.module.css';
import editImageCS from '../styles/edit_image/EditImage.module.css';
import {useEffect, useState} from "react";
import {clearData, existsImageDataInStorage, getImageDataFromStorageAsBase64} from "../core/data";
import {useNavigate} from "react-router-dom";
import refreshIcon from '../assets/refresh-icon.png';
import editIcon from '../assets/edit-icon.png';
import removeIcon from '../assets/remove-icon.png';

const EditImagePage = () => {
    const nav = useNavigate();

    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        if (!existsImageDataInStorage()) {
            nav("/upload");
        } else {
            setBase64DataImage();
        }
    });

    function setBase64DataImage() {
        setImageSrc(`data:image/png;base64,${getImageDataFromStorageAsBase64()}`);
    }

    function refreshImage() {
        removeImage();
    }

    function editImage() {
        nav("/edit/panel");
    }

    function removeImage() {
        clearData();
        nav("/upload");
    }

    return (
        <div className={sceneCS.full_screen_center_in_down}>
            <div className={editImageCS.image_box}>
                <div className={editImageCS.control_panel}>
                    <span className={sceneCS.simple_text_bold + ' ' + editImageCS.control_panel_name}>Image</span>
                    <img onClick={refreshImage} className={editImageCS.control_item_icon} src={refreshIcon}/>
                    <img onClick={editImage} className={editImageCS.control_item_icon} src={editIcon}/>
                    <img onClick={removeImage} className={editImageCS.control_item_icon} src={removeIcon}/>
                </div>
                <img className={editImageCS.editable_image} src={imageSrc}/>
            </div>
        </div>
    );
}

export default EditImagePage;