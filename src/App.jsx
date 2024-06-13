// import {useState } from 'react';
import './App.css'
import Approuter from './Router/Approuter'

// import { Sidebar } from 'primereact/sidebar';
// import { Button } from 'primereact/button';
// import 'primeicons/primeicons.css';




function App() {
  
  // const [visible, setVisible] = useState(false);
  


  return (
    <>
    <Approuter/>
    </>
//     <div className="max-w-[90rem] w-full mx-auto px-4 mb-10">
//     <div className="max-w-[10rem] float-left">
//     <Sidebar visible={visible} onHide={() => setVisible(false)}>
//     <h2><i className="pi pi-user text-[28px] pr-[5px]" ></i> Admin</h2>
//     <h2><i className="pi pi-user text-[28px] pr-[5px]" ></i> User</h2>
    
//     </Sidebar>
//     <Button className='border p-[5px] border-[#000] m-[30px]' icon="pi pi-align-justify text-[28px]" onClick={() => setVisible(true)} />
// </div>
// <div className="max-w-[80rem] w-full mx-auto px-4 mb-10 float-left">
//       <div className=''>
//         <img className="mx-auto" src="images/logo.png" alt="" />
//       </div>
//     </div>
// </div>
  )
}

export default App
