import React, {useState,useEffect}from "react"
import "./Bids.css"
import {BidService} from "./../../Service/bid.service"
import Header from "./../Header/Header";
import Footer from"./../Footer/Footer";
import { useNavigate } from "react-router-dom"
const Bids = () => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
 
    const [bids, setBids] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputSearch, setInputSearch] = useState([]);

    const [inputID, setInputID] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [inputPaid, setInputPaid] = useState("");
    const [customer, setInputCustomer] = useState("");

    const getAllBid = async()=>{
        console.log("get all Bid");
        try{
            setIsLoading(true);
            console.log("get all url");
            let c = await BidService.getB(null);
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

    return(
        <>
        <Header/>
        <h1 className="sch-title-big">טבלת הצעת מחיר</h1>
        <table className="tableB">
            <tr>
                <th scope="col">#</th>
                <th scope="col">מספר הצעה</th>
                <th scope="col">תאריך</th>
                <th scope="col">לקוח</th>
                <th scope="col">הצגה/פירוט</th>
            </tr>
            {
            bids && bids.map((item,i) => {
                    const id = item.id;
                    const date = `${new Date(item.date).getDate() >9 ? new Date(item.date).getDate() : "0" + new Date(item.date).getDate()}`+
                                `/` + `${new Date(item.date).getMonth() >9 ? (new Date(item.date).getMonth() + 1) : "0" + (new Date(item.date).getMonth()+1)}`+
                                `/` + `${new Date(item.date).getFullYear()}`;
                    console.log("date", date);
                    return(
                    <tr>
                    <th scope ="row">{i + 1}</th>
                    <td>{id}</td>
                    <td>{date}</td>
                    <td>{item.customer.id + " " + item.customer.name}</td>
                    <td>
                        <button className="btn warning" onClick={()=>{navigate(`/bids/${item.id}`); }}>פירוט</button>
                        <button className="btn success" onClick={() => {navigate(`/static/${item.id}`);}}>הצגה</button>
                    </td>
                    </tr>)
                })
            }
            <tr>
                <td scope="row"><button className="btn success" onClick={()=>{navigate(`/bids/0`);}}>הוספה</button></td>
            </tr>
        </table>
        <Footer/>
        </>
    )
}

export default Bids;
