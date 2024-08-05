import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {BrowserRouter, Link, Route, Routes,useLocation} from "react-router-dom"
import logo from './logo.svg';
import Products from "./component/Products/Products";
import Bids from "./component/Bids/Bids";
import CreateBid from "./component/Bids/CreateBid";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import BidStatic from "./component/Bids/BidStatic"

const See = () => {
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(()=>{
        if(location.pathname == "/") 
            navigate("/products");
        },[]);
      return(<></>);
}
const  App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <See/>
        <Routes>
          <Route path="/products" element={<Products/>}/>
          <Route path="/bids" element={<Bids/>}/>
          <Route path="/bids/:id" element={<CreateBid/>}/>
          <Route path="/static/:id" element={<BidStatic/>}/>
        </Routes>
        
      </BrowserRouter>
      
    </div>
  );
}

export default App;
