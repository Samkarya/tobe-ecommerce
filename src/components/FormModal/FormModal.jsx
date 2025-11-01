import { useContext, useEffect, useState } from "react";
import { ecommerceCntx } from "../../utils/ecommerceCntx/ecommerceCntx";
import './FormModal.css';

function FormModal({Close, operation, product}){

    const {createNewProduct, updateProduct, setFeedback, categories} = useContext(ecommerceCntx);

    const [formData, setFormData]  = useState({
        "title": "",
        "price": '',
        "description": "",
        "categoryId": '',
        "images": [],
    })

    function handleFormChange(e){
        setFormData((prev)=>({...prev, [e.target.id]:e.target.value}))
    }

    function handleSave() {
        const price = Number(formData.price);

        if (!formData.title || !formData.price || !formData.description || !formData.categoryId) {
            setFeedback({ message: 'Please fill in all fields, including category.', type: 'error' });
            return;
        }

        if (price <= 0) {
            setFeedback({ message: 'Price must be a positive number.', type: 'error' });
            return;
        }
        
        const productData = {
            ...formData,
            price: price
        }

        if (operation === 'edit') {
            updateProduct(productData);
        } else {
            createNewProduct(productData);
        }
        Close();
    }

    useEffect(()=>{
        if (operation === 'edit' && product) {
            setFormData({
                ...product,
                categoryId: product.category.id
            });
        }
    },[operation, product])

    return(
        <>
        <div className="modal-overview" onClick={(e)=>{e.preventDefault(); Close()}}>
            <div className="modal-container" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <div className="title">{operation==='edit'? 'Edit':'Add'} Product</div>
                    <div className="close" onClick={(e)=>{e.preventDefault(); Close()}}><i className="fa fa-close"></i></div>
                </div>
                <form className="form-area">
                    <div className="form-group">
                        <label htmlFor="title">Product Name:</label>
                        <input type="text" id="title" placeholder="product name" value={formData.title} onChange={(e)=>handleFormChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Product Description:</label>
                        <textarea type="text" id="description" placeholder="product description" value={formData.description}  onChange={(e)=>handleFormChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Product Price:</label>
                        <input type="number" id="price" placeholder="example 232" value={formData.price} onChange={(e)=>handleFormChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoryId">Product Category:</label>
                        <select name="categoryId" id="categoryId" value={formData.categoryId} onChange={(e)=>handleFormChange(e)}>
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-action">
                        <button className="save"  onClick={(e)=>{e.preventDefault(); handleSave()}}><i className="fa fa-save"></i>{operation==='edit'? 'Edit':'Add'} Product</button>
                        <button className="cancel" onClick={(e)=>{e.preventDefault(); Close()}}><i className="fa fa-close"></i>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default FormModal;