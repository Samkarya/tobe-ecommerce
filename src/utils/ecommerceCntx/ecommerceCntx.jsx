import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const ecommerceCntx = createContext({
    productData:[],
    cartData:[],
    categories: [],
    createNewProduct:()=>{},
    getProductData:()=>{},
    updateProduct:()=>{},
    deleteProduct:()=>{},
    addToCart:()=>{},
    updateCartQuantity:()=>{},
    loading:false,
    feedback: null,
    setFeedback: () => {}
})

function EcommerceCntxProvider (props){

    const [productData, setProductData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    function getCategories() {
        axios.get('https://api.escuelajs.co/api/v1/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
            });
    }

    function getProductData(offset=0, limit=10){
        setLoading(true);
        axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
        .then((response)=>{
            setProductData(response.data);
        })
        .catch((err)=>{
            console.error("Error fetching product data:", err);
            setFeedback({ message: 'Could not fetch products.', type: 'error' });
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    function addToCart(product) {
        setCartData(prev => {
            const exists = prev.find(pD => pD.id === product.id);
        
            if (exists) {
            return prev.map(pD =>
                pD.id === product.id? { ...pD, quantity: pD.quantity + 1 }: pD
            );
            } else {
            return [...prev, { ...product, quantity: 1 }];
            }
        });
        setFeedback({ message: `${product.title} added to cart!`, type: 'success' });
    }

    function updateCartQuantity(id, quantity, operation){
        if(quantity ===1 && operation === -1){
            removeFromCart(id);
        }else{
            setCartData(prev => {
                return prev.map(pD =>
                    pD.id === id? { ...pD, quantity: pD.quantity + operation }: pD
                );
            });
        }
    }
      
    function removeFromCart(id){
        setCartData((prev)=>{
            return prev.filter(storeProduct=>storeProduct.id !==id);
        })
    }

    function deleteProduct(id){
        setLoading(true);
        axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
        .then((res)=>{
            if(res.data){
                getProductData();
                setFeedback({ message: 'Product deleted successfully!', type: 'success' });
            }
        })
        .catch((err)=>{
            console.error("Error deleting product:", err);
            setFeedback({ message: 'Failed to delete product.', type: 'error' });
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    function updateProduct(product){
        setLoading(true);
        let payload ={
            "title": product.title,
            "price": product.price,
            "description": product.description,
            "categoryId": Number(product.categoryId)
        }
        axios.put(`https://api.escuelajs.co/api/v1/products/${product.id}`, payload)
        .then((res)=>{
            getProductData();
            setFeedback({ message: 'Product updated successfully!', type: 'success' });
        })
        .catch((err)=>{
            console.error("Error updating product:", err.response ? err.response.data : err);
            const errorMessage = err.response?.data?.message || 'Failed to update product.';
            setFeedback({ message: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage, type: 'error' });
        })
        .finally(()=>{
            setLoading(false);
        })
    }
    
    function createNewProduct(product){
        setLoading(true);
        let payload ={
            "title": product.title,
            "price": product.price,
            "description": product.description,
            "categoryId": Number(product.categoryId),
            "images": ["https://placehold.co/600x400"]
        }
        axios.post(`https://api.escuelajs.co/api/v1/products/`, payload)
        .then((res)=>{
            getProductData();
            setFeedback({ message: 'Product created successfully!', type: 'success' });
        })
        .catch((err)=>{
            console.error("Error creating product:", err.response ? err.response.data : err);
            const errorMessage = err.response?.data?.message || 'Failed to create product.';
            setFeedback({ message: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage, type: 'error' });
        })
        .finally(()=>{
            setLoading(false);
        })
    }
    
    return <ecommerceCntx.Provider value={{
        getProductData: getProductData,
        productData:productData,
        cartData:cartData,
        loading:loading,
        deleteProduct: deleteProduct,
        addToCart:addToCart,
        updateCartQuantity:updateCartQuantity,
        updateProduct:updateProduct,
        createNewProduct:createNewProduct,
        feedback: feedback,
        setFeedback: setFeedback,
        categories: categories
    }}>{props.children}</ecommerceCntx.Provider>
}
export default EcommerceCntxProvider;