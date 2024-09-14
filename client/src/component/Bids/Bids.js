import React, {useState,useEffect}from "react"
import "./Bids.css"
import {BidService} from "./../../Service/bid.service"
import Header from "./../Header/Header";
import Footer from"../Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom"
import Search from "../Search/Search";
import { BidDetailsService } from "../../Service/bidDetails.service";
import Loader from "../Loader/Loader";
import {FilePlus, Pen, Trash, Book} from "react-bootstrap-icons"

const Bids = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
 
    const [bids, setBids] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputSearch, setInputSearch] = useState([]);

    const [inputID, setInputID] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [inputPaid, setInputPaid] = useState("");
    const [customer, setInputCustomer] = useState("");

    const [from, setFrom] = useState(location.pathname.includes("/zn") ? "zn" : "bh");
    useEffect(()=>{setFrom(location.pathname.includes("/zn") ? "zn" : "bh")}, []);
    const getAllBid = async()=>{
        console.log("get all Bid");
        try{
            setIsLoading(true);
            console.log("get all url");
            let c = await BidService.getB(null, location.pathname.includes("/zn") ? "zn" : "bh");
            console.log("get all url out");
            console.log("data",c.data);
            setBids(c.data);
            setIsLoading(false);
        }
        catch(err){
            console.log("error with get bids " + err)
        }
    }
    
    useEffect(()=>{
        getAllBid();
    },[])
    useEffect(()=>{console.log(bids);}, [bids]);


    const [search, setSearch] = useState("");

    useEffect(()=> {handleSearch()}, [search])

    const deleteB = async(id) => {
        setIsLoading(true);
        const bd = await BidService.getB(id,location.pathname.includes("/zn")? "zn": "bh");

        await BidDetailsService.deleteBD(bd.data._id, location.pathname.includes("/zn")? "zn": "bh");

        await BidService.deleteB(id, location.pathname.includes("/zn")? "zn": "bh");
        setIsLoading(false);
        await getAllBid();
        await handleSearch();
    }
    const handleSearch = async() => {
        await getAllBid();
        if(search != ""){
            let bb = []; 
            bids.map((b) => { 
                const item = b;
                const date = `${new Date(item.date).getDate() >9 ? new Date(item.date).getDate() : "0" + new Date(item.date).getDate()}`+
                                `/` + `${new Date(item.date).getMonth() >9 ? (new Date(item.date).getMonth() + 1) : "0" + (new Date(item.date).getMonth()+1)}`+
                                `/` + `${new Date(item.date).getFullYear()}`;
                if(b.id.includes(search) || date.includes(search) || b.customer.name.includes(search)){
                    bb.push(b);
                }
            });
            setBids(bb);            
        }
    }
    
    return(
        <>
        {isLoading && <Loader/>}
        <Header/>
        <h1 className="sch-title-big">טבלת הצעת מחיר</h1>
        <Search item={search} setItem={setSearch}/>
        <br/>
        <table className="tableB">
            <thead>
                <tr key="1">
                    <td scope="col">מספר הצעה</td>
                    <td scope="col">תאריך</td>
                    <td scope="col">לקוח</td>
                    <td scope="col">פעולות</td>
                    {/* <th><FilePlus className="btn success" size={50} onClick={()=>{navigate(`/${from}/bids/0`);}}/></th> */}
                </tr>
            </thead>
            <tbody>
            <tr>
                {/* <td scope="row"><button className="btn success" onClick={()=>{navigate(`/bids/0`);}}>הוספה</button></td> */}
                <td><FilePlus className="btn success" size={50} onClick={()=>{navigate(`/${from}/bids/0`);}}/></td>
            </tr>
            {
            bids && bids.map((item,i) => {
                    const id = item.id;
                    const date = `${new Date(item.date).getDate() >9 ? new Date(item.date).getDate() : "0" + new Date(item.date).getDate()}`+
                                `/` + `${new Date(item.date).getMonth() >9 ? (new Date(item.date).getMonth() + 1) : "0" + (new Date(item.date).getMonth()+1)}`+
                                `/` + `${new Date(item.date).getFullYear()}`;
                    console.log("date", date);
                    return(
                        <tr key={i}>
                            <td data-th="מספר הצעה">{id}</td>
                            <td data-th="תאריך">{date}</td>
                            <td data-th="לקוח">{item.customer.name}</td>
                            <td>
                                <ul className="flex relative">
                                    <Book size={50} className="btn success" onClick={() => {navigate(`/${from}/static/${item.id}`);}}/>
                                    <Pen size={50} className="btn warning" onClick={()=>{navigate(`/${from}/bids/${item.id}`);}} />
                                    <Trash size={50} className="btn danger" onClick={()=>{deleteB(item.id)}}/>
                                </ul>
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

export default Bids;
