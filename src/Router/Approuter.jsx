
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Adminlogin from '../Components/Login/Adminlogin'
import ProductCrud from '../Components/Product/ProductCrud'
import UserCrud from '../Components/User/UserCrud'

export default function Approuter() {
  return (
    <BrowserRouter>
          <Routes>
            {/* <Route element={<Main />}> */}
            {/* <Route path="" element={<Home />} /> */}
            <Route path="" element={<Adminlogin/>} />
            <Route path="/product" element={<ProductCrud/>} />
            <Route path="/user" element={<UserCrud/>} />
          </Routes>
    </BrowserRouter>
  )
}
