import React, {useState,useEffect, useRef, useCallback, useDebugValue}from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import "./Bids.css"
import {ProductService} from "../../Service/product.service"
import { BidService } from "../../Service/bid.service"
import { BidDetailsService } from "../../Service/bidDetails.service"
import {FilePlus, PlusCircle, Pen, Trash, Book} from "react-bootstrap-icons"

import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Loader from "../Loader/Loader"
const CreateBid = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams();
    
    const init = async()=>{
        console.log("useParams", param.id,location.pathname.includes("/zn") ? "zn" : "bh");

        if(param.id != 0){
            const data = await BidService.getB(param.id, location.pathname.includes("/zn") ? "zn" : "bh");
            const bid =data.data;
            console.log("bid",data)
            setInputID(bid.id);
            setInputCustomerID(bid.customer.id);
            setInputCustomerName(bid.customer.name)
            

            const data2 = await BidDetailsService.getBD(bid._id,location.pathname.includes("/zn") ? "zn" : "bh");
            const bidsDetails = data2.data;
            console.log("bidsDetails", bidsDetails)
            if(data2.err){
                alert("ההצעה הזאת אין בה מוצרים");
            }
            else{
                let totalPriceW = 0;
                setInputTotalPrice(0);
                bidsDetails.map(async(bd) =>{
                    console.log("bd", bd);
                    const data3 = await ProductService.getP(bd.idProduct, location.pathname.includes("/zn") ? "zn" : "bh");
                    const p = data3.data;
                    console.log("bd p", bd.idProduct,p)
                    const id = p.id;
                    const name = p.name;
                    const price = p.price;
                    const amount = bd.amount;
                    const totalPrice = (parseInt(p.price) * parseInt(bd.amount));
                    totalPriceW += totalPrice; 
                    setInputTotalPrice(totalPriceW);
                    console.log("bd data",{id: id,name: name,price: price, amount: amount, totalPrice: totalPrice })
                    const data = {id: id,name: name,price: price, amount: amount, totalPrice: totalPrice };
                    setArrayProduct( arrayProduct => [...arrayProduct,data]);
                });
                
                const dis = bid.discount.dis;
                const price = bid.discount.price;
                console.log("dis is " + dis, "price is " + price)
                setInputDiscount({dis: dis, price: price});
                setInputVAT(bid.vat);
                setInputFinishPrice(bid.finishPrice);
            }
        }
    }
    useEffect(()=>{
        init();
        getAllProduct();
        getAllBid();
        if(param.id == 0){
            let number = 0;
            let b = false;
            do {
                const min = 1000;
                const max = 9999;
                number = parseInt(Math.random() * (max - min) + min)
                bids && bids.map((item,i) => {
                    if(item.id == number) 
                        b = true;
                })
            } while(b);
            setInputID(number);
        }
    },[]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
 
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [products, setProducts] = useState([]);
    const [bids, setBids] = useState([]);
    const [bidsDetais, setBidsDetails] = useState([]);

    const [inputID, setInputID] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [inputPaid, setInputPaid] = useState("");
    const [inputCustomerID, setInputCustomerID] = useState("");
    const [inputCustomerName, setInputCustomerName] = useState("");

    const [arrayProduct, setArrayProduct] = useState([]);


    useEffect(()=>{
        console.log("arrayProduct", arrayProduct);
        // let allprice = 0;
        // console.log()
        // for(let i = 0; i < arrayProduct.length; i++){
        //     allprice += parseInt(arrayProduct[i].totalPrice);
        //     console.log("allprice",allprice)
        // }
        // setInputTotalPrice(allprice);
        // const vat = (parseInt(allprice) *0.17);
        // setInputVAT(vat.toFixed(2)); 
        // const disMoney = allprice - parseInt(inputFinishPrice) + vat.toFixed(2);
        // const dis = (1-(parseInt(inputFinishPrice)+vat.toFixed(2))/1000) * 100;
        // setInputDiscount({dis: dis, price: disMoney})
    },[arrayProduct]);
    const [inputTotalPrice, setInputTotalPrice] = useState(0);
    const [inputDiscount, setInputDiscount] = useState({dis: 0, price:0});
    const [inputVAT, setInputVAT] = useState(0);
    const [inputFinishPrice, setInputFinishPrice ] = useState(0)
    const getAllProduct = async()=>{
        setProducts([]);
        console.log("get all product");
        try{
            setIsLoading(true);
            console.log("get all url");
            let c = await ProductService.getP(null, location.pathname.includes("/zn") ? "zn" : "bh");
            console.log("get all url out");
            c.data.map((item) => {
                
                const id = item.id;
                const name = item.name;
                const price = item.price;
                let b = false
               
                setProducts( products => [...products,{id,name,price}]);
                
            })
            setIsLoading(false);
        }
        catch(err){
            console.log("error with get customers " + err)
        }
    }
    
    const getAllBid = async()=>{
        console.log("get all Bid");
        try{
            setIsLoading(true);
            console.log("get all url");
            let c = await BidService.getB(null, location.pathname.includes("/zn")? "zn" : "bh");
            console.log("get all url out");
            console.log("data",c.data);
            setIsLoading(false);
        }
        catch(err){
            console.log("error with get bids " + err)
        }
    }

    useEffect(()=>{console.log("log products and bids",products, bids);} , [products, bids]);

    

    const createB = async() => {
        setIsLoading(true);
        console.log("save bid");
        //save bid
        const from = (location.pathname).includes("/zn")? "zn" : "bh";
        const data = {
            id: inputID,
            from: from,
            date: new Date().now,
            paid: false,
            customer:{
                id: inputCustomerID,
                name:inputCustomerName,
            }, 
            finishPrice: inputFinishPrice,
            totalPrice: inputTotalPrice,
            vat: inputVAT,
            discount: {
                dis: inputDiscount.dis,
                price: inputDiscount.price,
            }
        }
        
        let result 
        if(param.id == 0)
            result = await BidService.createB(data);
        else{
            result = await BidService.updateB(param.id,data);
        }
        console.log("resulttttt",result);
        if(result.err){
            if(param.id == 0)
                alert("שגיאה בעית שמירת הצעה")
            else{
                alert("שגיאה בעית עדכון הצעה")
            }
            setIsLoading(false);
            return;
        }

        const dataT = await BidService.getB(inputID, location.pathname.includes("/zn") ? "zn" : "bh");
        const bid2 = dataT.data;
        console.log("bid2", bid2.discount)
        // remove past product
        await BidDetailsService.deleteBD(bid2._id, location.pathname.includes("/zn")? "zn" : "bh");
        //save price
        arrayProduct.map( async(item) =>{
        const data = await ProductService.getP(item.id, location.pathname.includes("/zn") ? "zn" : "bh");
        const p = data.data;

        const data2 = {
            idBid: bid2._id,
            idProduct: p._id,
            amount: item.amount,
            TotalPrice: item.totalPrice,
            from: location.pathname.includes("/zn") ? "zn" : "bh"
        }
        let result = await BidDetailsService.createBD(data2);
        setIsLoading(false);
        if(result.err){
            alert("שגיאה בעית שמירת פריטי ההצעה")
            return;
        }

        });
        setIsLoading(false);
    navigate(-1);
    }

    const [results, setResults] = useState(products);
    const [selectedProduct, setSelectedProduct] = useState();
    
    useEffect(()=>{ console.log("selectedProduct", selectedProduct)},[selectedProduct])
    const handleChange = (e) => {
        const { target } = e;
        if (!target.value.trim()) return setResults(products);
        console.log("results change", products)
        const filteredValue = products.filter((p) =>
            p.name.includes(target.value)
        );
        setResults(filteredValue);
      };

    const addProduct = async() => {
        //  if selectedProduct?.id is not in the bid

        let b = true;
        if(!selectedProduct){
            console.log("this product is in bid");
            alert("בחר פריט");
            return;
        }
        arrayProduct.map((item)=>{
            if(item?.id == selectedProduct?.id)
            {
                b = false;
            }
        })

        if(!b)
        {
            console.log("this product is in bid");
            alert("הפריט שבחרת הוא כבר בהצעה");
            return;
        }
        const id = selectedProduct?.id;
        const name = selectedProduct?.name;
        const price = selectedProduct?.price;
        const data = {id: id,name: name,price: price, amount: 0, totalPrice: 0 };
        setArrayProduct( arrayProduct => [...arrayProduct,data]);
    }

    const Calc = (i,e) => {
        console.log("befor arrayProduct", arrayProduct);
        arrayProduct[i].amount = e.target.value == "" ? 0 : parseInt(e.target.value);
        arrayProduct[i].totalPrice = (parseInt(arrayProduct[i].amount) * parseInt(arrayProduct[i].price));
        console.log("after arrayProduct", arrayProduct);
        

        setArrayProduct( arrayProduct => [...arrayProduct]);

        pricesChange({dis: inputDiscount.dis});
    }

    const pricesChange = ({dis = 0}) => {
        console.log("pricesChange",arrayProduct)
        let allprice = 0;

        arrayProduct.map(item => {allprice += parseInt(item.totalPrice)});

        setInputTotalPrice(allprice);

        // const dis = inputDiscount.dis;
        let price = 0;
        
        if(dis != 0){
            price = allprice * dis / 100;
            console.log("dis", {dis:dis, price: price});
            setInputDiscount({dis: dis, price: price})
        }
        const vat = (allprice - price) * 0.17;
        setInputVAT(vat.toFixed(2));

        setInputFinishPrice((allprice - price + vat).toFixed(2));
    }
     
    useEffect(()=>{
        console.log("inputs", inputTotalPrice, inputDiscount, inputVAT, inputFinishPrice )
    },[inputTotalPrice, inputDiscount, inputVAT, inputFinishPrice])

    const putFromArray = async(iid) => {
        let pp = [];
        arrayProduct.map((ap) => { 
            if(ap.id != iid)
            {
                pp.push(ap);
            }
            else{
                ap.price = 0; ap.amount = 0;ap.totalPrice=0;
            }
            });
        console.log("pp",pp);
        await setArrayProduct(pp);
        pricesChange({dis: inputDiscount.dis});
    }
    return(
        <>
        {isLoading &&<Loader/>}
        <Header/>
        <h1 className="sch-title-big">הצעת מחיר מס 
            <label>{inputID}</label>#     
            {/* <button className={`btn ${ param.id != 0 ? "warning" : "success"} save`} onClick={createB}>{param.id != 0 ? "עדכן":"שמור"}</button> */}
            <FilePlus size={50} className={`btn ${ param.id != 0 ? "warning" : "success"}`} onClick={createB}/>
        </h1>
        
        <div className="groupCustomer">
            <h2>עבור</h2>
            <table className="tableB">
                
                <tr>
                    <th>שם לקוח</th>
                    <th><input type="text" id="id" name="id" value={inputCustomerName} onChange={e => setInputCustomerName(e.target.value)}></input></th>
                </tr>
                <tr>
                    <th>מספר טלפון</th>
                    <th><input type="text" id="id" name="id" value={inputCustomerID} onChange={e => setInputCustomerID(e.target.value)}></input></th>
                </tr>
            </table>
        </div>
            
        <div className="groupCustomer">
            <h3>מחיר</h3>
            <table className="tableB">
                <tr>
                    <th>סה"כ</th>
                    <th></th>
                    <th><label>{inputTotalPrice}₪</label></th>
                </tr>
                <tr className="dis">
                    <th>הנחה %</th>
                    <th>%<input type="number" min={0} max={30} value={inputDiscount.dis} onChange={async(e)=>{ const dis = parseInt(e.target.value =="" ? 0 : e.target.value); setInputDiscount({dis: dis, price: 0});pricesChange({dis});}}></input></th>
                    <th><label>{inputDiscount.price}₪</label></th>
                </tr>
                <tr>
                    <th>מע"מ</th>
                    <th><label>17%</label></th>
                    <th><label>{inputVAT}₪</label></th>
                </tr>
                <tr>
                    <th>מחיר סופי</th>
                    <th></th>
                    <th><label>{inputFinishPrice}₪</label></th>
                </tr>
            </table>
        </div>

        <h3>הפריטים שנבחרו</h3>
        <table className="tableB">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">קוד פריט</th>
                    <th scope="col">תיאור פריט</th>
                    <th scope="col">מחיר ליחידה</th>
                    <th scope="col">כמות</th>
                    <th scope="col">סה"כ</th>
                    
                </tr>
            </thead>
            <tbody>
            {
            arrayProduct && arrayProduct.map((item,i) => {
                    return(
                    <tr>
                    <th scope ="row" data-th="#">{i + 1}</th>
                    <td data-th="קוד פריט">{item.id}</td>
                    <td data-th="תיאור פריט">{item.name}</td>
                    <td data-th="מחיר ליחידה">{item.price}₪</td>
                    <td data-th="כמות"><input type="text" value={item.amount} onChange={(e)=>{Calc(i,e)}}></input></td>
                    <td data-th="סה''כ"><label>{item.totalPrice}₪</label></td>
                    <td><button onClick={()=>{putFromArray(item.id)}}>x</button></td>
                    </tr>)
                })
            }
            <tr>
                {/* <th scope="row"><button className="btn success" onClick={handleOpen}>חפש פריט</button></th> */}
                <th><PlusCircle className="btn success" onClick={handleOpen}/></th>
                <Modal isOpen={open} onClose={handleClose} addClose={addProduct}>
                    <h1>חיפוש</h1>
                    <LiveSearch results={results} value={selectedProduct?.name} renderItem={(item) => <p>({item.id}) {"==>"} {item.name}</p>} onChange={handleChange} onSelect={(item) => setSelectedProduct(item)}/>
                    <table className="tableB">
                        <thead>
                            <tr>
                                <td scope="col">קוד פריט</td>
                                <td scope="col">תיאור פריט</td>
                                <td scope="col">מחיר ליחידה</td>
                            </tr>
                        </thead>
                        <tr>

                            <td data-th="קוד פריט"><label>{selectedProduct?.id}</label></td>
                            <td data-th="תיאור פריט"><label>{selectedProduct?.name}</label></td>
                            <td data-th="מחיר ליחידה"><label>{selectedProduct?.price}₪</label></td>
                        </tr>
                    </table>
                </Modal>
            </tr>
            </tbody>
        </table>
        <Footer/>
        </>
    )
}



const Modal = ({ isOpen, onClose, addClose, children }) => {
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
                <button className="btn success" onClick={addClose}>הוספה</button>
            </div>
        </div>
    );
};


const LiveSearch = ({results = [],renderItem,value,onChange,onSelect}) => {
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const resultContainer = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [defaultValue, setDefaultValue] = useState("");
  
    const handleSelection = (selectedIndex) => {
      const selectedItem = results[selectedIndex];
      if (!selectedItem) return resetSearchComplete();
      onSelect && onSelect(selectedItem);
      resetSearchComplete();
    };
  
    const resetSearchComplete = useCallback(() => {
      setFocusedIndex(-1);
      setShowResults(false);
    }, []);
  
    const handleKeyDown = (e) => {
      const { key } = e;
      let nextIndexCount = 0;
  
      // move down
      if (key === "ArrowDown")
        nextIndexCount = (focusedIndex + 1) % results.length;
  
      // move up
      if (key === "ArrowUp")
        nextIndexCount = (focusedIndex + results.length - 1) % results.length;
  
      // hide search results
      if (key === "Escape") {
        resetSearchComplete();
      }
  
      // select the current item
      if (key === "Enter") {
        e.preventDefault();
        handleSelection(focusedIndex);
      }
  
      setFocusedIndex(nextIndexCount);
    };
  
    const handleChange = (e) => {
      setDefaultValue(e.target.value);
      onChange && onChange(e);
    };
  
    useEffect(() => {
      if (!resultContainer.current) return;
  
      resultContainer.current.scrollIntoView({
        block: "center",
      });
    }, [focusedIndex]);
  
    useEffect(() => {
      if (results.length > 0 && !showResults) setShowResults(true);
  
      if (results.length <= 0) setShowResults(false);
    }, [results]);
  
    useEffect(() => {
      if (value) setDefaultValue(value);
    }, [value]);
  
    return (
      <div>
        <div
          tabIndex={1}
          onBlur={resetSearchComplete}
          onKeyDown={handleKeyDown}
          className="relative"
        >
          <input
            value={defaultValue}
            onChange={handleChange}
            type="text"
            className="w-[600px] px-5 py-3 text-lg rounded-full border-2 border-gray-500 focus:border-gray-700 outline-none transition"
            placeholder="Search your query..."
          />
  
          {/* Search Results Container */}
          {showResults && (
            <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
              {results.map((item, index) => {
                return (
                  <div
                    key={index}
                    onMouseDown={() => handleSelection(index)}
                    ref={index === focusedIndex ? resultContainer : null}
                    style={{
                      backgroundColor:
                        index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
                    }}
                    className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                  >
                    {renderItem(item)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };
  
export default CreateBid;
