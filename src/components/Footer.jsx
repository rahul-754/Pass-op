import React from 'react';

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white text-center p-4">
      <div className="flex flex-col items-center justify-center">
        <div className='logo font-bold text-white text-2xl'>
          <span className='text-green-500'>&lt;</span> 
          Pass
          <span className='text-green-500'>OP/&gt;</span> 
        </div>
        <div className="mt-2">
          Created with <img className='inline-block w-5' src="/icons/heart.png" alt="" srcset="" /> by Rahul
        </div>
      </div>
    </footer>
  );
}

export default Footer;
