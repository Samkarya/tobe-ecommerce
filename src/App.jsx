import { useContext, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import CartPage from './pages/CartPage/CartPage';
import { ecommerceCntx } from './utils/ecommerceCntx/ecommerceCntx';
import ProductDisplay from './pages/productDisplay/productDisplay';
import { Route, Routes } from 'react-router-dom';
import SearchDisplay from './pages/SearchDisplay/SearchDisplay';
import Footer from './components/Footer/Footer';
import Feedback from './components/Feedback/Feedback';

function App() {
  const {getProductData, loading} = useContext(ecommerceCntx);
  useEffect(()=>{
    getProductData();
  }, []);

  return (
    <>
      <Header/>
      <Feedback />
      {loading ? <Loading inline={false}/>:''}
      
      <Routes>
        <Route path='/' element={<ProductDisplay/>}/>
        <Route path='/search' element={<SearchDisplay/>}/>
        <Route path='/cart' element={<CartPage/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App;