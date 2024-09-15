import sceneCS from '../../../styles/common/Scene.module.css';
import commonOpCS from '../../../styles/edit_image/editor/ops/CommonOp.module.css';
import opCS from '../../../styles/edit_image/editor/ops/ResizeOp.module.css';
import EditText from "../EditText";
import Button from "../Button";
import {useState} from "react";

const ResizeOp = ({onApply}) => {
    const [textW, setTextW] = useState('');
    const [textH, setTextH] = useState('');

    return (
        <div className={commonOpCS.op}>
            <div className={opCS.section}>
                <span className={sceneCS.small_text}>Width (px)</span>
                <EditText value={textW} setValue={setTextW} />
            </div>
            <div className={opCS.section}>
                <span className={sceneCS.small_text}>Height (px)</span>
                <EditText value={textH} setValue={setTextH} />
            </div>
            <Button title="Apply"
                    background="dodgerblue"
                    color="white"
                    fontSize="1vw"
                    onClick={() => onApply(textW, textH)}/>
        </div>
    );
}

export default ResizeOp;