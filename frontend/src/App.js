
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route} from 'react-router-dom'; 
import Home from './Pages/Home';
import Homecategory from './Pages/Homecategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Blog from './Pages/Blog';
import Proceed from './Components/Proceed/Proceed';
import Orders from './Components/Orders/Orders';




function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Homecategory category="shop" />} />

          <Route path='/blog' element={<Blog />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/contactUs' element={<ContactUs />} />
           <Route path="/orders" element={<Orders />} />
           <Route path="/proceed" element={<Proceed />} />
          <Route path='/product/:productId' element={<Product />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;