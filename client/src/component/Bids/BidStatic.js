import React, {forwardRef,useState,useEffect, useRef, useCallback, useDebugValue}from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./BidStatic.css"
import {ProductService} from "../../Service/product.service"
import { BidService } from "../../Service/bid.service"
import { BidDetailsService } from "../../Service/bidDetails.service"
import BackIcon from "../../images/back.png"
import {useReactToPrint} from 'react-to-print';

import Printer from "./../../images/printer.png"
import Logo from "../../images/logo.png"

const ComponentToPrint = forwardRef((props, ref) => {
   
    const param = useParams();
    
    const [customerID, setCustomerID] = useState();
    const [customerName, setCustomerName] = useState();
    const [priceTotal, setPriceTotal] = useState(0);
    const [arrayProduct, setArrayProduct] = useState([]);
    const [discountDis, setDiscountDis] = useState()
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const init = async()=>{
        console.log("useParams", param);
        const data = await BidService.getB(param.id);
        const bid = data.data;
        console.log("bid",bid)
        setCustomerID(bid.customer.id);
        setCustomerName(bid.customer.name);
        const datefrom = `${new Date(bid.date).getDate() >9 ? new Date(bid.date).getDate() : "0" + new Date(bid.date).getDate()}`+
                                `/` + `${new Date(bid.date).getMonth() >9 ? (new Date(bid.date).getMonth() + 1) : "0" + (new Date(bid.date).getMonth()+1)}`+
                                `/` + `${new Date(bid.date).getFullYear()}`;
        const dt= new Date(bid.date);
        dt.setDate(dt.getDate() +14);
        const dateto = `${new Date(dt).getDate() >9 ? new Date(dt).getDate() : "0" + new Date(dt).getDate()}`+
        `/` + `${new Date(dt).getMonth() >9 ? (new Date(dt).getMonth() + 1) : "0" + (new Date(dt).getMonth()+1)}`+
        `/` + `${new Date(dt).getFullYear()}`;
        
        setDateFrom(datefrom); setDateTo(dateto);
        setPriceTotal(0);
        setDiscountDis(bid.discount.dis);

        const data2 = await BidDetailsService.getBD(bid._id);
        const bidsDetails = data2.data;
        var totalPriceW = 0;
        bidsDetails.map(async(bd) =>{
            console.log("bd", bd);
            const data3 = await ProductService.getP(bd.idProduct);
            const p = data3.data;
            console.log("bd p", bd.idProduct,p)
            const id = p.id;
            const name = p.name;
            const price = p.price;
            const amount = bd.amount;
            const totalPrice = (parseInt(p.price) * parseInt(bd.amount));
            totalPriceW += totalPrice; 
            setPriceTotal(totalPriceW);
            console.log(priceTotal, totalPrice, totalPriceW);
            setArrayProduct( arrayProduct => [...arrayProduct,{id: id,name: name,price: price, amount: amount, totalPrice: totalPrice }]);
        });
        

    }

    useEffect(()=>{init()},[])
    
    return(
    <>
    <div className="Doc" ref={ref}>
        <header className="header">
            <img src={Logo} width={300}/> 
        </header>
        <h1 className="title">הצעת מחיר מס #{param.id}</h1> 
        <div className="groupToForm">
            <side className="from">
                <h1>עבור</h1>
                <p>שם לקוח: <b>{customerName}</b></p>
                <p>מספר טלפון:<b>{customerID}</b></p>
                <p>תאריך: <b>{dateFrom}</b></p>
                <p>ההצעה תקפה ל: <b>{dateTo}</b></p>
            </side>
            <side className="to">
                <h1>מאת</h1>
                <p><b>ב.ח. לוחות חשמל</b></p>
                <p>עוסק מורשה:<b>558562096</b></p>
                <p>כתובת: <b>שד צה"ל 23, לוד</b></p>
                <p>טלפון: <b><a href="tel:+9720507903256">0507903256</a> | <a href="tel:+9720522529613">0522529613</a></b></p>
                <p>דוא"ל: <b><a href="mailto:bilalzinaty@gmail.com">bilalzinaty@gmail.com</a></b></p>

            </side>
        </div>
        <div className="tableBS">
            <table className="tableBS">
                    <tr className="titles">
                        <th>פירוט</th>
                        <th>מחיר יחידה</th>
                        <th>כמות</th>
                        <th>סה"כ</th>
                    </tr>
                {
                    arrayProduct && arrayProduct.map((item,i) => {        
                        if(item.amount != 0)
                        return(
                            <tr>
                                <td><p>{item.name}</p></td>
                                <td>{parseFloat(item.price).toFixed(2)}₪</td>
                                <td>{item.amount}</td>
                                <td>{parseFloat(item.totalPrice).toFixed(2)}₪</td>
                            </tr>
                            )
                        })
                }
                <tr></tr>
                <tr className="line">
                    <td></td>
                    <td></td>
                    <th scope ="row">{"מחיר:"}</th>
                    <td>{priceTotal.toFixed(2)}₪</td>
                </tr>
                <tr>
                    {discountDis != 0 && <td></td>}
                    {discountDis != 0 && <td></td>}
                    {
                        discountDis != 0 &&  <th scope ="row">{"הנחה"} {discountDis}%:</th>
                    }
                    {
                        discountDis != 0 && <td>{(priceTotal * discountDis / 100).toFixed(2)}₪</td>
                    }
                </tr>
                <tr>
                    {discountDis != 0 && <td></td>}
                    {discountDis != 0 && <td></td>}
                    {
                        discountDis != 0 &&  <th scope ="row">{"מחיר אחרי הנחה:"}</th>
                    }
                    {
                        discountDis != 0 && <td>{(priceTotal - (priceTotal * discountDis / 100)).toFixed(2)}₪</td>
                    }
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <th scope ="row">{`מע"מ 17%:`}</th>
                    <td>{((priceTotal - (priceTotal * discountDis / 100))*0.17).toFixed(2)}₪</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <th scope ="row">{"מחיר סופי"}</th>
                    <td>{(((priceTotal - (priceTotal * discountDis / 100)).toFixed(2))*1.17).toFixed(2)}₪</td>
                </tr>
            </table>
            
            <div className="footer">
                <hr></hr>
                <p><b>הערה:</b> ההצעה תקפה למשך 14 יום מיום יצירת ההצעה</p>
            </div>
        </div>
    </div>
    </>
    )
})
const BidStatic = () => {
    const componentRef = useRef();
    const param = useParams();
    const navigate = useNavigate();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onPrintError: (error) => {console.log(error)},
        documentTitle: "",
        onBeforePrint: () => {
            const doc =document.getElementsByClassName("Doc")[0];
            doc.style.direction =" rtl";
        },
        onAfterPrint: () => {
            const doc =document.getElementsByClassName("Doc")[0];
            doc.style.direction =" rtl";
        },
    })

    return(
        <div>
            <button><img src={BackIcon} width={50} onClick={() => {navigate(-1);} }/></button>
            <button onClick={handlePrint}><img src={Printer} width={50}/></button>
            <ComponentToPrint className="hidden" ref={componentRef}/>
            
        </div>
    )
}
export default BidStatic;
