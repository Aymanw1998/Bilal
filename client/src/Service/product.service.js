import axios from "axios";
import { URL } from '../Utils/globalVaribals';
const PRODUCT = `${URL}/api/product`;

// get one or all
const getP = async(id = null, from) => {
    console.log("getP id", id)
    if(id)
    {
        try{
            const body = {from:from}
            const res = await axios.get(`${PRODUCT}/${from}/${id}`);
            const result = {data: res.data.product, err: false };
            console.log("result", result);
            return result;
        }catch(err){
            const result = {data: {_id:null}, err: true };
            console.log("result", result);
            return result;
        }
    }
    else{
        try{
            const body = {from:from};
            console.log("get PRODUCT get " + PRODUCT+"/"+from);
            const res = await axios.get(`${PRODUCT}/${from}`);
            const result = {data: res.data.products, err: false };
            console.log("result", result);
            return result;
        }catch(err){
            const result = {data: [], err: true };
            console.log("result", result);
            return result;
        }
    }
}

const createP = async(data) => {
    try{
        const res = await axios.post(`${PRODUCT}`, data);
        const result = {data: res.data.product, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        const result = {data: {_id:null}, err: true };
        console.log("result", result);
        return result;
    }
}

const updateP = async(id, data) => {
    try{
        const res = await axios.put(`${PRODUCT}/${id}`, data);
        const result = {data: res.data.product, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        const result = {data: {_id:null}, err: true };
        console.log("result", result);
        return result;
    }
}

const deleteP = async(id, from) => {
    try{
        const res = await axios.delete(`${PRODUCT}/${from}/${id}`);
        const result = {data: res.data.product, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        const result = {data: {_id:null}, err: true };
        console.log("result", result);
        return result;
    }
}

export const ProductService = {
    getP, createP, updateP, deleteP,
}
