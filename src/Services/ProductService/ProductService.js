import axios from "axios";
import { apiurl } from "../apiurl/apiurl";


// export class ProductService {

//     getProductsSmall() {
//         return fetch('data/products-small.json').then(res => res.json()).then(d => d.data);
//     }

//     getProducts() {
//         return fetch('data/products.json').then(res => res.json()).then(d => d.data);
//     }

//     getProductsWithOrdersSmall() {
//         return fetch('data/products-orders-small.json').then(res => res.json()).then(d => d.data);
//     }


   
// }

 // my servicess function start
const productcrated=async(logdudata)=>{
    // console.log(logdudata);
        const logval=await axios.post(`${apiurl}/products/addproduct`,logdudata)
        return logval.data;
    }

const getproductall=async()=>{
    // console.log(logdudata);
        const logval=await axios.get(`${apiurl}/products/getproduct`)
        return logval.data;
    }
const Updateproall=async(proid)=>{
    // console.log(logdudata);
        const logval=await axios.post(`${apiurl}/products/updpro`,proid)
        return logval.data;
    }
const delprodata=async(id)=>{   
        const logval=await axios.delete(`${apiurl}/products/delpro/${id}`)
        return logval.data;
    }

const manydelprodata=async(selprodet)=>{  
    // console.log(selprodet);
    const logval=await axios.post(`${apiurl}/products/delmanydat`,selprodet)
    console.log(logval);
    return logval.data;
}

// my servicess function end delpro
export{productcrated,getproductall,Updateproall,delprodata,manydelprodata}