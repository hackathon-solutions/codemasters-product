import buttonCS from '../../styles/edit_image/editor/TileButton.module.css';

const TileButton = ({background, src, width, className, onClick}) => {
    return (
        <div style={
            {
                background: background ? background : "transparent",
                width: width ? width : undefined
            }}
             className={buttonCS.btn + (className ? ' ' + className : '')}
             onClick={onClick}>
            <img className={buttonCS.img} src={src} />
        </div>
    );
}

export default TileButton;