import sceneCS from '../../../styles/common/Scene.module.css';
import commonOpCS from '../../../styles/edit_image/editor/ops/CommonOp.module.css';
import opCS from '../../../styles/edit_image/editor/ops/CropOp.module.css';

const CropOp = ({onSelectedValue}) => {
    return (
        <div className={commonOpCS.op}>
            <span className={sceneCS.small_text}>Crop ratio</span>
            <select onChange={(e) => onSelectedValue(e.target.options[e.target.selectedIndex].text)}
                    className={opCS.select}>
                <option></option>
                <option>1:1</option>
                <option>16:9</option>
                <option>4:3</option>
            </select>
        </div>
    );
}

export default CropOp;