import sceneCS from '../../styles/common/Scene.module.css';
import inpCS from '../../styles/edit_image/editor/EditText.module.css';

const EditText = ({background, color, fontSize, width, className, onClick, value, setValue}) => {
    return (
        <div style={
            {
                background: background ? background : "transparent",
                width: width ? width : undefined
            }}
             className={inpCS.inp + (className ? ' ' + className : '')}
             onClick={onClick}>
            <input style={
                {
                    color: color ? color : "black",
                    fontSize: fontSize ? fontSize : undefined
                }}
                  className={sceneCS.simple_text_bold}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
            ></input>
        </div>
    );
}

export default EditText;