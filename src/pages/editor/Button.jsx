import sceneCS from '../../styles/common/Scene.module.css';
import buttonCS from '../../styles/edit_image/editor/Button.module.css';

const Button = ({background, title, color, fontSize, width, className, onClick}) => {
    return (
        <div style={
            {
                background: background ? background : "transparent",
                width: width ? width : undefined
            }}
             className={buttonCS.btn + (className ? ' ' + className : '')}
             onClick={onClick}>
            <span style={
                {
                    color: color ? color : "black",
                    fontSize: fontSize ? fontSize : undefined
                }}
                  className={sceneCS.simple_text_bold}>{title}</span>
        </div>
    );
}

export default Button;