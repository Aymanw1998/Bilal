import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Header.css";
import BackIcon from "./../../images/back.png" 
import LogoBH from "./../../images/logobh.png"
import LogoZN from "./../../images/logozn.png"
function Header() {

    const [urlFirst,setUrlFirst] = useState("");
    const [urlSecond,setUrlSecond] = useState("");
    const Menus1 = [
        {name: "ב ח לוחות חשמל",url:"/bh"},
        {name:"אלזינאתי עבודות חשמל", url:"/zn"},
    ]
    const Menus2 = [
        {name: "פריטים", iconClose:"clipboard-outline", iconOpen: "folder-open-outline", url: "/products"},
        {name: "הצעות מחיר", iconClose:"calendar-outline", iconOpen: "calendar-clear-outline", url: "/bids"},
    ]
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(()=>{
        if(location.pathname == "/" || location.pathname == "/bh") 
            navigate("/bh/products");
        
        else if(location.pathname == "/zn")
            navigate("/zn/products")
      },[]);

    const handleBack = () => {
        navigate(-1);
    }

    const handleHome = () => {
        navigate('/');
    }
    return(
        <header>
            <nav className="navbar navbar-default">
            <ul className="nav navbar-nav">
                        {Menus1.map((menu,i)=>(<li key={i}><a href={menu.url} className={window.location.pathname.includes(menu.url) ? "selected" : "selected-no"} onClick={()=> {setUrlFirst(menu.url)}}>{menu.name}</a></li>))}
                    </ul>
                <div className="container-fluid">
                    {
                        <div>
                        {window.location.pathname.includes("/bh") &&<button><img className="logo" src={LogoBH} width={200} onClick={handleHome}/></button>}
                        {window.location.pathname.includes("/zn") &&<button><img src={LogoZN} width={200} onClick={handleHome}/></button>}
                        {/* {!(["/products", "/bids"]).includes(window.location.pathname) && <button><img src={BackIcon} width={100} onClick={handleBack}/></button>} */}
                        </div>
                    }
                    <ul className="nav navbar-nav">
                        { (window.location.pathname).includes("/bh") && Menus2.map((menu,i)=>(<li key={i}><a href={"/bh"+menu.url} className={window.location.pathname.includes(menu.url) ? "selected" : "selected-no"}>{menu.name}</a></li>))}
                        { (window.location.pathname).includes("/zn") && Menus2.map((menu,i)=>(<li key={i}><a href={"/zn"+menu.url} className={window.location.pathname.includes(menu.url) ? "selected" : "selected-no"}>{menu.name}</a></li>))}
                    </ul>
                </div>
            </nav>
        </header>
        );
}

export default Header;