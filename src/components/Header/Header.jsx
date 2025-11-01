import { useContext, useState } from "react";
import { ecommerceCntx } from "../../utils/ecommerceCntx/ecommerceCntx";
import { useNavigate } from "react-router-dom";
import './Header.css'

function Header(){

    const {cartData} = useContext(ecommerceCntx);
    const [search, setSearch] = useState('');
    let navigate = useNavigate();

    function handleSearch(e){
        setSearch(e.target.value);
    }

    function handleSearchClick() {
        if (search.trim() !== '') {
            navigate(`/search?q=${search}`);
        }
    }

    return(
        <>
        <header className="header">
            <div className="brand_title" onClick={()=>navigate('/')}>
                To<span>Be</span> Ecommerce
            </div>
            <div className="action-area">
                <div className="search-box">
                    <input type="text" value={search} onChange={(e)=>handleSearch(e)}/>
                    <div className="search-btn" onClick={handleSearchClick}><i className="fa fa-search"></i></div>
                </div>
                <div className="cart" onClick={()=> navigate('/cart')}>
                    <div className="icon"> <i className="fa fa-shopping-cart"></i> </div>
                    <div className="badge-count">{cartData.length}</div>
                </div>
            </div>
        </header>
        </>
    )
}
export default Header;