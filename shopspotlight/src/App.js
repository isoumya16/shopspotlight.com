import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage';
import Registrationpage from './pages/registrationpage';
import Loginpage from './pages/loginpage';
import Contactpage from './pages/contactpage';
import Aboutpage from './pages/aboutpage';
import Cartpage from './pages/cartpage';
import AddProductpage from './pages/addproductpage';
import Productpage from './pages/productpage';
import Userlistpage from './pages/userlistpage';
import Edituserpage from './pages/edituserpage';
import Editproductpage from './pages/editproductpage';
import Productdetailspage from './pages/productdetailspage';
import Profilepage from './pages/profilepage';
import Productlistpage from './pages/productlistpage';
import Adminpage from './pages/adminpage';
import Userpage from './pages/userpage';
import Supplierpage from './pages/supplierpage';
import Servicepage from './pages/servicepage';
import Firstdeliverypage from './pages/fastdeliverypage';
import Supportpage from './pages/supportpage';
import Securepaymentspage from './pages/securepaymentspage';
import Easyreturnspage from './pages/easyreturnspage';
import Placeorderpage from './pages/placeorderpage';
import AddCategoryPage from "./pages/addcategorypage";
import AddSubCategoryPage from "./pages/addsubcategorypage";
import Editsubcategorypage from "./pages/editsubcategorypage";
import Editcategorypage from "./pages/editcategorypage";
import Subcategorylistpage from "./pages/subcategorylistpage";
import Categorylistpage from "./pages/categorylistpage";
import SearchProductPage from "./pages/searchproductpage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Productpage />} />
        <Route path="/registration" element={<Registrationpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/admin/addcategory" element={<AddCategoryPage />} />
        <Route path="/admin/addsubcategory" element={<AddSubCategoryPage />} />
        <Route path="/admin/addproduct" element={<AddProductpage />} />
        <Route path="/admin/userlist" element={<Userlistpage />} />
        <Route path="/admin/categorylist" element={<Categorylistpage />} />
        <Route path="/admin/subcategorylist" element={<Subcategorylistpage />} />
        <Route path="/admin/productlist" element={<Productlistpage />} />
        <Route path='/admin/edituser/:id' element={<Edituserpage />} />
        <Route path='/admin/editcategory/:id' element={<Editcategorypage />} />
        <Route path='/admin/editsubcategory/:id' element={<Editsubcategorypage/>} />
        <Route path='/admin/editproduct/:id' element={<Editproductpage />} />
        <Route path="/product/:id" element={<Productdetailspage />} />
        <Route path='/profile' element={<Profilepage />} />
        <Route path="/admin" element={<Adminpage />} />
        <Route path="/supplier" element={<Supplierpage/>} />
        <Route path="/user" element={<Userpage />} />
        <Route path="/services" element={<Servicepage/>} />
        <Route path="/delivery" element={<Firstdeliverypage/>} />
        <Route path="/support" element={<Supportpage/>} />
        <Route path="/securepayments" element={<Securepaymentspage/>} />
        <Route path="/returns" element={<Easyreturnspage/>} />
        <Route path="/order" element={<Placeorderpage/>} />
        <Route path="/search-result" element={<SearchProductPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
