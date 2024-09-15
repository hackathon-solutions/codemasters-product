import sceneCS from '../../../styles/common/Scene.module.css';
import commonOpCS from '../../../styles/edit_image/editor/ops/CommonOp.module.css';
import opCS from '../../../styles/edit_image/editor/ops/Adjust.module.css';

const ResizeOp = ({brightness, contrast, saturation, exposition, setBrightness, setContrast, setSaturation, setExposition}) => {
    return (
        <div className={commonOpCS.op}>
            <div className={opCS.section}>
                <span className={sceneCS.small_text}>Brightness</span>
                <input type="range" value={brightness} onChange={(e) => setBrightness(e.target.value)}/>
            </div>
            <div className={opCS.section}>
                <span className={sceneCS.small_text}>Contrast</span>
                <input type="range" value={contrast} onChange={(e) => setContrast(e.target.value)}/>
            </div>
            <div className={opCS.section}>
                <span className={sceneCS.small_text}>Saturation</span>
                <input type="range" value={saturation} onChange={(e) => setSaturation(e.target.value)}/>
            </div>
            <div className={opCS.section}>
                <span className={sceneCS.small_text}>Exposition</span>
                <input type="range" value={exposition} onChange={(e) => setExposition(e.target.value)}/>
            </div>
        </div>
    );
}

export default ResizeOp;