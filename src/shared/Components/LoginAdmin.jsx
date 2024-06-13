import { Link } from 'react-router-dom';

export default function LoginAdmin(props) {
   

  return (
    <div className="flex h-screen w-screen justify-center items-center">
        <div className="bg-gradient-to-r from-[#EB4D28] to-[#852B17] py-[5%] px-[17%] rounded-[10px]">
            <div className="flex justify-center mb-[2rem]"><img className="mx-auto" src="images/shopping-cart-one.png" alt="" /></div>
            <div className="flex justify-center mb-[2rem]"><h2 className="lato-bold text-[32px] text-[#fff]">Admin Login</h2></div>
            <div className="flex flex-col">
                
                    <div className="mb-[20px]">
                        <input className="py-[10px] px-[5px] rounded-[10px]" type="email" name="adminemail" placeholder="Enter Admin Email" onChange={handlechange} required />
                    </div>
                    <div className="mb-[20px]">
                        <input className="py-[10px] px-[5px] rounded-[10px]" type="Password" name="adminpassword" placeholder="Enter Admin Password" onChange={handlechange} required />
                    </div>
                    <div className="flex justify-center"><button className="bg-[#fff] py-[10px] px-[20px] rounded-[10px] lato-bold text-[14px]"><Link to={'/login'}>Login</Link></button></div>
               
               
            </div>
        </div>


    </div>
  )
}
