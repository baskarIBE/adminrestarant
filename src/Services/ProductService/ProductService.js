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

// my servicess function end
export{productcrated,getproductall}