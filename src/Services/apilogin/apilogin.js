import axios from 'axios'

export const Apilogin  = async (user) => {
//  console.log(user);
 
    return await axios.post('http://localhost:5000/auth/ad-login', user)
  }