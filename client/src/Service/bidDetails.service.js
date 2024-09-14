import axios from "axios";
import { URL } from '../Utils/globalVaribals';
const BIDDETAILS = `${URL}/api/bidDetails`;

// get one or all
const getBD = async(id = null,from) => {
    if(id)
    {
        try{
            const res = await axios.get(`${BIDDETAILS}/${from}/${id}`);
            const result = {data: res.data.bidDetail, err: false };
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
            console.log("get BIDDETAILS get " + BIDDETAILS);
            const res = await axios.get(`${BIDDETAILS}/${from}`);
            const result = {data: res.data.bidDetails, err: false };
            console.log("result", result);
            return result;
        }catch(err){
            const result = {data: [], err: true };
            console.log("result", result);
            return result;
        }
    }
}

const createBD = async(data) => {
    try{
        const res = await axios.post(`${BIDDETAILS}`, data);
        const result = {data: res.data.bidDetail, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        const result = {data: {_id:null}, err: true };
        console.log("result", result);
        return result;
    }
}

const updateBD = async(id, data) => {
    try{
        const res = await axios.put(`${BIDDETAILS}/${id}`, data);
        const result = {data: res.data.bidDetail, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        const result = {data: {_id:null}, err: true };
        console.log("result", result);
        return result;
    }
}

const deleteBD = async(id, from) => {
    try{
        const res = await axios.delete(`${BIDDETAILS}/${from}/${id}`);
        const result = {data: res.data.bidDetails, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        const result = {data: {_id:null}, err: true };
        console.log("result", result);
        return result;
    }
}

export const BidDetailsService = {
    getBD, createBD, updateBD, deleteBD,
}
