import React, {useState,useEffect}from "react"
import { useLocation } from "react-router-dom"
import "./Products.css"
import {ProductService} from "../../Service/product.service"
import {FilePlus, Pen, Trash} from "react-bootstrap-icons"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search";
import Loader from "../Loader/Loader";
const Products = () => {
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
 
    
    const handleClose = () => {
        setOpen(false);
        getAllProduct();
        setInputIDU("");setInputNameU("");setInputPriceU("");
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const [products, setProducts] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [inputSearch, setInputSearch] = useState([]);

    const [inputID, setInputID] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputPrice, setInputPrice] = useState("");

    const [inputIDU, setInputIDU] = useState("");
    const [inputNameU, setInputNameU] = useState("");
    const [inputPriceU, setInputPriceU] = useState("");

    const getAllProduct = async()=>{
        console.log("get all product");
        try{
            setIsLoading(true);
            console.log("get all url");
            console.log(location.pathname, location.pathname.includes("/zn")? "zn":"bh");
            let c = await ProductService.getP(null, location.pathname.includes("/zn")? "zn":"bh");
            console.log("get all url out");
            console.log("data",c.data);

            setProducts(c.data.reverse());
            setIsLoading(false);
        }
        catch(err){
            console.log("error with get customers " + err)
        }
    }
    
    useEffect(()=>{
        getAllProduct();
    },[])
    useEffect(()=>{console.log(products);}, [products]);

    const updateP = async() => {
        //alert(`הפריט הוא ==> קוד: ${inputIDU}, תיאור: ${inputNameU}, מחיר ליחידה: ${inputPriceU}`);
        if(inputIDU == "" || inputNameU == "" || inputPriceU == ""){
            alert("אחד מהשדות או יותר ריקות");
            return;
        } 
        const from =(location.pathname).includes("/zn")? "zn" : "bh"
        let data = {
            id: inputIDU,
            name: inputNameU,
            price: inputPriceU,
            from: from,
        }

        await ProductService.updateP(data.id,data);
        await getAllProduct();
        await handleSearch();
        handleClose();
    }
    const deleteP = async(id) => {
        setIsLoading(true);
        await ProductService.deleteP(id, location.pathname.includes("/zn")? "zn": "bh");
        setIsLoading(false);
        await getAllProduct();
        await handleSearch();
    }
    const createP = async() => {
        setIsLoading(true);
        let b = false;
        products.map(p => {
            if(p.id == inputID){
                b = true;
            }
        })  
        if(b){
            // have product with same id
            alert("אי אפשר להוסיף פריט זה בגלל שיש מוצר קיים עם אותו קוד ייחודי")
            setIsLoading(false);
            return;
        }

        if(inputID == "" || inputName == "" || inputPrice == ""){
            alert("אחד מהשדות או יותר ריקות");
            setIsLoading(false);
            return;
        } 
        const from = (location.pathname).includes("/zn")? "zn" : "bh";
        let data = {
            id: inputID,
            name: inputName,
            price: inputPrice,
            from: from,
        }
        await ProductService.createP(data);
        setIsLoading(false);
        await getAllProduct();
        await handleSearch();
        setInputID("");setInputName("");setInputPrice("");
    }

    const [search, setSearch] = useState("");

    useEffect(()=> {handleSearch()}, [search])
    const handleSearch = async() => {
        console.log("search", search);
        await getAllProduct();
        if(search != ""){
            let pp = [];
            products.map(p=> {
                if(p.id.includes(search) || p.name.includes(search) || p.price.includes(search)){
                    pp.push(p);
                }
            })

            console.log("search3", products, pp);
            setProducts(pp);
        }
    }
    
    return(
        <>
        {isLoading && <Loader/>}
        <Header/>
        <h1 className="sch-title-big">טבלת הפריטים</h1>
        <Search item={search} setItem={setSearch}/>
        <br/>
        <table className="tableP">
            <thead>
                <tr>
                    <th scope="col">קוד פריט</th>
                    <th scope="col">תיאור פריט</th>
                    <th scope="col">מחיר ליחידה</th>
                    <th scope="col">פעולות</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td data-th="קוד פרטי">
                    <input type="text" id="id" name="id" value={inputID} onChange={e => setInputID(e.target.value)}></input>
                </td>
                <td data-th="תיאור פריט"><textarea id="name" name="name" value={inputName} onChange={e => setInputName(e.target.value)}></textarea></td>
                <td data-th="מחיר ליחידה"><input type="text" id="price" name="price" value={inputPrice} onChange={e => setInputPrice(e.target.value)}></input></td>
                {/* <td scope="row"><button className="btn success" onClick={createP}>הוספה</button></td> */}
                <td><FilePlus className="btn success" onClick={createP} size={50}/></td>
            </tr>
            {
            products && products.map((item,i) => {
                    return(
                    <tr key={i}>
                        <td data-th="קוד פרטי">{item.id}</td>
                        <td data-th="תיאור פריט">{item.name}</td>
                        <td data-th="מחיר ליחידה">{item.price}</td>
                        <td>
                            <ul className="flex relative">
                                <Pen className="btn warning" onClick={() => {handleOpen(); setInputIDU(item.id);  setInputNameU(item.name); setInputPriceU(item.price)}} size={50}/>
                                <Trash className="btn danger" onClick={()=>{deleteP(item.id)}} size={50}/>
                            </ul>
                            <Modal isOpen={open} onClose={handleClose}>
                                <h1>עדכון לקוח</h1>
                                <table className="tableP">
                                    <thead>
                                        <tr>
                                            <th scope="col">קוד פריט</th>
                                            <th scope="col">תיאור פריט</th>
                                            <th scope="col">מחיר ליחידה</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row" data-th="קוד פרטי">
                                                <input type="text" id="id" name="id" value={inputIDU} onChange={e => setInputIDU(e.target.value)} readOnly></input>
                                            </td>
                                            <td scope="row" data-th="תיאור פריט"><textarea id="name" name="name" value={inputNameU} onChange={e => setInputNameU(e.target.value)}></textarea></td>
                                            <td scope="row" data-th="מחיר ליחידה"><input type="text" id="price" name="price" value={inputPriceU} onChange={e => setInputPriceU(e.target.value)}></input></td>
                                            {/* <td><button className="btn success" onClick={updateP}>שמירת שינוי</button></td> */}
                                            <td><Pen className="btn warning" onClick={updateP} size={50}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Modal>
                        </td>
                    </tr>)
                })
            }
            </tbody>
        </table>
        <Footer/>
        </>
    )
}

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
 
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    // height: 150,
                    // width: 240,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                }}
            >
                {children}
                <button className="btn warning" onClick={onClose}>יציאה</button>
            </div>
        </div>
    );
};
export default Products;
