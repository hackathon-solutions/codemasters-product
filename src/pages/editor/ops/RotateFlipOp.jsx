import sceneCS from '../../../styles/common/Scene.module.css';
import commonOpCS from '../../../styles/edit_image/editor/ops/CommonOp.module.css';
import opCS from '../../../styles/edit_image/editor/ops/RotateFlip.module.css';
import TileButton from "../TileButton";
import rotateLeftIcon from '../../../assets/reset-back-icon.png';
import rotateRightIcon from '../../../assets/reset-forth-icon.png';
import lrFlipIcon from '../../../assets/lr-flip-icon.png';
import tbFlipIcon from '../../../assets/tb-flip-icon.png';

const RotateFlipOp = ({onRotateL, onRotateR, onFlipLR, onFlipTB}) => {

    return (
        <div className={commonOpCS.op}>
            <div className={opCS.section}>
                <span className={sceneCS.small_text}>Rotate</span>
                <div className={opCS.section_right}>
                    <TileButton src={rotateLeftIcon} onClick={onRotateL} />
                    <TileButton src={rotateRightIcon} onClick={onRotateR} />
                </div>
            </div>
            <div className={opCS.section}>
                <span className={sceneCS.small_text}>Flip</span>
                <div className={opCS.section_right}>
                    <TileButton src={lrFlipIcon} onClick={onFlipLR} />
                    <TileButton src={tbFlipIcon} onClick={onFlipTB} />
                </div>
            </div>
        </div>
    );
}

export default RotateFlipOp;