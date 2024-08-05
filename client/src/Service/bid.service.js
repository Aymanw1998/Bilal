import axios from "axios";
import { URL } from '../Utils/globalVaribals';
const BID = `${URL}/api/bid`;

// get one or all
const getB = async(id = null) => {
    if(id)
    {
        try{
            const res = await axios.get(`${BID}/${id}`);
            const result = {data: res.data.bid, err: false };
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
            console.log("get BID get " + BID);
            const res = await axios.get(`${BID}`);
            const result = {data: res.data.bids, err: false };
            console.log("result", result);
            return result;
        }catch(err){
            const result = {data: [], err: true };
            console.log("result", result);
            return result;
        }
    }
}

const createB = async(data) => {
    try{
        const res = await axios.post(`${BID}`, data);
        const result = {data: res.data.bid, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        const result = {data: {_id:null}, err: true };
        console.log("result", result);
        return result;
    }
}

const updateB = async(id, data) => {
    try{
        const res = await axios.put(`${BID}/${id}`, data);
        const result = {data: res.data.bid, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        const result = {data: {_id:null}, err: true };
        console.log("result", result);
        return result;
    }
}

const deleteB = async(id) => {
    try{
        const res = await axios.delete(`${BID}/${id}`);
        const result = {data: res.data.bids, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        const result = {data: {_id:null}, err: true };
        console.log("result", result);
        return result;
    }
}

export const BidService = {
    getB, createB, updateB, deleteB,
}
