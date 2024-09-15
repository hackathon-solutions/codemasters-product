import sceneCS from '../../styles/common/Scene.module.css';
import panelCS from '../../styles/edit_image/editor/ImageEditorPanel.module.css';
import '../../styles/edit_image/editor/ImageEditorPanel.module.css';
import OperationControlPanel from "./OperationControlPanel";
import EditOperation from "./EditOperation";
import cropIcon from '../../assets/crop-icon.png';
import resizeIcon from '../../assets/resize-icon.png';
import flipIcon from '../../assets/flip-icon.png';
import adjustIcon from '../../assets/adjust-icon.png';
import filterIcon from '../../assets/filter-icon.png';
import resetBackIcon from '../../assets/reset-back-icon.png';
import {useEffect, useRef, useState} from "react";
import * as fabric from 'fabric';
import {getImageDataFromStorageAsBase64} from "../../core/data";
import Button from "./Button";
import {getCanvas, getMainImage, setCanvas, setMainImage, setSelectedObject} from "./helper";
import {useNavigate} from "react-router-dom";
import CropOp from "./ops/CropOp";
import ResizeOp from "./ops/ResizeOp";
import RotateFlipOp from "./ops/RotateFlipOp";
import AdjustOp from "./ops/AdjustOp";

const ImageEditorPanelPage = () => {
    const nav = useNavigate();

    const canvasRef = useRef(null);
    const canvasPanelRef = useRef(null);

    const [activeOp, setActiveOp] = useState(null);

    const [brightness, setBrightness] = useState(null);
    const [contrast, setContrast] = useState(null);
    const [saturation, setSaturation] = useState(null);
    const [exposition, setExposition] = useState(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current);
        setCanvas(canvas);
        updateCanvasContext(canvas);
        return () => canvas.dispose();
    }, []);

    function updateCanvasContext(canvas) {
        canvas.setZoom(0.2);
        const htmlImg = new Image();
        htmlImg.src = `data:image/png;base64,${getImageDataFromStorageAsBase64()}`;
        htmlImg.onload = () => {
            getCanvas().setDimensions({width: htmlImg.width, height: htmlImg.height})
            canvas.on({
                'selection:created': onCanvasObjSelected
            });
            const image = new fabric.Image(htmlImg);
            setMainImage(image);
            canvas.add(image);
            canvas.renderAll();
        };

        canvasPanelRef.current.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0 && canvas.getZoom() < 1) {
                canvas.setZoom(canvas.getZoom() + 0.05);
            } else if (e.deltaY > 0 && canvas.getZoom() > 0.2) {
                canvas.setZoom(canvas.getZoom() - 0.05);
            }
        });
    }

    function onCanvasObjSelected(e) {
        const selectedObjects = e.selected;
        setSelectedObject(selectedObjects[0]);
    }

    function saveClick() {
        getCanvas().setZoom(1.0);
        getCanvas().centerObject(getMainImage());
        const dataPng = getCanvas().toDataURL('png');
        const a = document.createElement('a');
        a.href = dataPng;
        a.download = `${document.title}.png`;
        a.click();
    }

    function cancelClick() {
        nav(-1);
    }


    /* OPS EVENTS */

    function selectedCropOp() {
        setActiveOp(<CropOp onSelectedValue={selectedCropOpSelectedValue} />);
    }

    function selectedCropOpSelectedValue(ratio) {
        if (!ratio) return;
        const img = getMainImage();
        const imgDim = img.getOriginalSize();
        const dim = ratioDimensions(imgDim, ratio);
        setImageSize(img, dim, false, false);
    }

    function setImageByFlip(flipBy) {
        if (flipBy === 'x') {
            setImageSize(getMainImage(), getMainImage().getOriginalSize(), true, false);
        } else if (flipBy === 'y') {
            setImageSize(getMainImage(), getMainImage().getOriginalSize(), false, true);
        }
    }

    function setImageSize(oldImg, nwImdDimension, flipX, flipY) {
        fabric.Image.fromURL(oldImg.toDataURL('png'))
            .then((oImg) => {
                const image = oImg
                    .set({...nwImdDimension, left: 0, top: 0, angle: 0, flipX: flipX, flipY: flipY});
                setMainImage(image);
                getCanvas().remove(oldImg);
                getCanvas().add(image);
            });
    }

    function ratioDimensions(dimensions, ratioString) {
        const ratioArr = ratioString.split(':');
        const ratio = ratioArr[0] / ratioArr[1];
        const curRatio = dimensions.width / dimensions.height;

        if (curRatio > ratio) {
            return {width: dimensions.height * ratio, height: dimensions.height};
        } else {
            return {width: dimensions.width, height: dimensions.width / ratio};
        }
    }

    function selectedResizeOp() {
        setActiveOp(<ResizeOp onApply={selectedResizeOpApply} />);
    }

    function selectedResizeOpApply(width, height) {
        if (!(isNumeric(width) && isNumeric(height))) {
            alert("Должно быть передано целочисленное значение");
            return;
        }

        setImageSize(getMainImage(), {width: width, height: height}, false, false);
    }

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    function selectedRotateFlipOp() {
        setActiveOp(<RotateFlipOp onRotateL={selectedRotateFlipOpRotateL}
                                  onRotateR={selectedRotateFlipOpRotateR}
                                  onFlipLR={selectedRotateFlipOpFlipLR}
                                  onFlipTB={selectedRotateFlipOpFlipTB}/>);
    }

    function selectedRotateFlipOpRotateL() {
        getMainImage().rotate(getMainImage().angle - 90);
        getCanvas().renderAll();
    }

    function selectedRotateFlipOpRotateR() {
        getMainImage().rotate(getMainImage().angle + 90);
        getCanvas().renderAll();
    }

    function selectedRotateFlipOpFlipLR() {
        setImageByFlip('x');
    }

    function selectedRotateFlipOpFlipTB() {
        setImageByFlip('y');
    }

    function selectedAdjustOp() {
        setActiveOp(<AdjustOp brightness={brightness}
                              contrast={contrast}
                              saturation={saturation}
                              exposition={exposition}
                              setBrightness={selectedAdjustOpBrightness}
                              setContrast={selectedAdjustOpContrast}
                              setSaturation={selectedAdjustOpSaturation}
                              setExposition={selectedAdjustOpExposition}/>);
    }

    function selectedAdjustOpBrightness(value) {
        setBrightness(value);
    }

    function selectedAdjustOpContrast(value) {
        setContrast(value);
    }

    function selectedAdjustOpSaturation(value) {
        setSaturation(value);
    }

    function selectedAdjustOpExposition(value) {
        setExposition(value);
    }

    /* OPS EVENTS END */


    return (
        <div className={sceneCS.full_screen_center_in_right}>
            <div className={panelCS.left_control}>
                <OperationControlPanel
                    editOperations={[
                        <EditOperation key={crypto.randomUUID()} opName="Crop" imgSrc={cropIcon} onClick={selectedCropOp}/>,
                        <EditOperation key={crypto.randomUUID()} opName="Resize" imgSrc={resizeIcon} onClick={selectedResizeOp}/>,
                        <EditOperation key={crypto.randomUUID()} opName="Rotate and flip" imgSrc={flipIcon} onClick={selectedRotateFlipOp}/>,
                        <EditOperation key={crypto.randomUUID()} opName="Adjust" imgSrc={adjustIcon} onClick={selectedAdjustOp}/>,
                        <EditOperation key={crypto.randomUUID()} opName="Filters" imgSrc={filterIcon}/>
                    ]}/>
            </div>
            <div className={panelCS.center}>
                <div className={panelCS.image_preview}>
                    <div ref={canvasPanelRef} className={panelCS.canvas_panel}>
                        <canvas ref={canvasRef}></canvas>
                    </div>
                </div>
                <div className={panelCS.ops_control}>
                    <span className={sceneCS.simple_text_bold}>Revert to Original</span>
                    <img className={panelCS.reset_ops} src={resetBackIcon}/>
                    <div style={{display: "flex"}}>
                        <Button className={panelCS.btn_ops}
                                title="Cancel"
                                fontSize="1vw"
                                onClick={cancelClick} />
                        <Button className={panelCS.btn_ops}
                                title="Save"
                                background="dodgerblue"
                                color="white"
                                fontSize="1vw"
                                onClick={saveClick} />
                    </div>
                </div>
            </div>
            <div className={panelCS.right_control}>
                { activeOp ? activeOp : undefined }
            </div>
        </div>
    );
}

export default ImageEditorPanelPage;