import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Header.css";
import BackIcon from "./../../images/back.png" 
import Logo from "./../../images/logo.png"
function Header() {
    const Menus = [
        {name: "פריטים", iconClose:"clipboard-outline", iconOpen: "folder-open-outline", url: "/products"},
        {name: "הצעות מחיר", iconClose:"calendar-outline", iconOpen: "calendar-clear-outline", url: "/bids"},
    ]
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(()=>{
        if(location.pathname == "/") 
            navigate("/products");
        },[]);

    const handleBack = () => {
        navigate(-1);
    }

    const handleHome = () => {
        navigate('/');
    }
    return(
        <header>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    {
                        <div class="navbar-header">
                        <button><img src={Logo} width={100} onClick={handleHome}/></button>
                        {!(["/products", "/bids"]).includes(window.location.pathname) && <button><img src={BackIcon} width={100} onClick={handleBack}/></button>}
                        </div>
                    }
                    <ul class="nav navbar-nav">
                        {Menus.map((menu,i)=>(<li key={i}><a href={menu.url} className={menu.url == window.location.pathname ? "selected" : "selected-no"}>{menu.name}</a></li>))}
                    </ul>
                </div>
            </nav>
        </header>
        );
}

export default Header;