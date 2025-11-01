import { useContext } from "react";
import { ecommerceCntx } from "../../utils/ecommerceCntx/ecommerceCntx";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import './SearchDisplay.css';

function SearchDisplay(){

    const {productData} = useContext(ecommerceCntx);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    const filteredProducts = productData.filter(product => 
        product.title.toLowerCase().includes(query)
    );

    return(
        <>
        <div className="product-display">
            <div className="pagetitle">Search Results for "{query}"</div>
            <div className="content">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                ) : (
                    <div className="search-empty">
                        <i className="fa fa-search"></i>
                        <div className="title">No Products Found</div>
                        <div className="description">Sorry, we couldn't find any products matching your search.</div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}
export default SearchDisplay;