import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/authcontext';
function Navbar() {
    const menuItems = [
        { label: "CHAT-APP@bibek", path: "/" },
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
        // Add more menu items as needed
    ];
 const {user,logoutuser}=useContext(AuthContext)

//  console.log(user.name)
    return (  
        <ul className="main-navigation flex flex-row bg-gray-600 p-4">
            {menuItems.slice(0, 1).map((item, index) => (
                <li key={index} className="mr-4">
                    <a href={item.path} className="text-white hover:text-gray-300 text-lg font-semibold">
                        {item.label}
                    </a>
                </li>
            ))}
           {(user)?<div className=' ml-auto mr-4 flex flex-row'>
            <li className=" text-white ">Logging as {user.name}</li>
            <li className=" text-white ml-8" onClick={(e)=>{e.preventDefault();logoutuser()}}>Logout</li>
            </div>:<div className="ml-auto mr-4 flex flex-row" >
            
            <li className='mr-4' >
                <a href={menuItems[1].path} className="text-white hover:text-gray-300 text-lg font-semibold">
                    {menuItems[1].label}
                </a>
            </li>
            <li  className='ml-4'> 
                <a href={menuItems[2].path} className="text-white hover:text-gray-300 text-lg font-semibold">
                    {menuItems[2].label}
                </a>
            </li>
            </div>}
        </ul>
    );
}

export default Navbar;
