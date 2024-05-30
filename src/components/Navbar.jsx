import React from 'react';

function Navbar() {
  return (
    
      <nav className='bg bg-slate-800 text-white '>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        <div className='logo font-bold text-white text-2xl'>
          <span className='text-green-500'>&lt;</span> 
          Pass
          <span className='text-green-500'>OP/&gt;</span> 
          </div>
          <div>
         
            <button  className='text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center'>
           <img className='invert w-10 p-1' src="/icons/github.png" alt="img" />
           <span className='font bold px-2'>Github</span>
            </button>
          
          </div>
        </div>
      </nav>
    
  );
}

export default Navbar;
