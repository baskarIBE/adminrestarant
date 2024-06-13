import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Apilogin } from "../../Services/apilogin/apilogin";
import toast from "react-hot-toast";


export default function Adminlogin() {
  const [email, setEmail]=useState('admin@gmail.com')
  const [password, setPassword]=useState('1234567')
  const navigate = useNavigate()

    
  const token=localStorage.getItem('token')
const checkToken=token===null
 useEffect(()=>{
  if (!checkToken){
  return navigate('/product')
} 
},[checkToken])

const onSubmit=()=>{
  
  const user={
    email,
    password
  }
 

  Apilogin(user)
  // .then(res=>{
  //   // console.log(res.data.message);
  //   console.log(res);
  //   // console.log(res.data.token);
  // })
  .then(res=>{
    console.log(res);
    localStorage.setItem("token", res.data.token)
    toast.success(res.data.message)
    navigate('/product')
  })
  .catch(err=>{
    console.log(err)
    // toast.error(err.response.data.message)
  })
}

  return (
    <div className="flex h-screen w-screen justify-center items-center">
        <div className="bg-gradient-to-r from-[#EB4D28] to-[#852B17] py-[5%] px-[17%] rounded-[10px]">
            <div className="flex justify-center mb-[2rem]"><img className="mx-auto" src="images/shopping-cart-one.png" alt="" /></div>
            <div className="flex justify-center mb-[2rem]"><h2 className="lato-bold text-[32px] text-[#fff]">Admin Login</h2></div>
            <div className="flex flex-col">
                
                    <div className="mb-[20px]">
                        <input className="py-[10px] px-[5px] rounded-[10px]" type="email" id="adminemail"  name="email" onChange={(event) => setEmail(event.target.value)} placeholder="Enter Admin Email" required />
                    </div>
                    <div className="mb-[20px]">
                        <input className="py-[10px] px-[5px] rounded-[10px]" type="Password" id="adminpassword" name="password" placeholder="Enter Admin Password" onChange={(event) => setPassword(event.target.value)} required />
                    </div>
                    <div className="flex justify-center"><button className="bg-[#fff] py-[10px] px-[20px] rounded-[10px] lato-bold text-[14px]" type='submit' onClick={onSubmit}>Login</button></div>
                    
               
            </div>
        </div>


    </div>
  )
}
