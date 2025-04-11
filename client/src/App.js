import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthorityRegister from "./pages/AuthorityRegister";
import SignInSide from "./pages/SignInSide";
import Navbar from "./components/Navbar"; // Import Navbar
import Verification from "./pages/Verification";
import SellerDashboard from "./components/SellerDashboard";
import SignUp from "./pages/SignUp"; 
import SigningSuccess from "./components/SigningSuccess";  
import './i18n'; // Import the i18n config 
const App = () => {



  return (
    <Router>
       <Navbar  /> {/* Add Navbar */}
      {/* Add Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/seller" element={<SignUp />} />
        <Route path="/signing-success" element={<SigningSuccess />} />

        <Route path="/verification" element={<Verification />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/register/authority" element={<AuthorityRegister />} />
        <Route path="/login" element={<SignInSide />} />
      </Routes>
    </Router>
  );
};

export default App;
