import cs from '../../styles/edit_image/editor/EditOperation.module.css';

const EditOperation = ({imgSrc, opName, onClick}) => {
    return (
        <div className={cs.operation} onClick={onClick}>
            <img className={cs.op_img} src={imgSrc}/>
            <span className={cs.op_name}>{opName}</span>
        </div>
    );
}

export default EditOperation;