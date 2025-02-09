// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignupPage'; // Ensure the path is correct
import LoginPage from './Components/LoginPage';
import LandingPage from './Utilities/LandingPage';
import Container from './Components/Container';
import Category from './Components/Category';
import SubCategory from './Components/SubCategory';
import Cart from './Components/Cart';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/container' element={<Container />}/>
        <Route path='/category' element={<Category />}/>
        <Route path='/subcategory' element={<SubCategory />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
