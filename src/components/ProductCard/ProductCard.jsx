import { useContext, useState } from "react";
import { ecommerceCntx } from "../../utils/ecommerceCntx/ecommerceCntx";
import FormModal from "../FormModal/FormModal";
import './ProductCard.css'

function ProductCard({product}){
    const {deleteProduct, addToCart, cartData} = useContext(ecommerceCntx);
    const [editForm, setEditForm] = useState(false);

    const cartItem = cartData.find(item => item.id === product.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    function onClose(){
        setEditForm(false);
    }

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/280x200?text=No+Image';
    };

    return(
        <>
        <div className="product-card">
            <div className="image-head">
                <div className="image">
                    <img src={product.images?.[1] || 'https://placehold.co/280x200?text=No+Image'} alt={`${product.title} image`} onError={handleImageError} />
                </div>
            </div>
            <div className="product-card-body">
                <div className="detailes">
                    <div className="category">{product.category.name}</div>
                    <div className="price"><span>Rs.</span>{product.price}</div>                    
                </div>
                <div className="about">
                    <div className="title">{product.title}</div>
                    <div className="description">{product.description}</div>
                </div>
            </div>
            <div className="action-footer">
                <div className="button-group"> 
                    <button className="action-btn edit" onClick={()=>setEditForm(true)}>
                        <div className="action-text">Edit</div>
                        <i className="fa fa-edit"></i>
                    </button>
                    <button className="action-btn addToCart" onClick={()=>addToCart(product)}>
                        <div className="action-text">{quantityInCart > 0 ? `In Cart (${quantityInCart})` : 'Add To Cart'}</div>
                        <i className="fa fa-shopping-cart"></i>
                    </button>
                    <button className="action-btn delete" onClick={()=>deleteProduct(product.id)}>
                        <div className="action-text">Delete</div>
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
        {editForm? <FormModal Close={onClose} operation='edit' product={product}/>:''}
        </>
    )
}
export default ProductCard;