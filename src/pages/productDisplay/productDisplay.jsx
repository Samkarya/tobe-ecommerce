import { useContext, useState } from "react";
import { ecommerceCntx } from "../../utils/ecommerceCntx/ecommerceCntx";
import ProductCard from "../../components/ProductCard/ProductCard";
import AddCard from "../../components/AddCard/AddCard";
import './ProductDisplay.css'

function ProductDisplay(){

    const {productData, getProductData} = useContext(ecommerceCntx);
    const [sortby, setSortby] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);

    function handleSort(e){
        setSortby(e.target.value);
    }

    function handlePageChange(pageNumber, offset) {
        setCurrentPage(pageNumber);
        getProductData(offset, 10);
    }

    return(
        <>
        <div className="product-display">
        <div className="pagetitle">Products</div>
            <div className="sort">
                <select name="sort" id="sort" value={sortby} onChange={(e)=>handleSort(e)}>
                    <option value="default">Sort By</option>
                    <option value="high">High To Low Price</option>
                    <option value="low">Low To High Price</option>
                </select>
            </div>
            <div className="content">
                <AddCard />
                {[...productData]
                .sort((a, b) => {
                    if (sortby === "low") return a.price - b.price;
                    if (sortby === "high") return b.price - a.price;
                    return 0;
                })
                .map((product, idx) => (
                    <ProductCard key={idx} product={product} />
                ))}
            </div>
            <div className="pagination">
                <ul>
                    <li className={currentPage === 1 ? 'active' : ''} onClick={()=>handlePageChange(1, 0)}>1</li>
                    <li className={currentPage === 2 ? 'active' : ''} onClick={()=>handlePageChange(2, 10)}>2</li>
                    <li className={currentPage === 3 ? 'active' : ''} onClick={()=>handlePageChange(3, 20)}>3</li>
                    <li className={currentPage === 4 ? 'active' : ''} onClick={()=>handlePageChange(4, 30)}>4</li>
                    <li className={currentPage === 5 ? 'active' : ''} onClick={()=>handlePageChange(5, 40)}>5</li>
                </ul>
            </div>
        </div>
        </>
    )
}
export default ProductDisplay;