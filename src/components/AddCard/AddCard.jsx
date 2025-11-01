import { useState } from "react";
import FormModal from "../FormModal/FormModal";
import './AddCard.css';

function AddCard(){
    
    const [addForm, setAddForm] = useState(false);

    function onClose(){
        setAddForm(false);
    }

    return(
        <>
        <div className="add-btn-overlay" onClick={()=>setAddForm(true)}>
            <div className="product-card">
            <button className="add-btn">
                <i className="fa fa-plus"></i>
                <div className="btn-text">Add Product</div>
            </button>                
            </div>
        </div>
        {addForm? <FormModal Close={onClose} operation='add'/>:''}
        </>
    )
}
export default AddCard;