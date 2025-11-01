import { useContext } from "react";
import { ecommerceCntx } from "../../utils/ecommerceCntx/ecommerceCntx";
import './CartPage.css'

function CartPage(){
    const {cartData, updateCartQuantity} = useContext(ecommerceCntx);
    return(
        <>
        <div className="cartPage">
            <div className="cart-header">
                <div className="title"><i className="fa fa-shopping-cart"></i>Cart</div>
                <div className="noOf-items">{cartData.length}</div>
            </div>
            <div className="cart-body">
                {cartData.length === 0 ? (
                    <div className="cart-empty">
                        <i className="fa fa-shopping-basket"></i>
                        <div className="title">Your Cart is Empty</div>
                        <div className="description">Looks like you haven't added anything to your cart yet.</div>
                    </div>
                ) : (
                    <>
                        <div className="cart-item-area">
                            {cartData.map((pD, idx)=>
                            <div className="item" key={idx}>
                                <div className="about">
                                    <div className="title">{pD.title}</div>
                                    <div className="category">{pD.category.name}</div>
                                </div>
                                <div className="price-area">
                                    <div className="quantity">
                                        <div className="quantity-regulator">
                                            <div className="minus" onClick={()=>updateCartQuantity(pD.id, pD.quantity,-1)}><i className="fa fa-minus"></i></div>
                                            <div className="value">{pD.quantity}</div>
                                            <div className="plus" onClick={()=>updateCartQuantity(pD.id, pD.quantity,1)}><i className="fa fa-plus"></i></div>
                                        </div>
                                    </div>
                                    <div className="price"><span>Rs.</span>{pD.price * pD.quantity}</div>
                                </div>
                            </div>)}
                        </div>
                        <div className="totalCard">
                            <div className="title">Total: <span>Rs.</span> <span className="price">{cartData.reduce((sum, pD)=>sum +=(pD.price * pD.quantity), 0)}</span></div>                    
                        </div>
                    </>
                )}
            </div>
            {cartData.length > 0 && (
                <div className="cart-footer">
                    <div className="checkout">
                        <button className="checkout">
                            Proceed To Pay (Payment Is Not Implemented )
                        </button>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}
export default CartPage;